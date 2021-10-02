"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const common_1 = require("./common");
exports.isSafeFloat = (n) => typeof n === 'number' && isFinite(n);
exports.createFloatScalar = (config) => {
    const { coerce, errorHandler, maximum, minimum, parse, sanitize, validate, serialize } = config, scalarConfig = tslib_1.__rest(config, ["coerce", "errorHandler", "maximum", "minimum", "parse", "sanitize", "validate", "serialize"]);
    const handleError = errorHandler || common_1.defaultErrorHandler;
    const parseValue = (unknownValue, ast) => {
        if (unknownValue == null) {
            return null;
        }
        let value;
        if (exports.isSafeFloat(unknownValue)) {
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
    return new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, scalarConfig), { serialize: serialize || common_1.defaultSerialize, parseValue, parseLiteral: (ast) => parseValue(common_1.getValueFromValueNode(ast), ast) }));
};
//# sourceMappingURL=float.js.map