import { __rest } from "tslib";
import { GraphQLScalarType } from 'graphql';
import { defaultErrorHandler, defaultSerialize, getValueFromValueNode, } from './common';
const MAX_INT = 2147483647;
const MIN_INT = -2147483648;
export const isSafeInteger = (n) => typeof n === 'number' &&
    isFinite(n) &&
    Math.floor(n) === n &&
    n <= MAX_INT &&
    n >= MIN_INT;
export const createIntScalar = (config) => {
    const { coerce, errorHandler, maximum, minimum, parse, sanitize, validate, serialize } = config, scalarConfig = __rest(config, ["coerce", "errorHandler", "maximum", "minimum", "parse", "sanitize", "validate", "serialize"]);
    const handleError = errorHandler || defaultErrorHandler;
    const parseValue = (unknownValue, ast) => {
        if (unknownValue == null) {
            return null;
        }
        let value;
        if (isSafeInteger(unknownValue)) {
            value = unknownValue;
        }
        else {
            if (coerce) {
                const valueOrNull = coerce(unknownValue);
                if (valueOrNull == null) {
                    return null;
                }
                value = valueOrNull;
            }
            else {
                return handleError({
                    code: 'type',
                    originalValue: unknownValue,
                    value: unknownValue,
                    ast,
                    config,
                });
            }
        }
        if (sanitize && value != null) {
            const valueOrNull = sanitize(value);
            if (valueOrNull == null) {
                return null;
            }
            value = valueOrNull;
        }
        if (minimum != null && value < minimum) {
            return handleError({
                code: 'minimum',
                originalValue: unknownValue,
                value,
                ast,
                config,
            });
        }
        if (maximum != null && value > maximum) {
            return handleError({
                code: 'maximum',
                originalValue: unknownValue,
                value,
                ast,
                config,
            });
        }
        if (validate && !validate(value)) {
            return handleError({
                code: 'validate',
                originalValue: unknownValue,
                value,
                ast,
                config,
            });
        }
        if (parse) {
            return parse(value);
        }
        return value;
    };
    return new GraphQLScalarType(Object.assign(Object.assign({}, scalarConfig), { serialize: serialize || defaultSerialize, parseValue, parseLiteral: (ast) => parseValue(getValueFromValueNode(ast), ast) }));
};
//# sourceMappingURL=int.js.map