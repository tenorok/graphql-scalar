import { __rest } from "tslib";
import { GraphQLScalarType } from 'graphql';
import { defaultErrorHandler, defaultSerialize, getValueFromValueNode, } from './common';
const strToUpperCase = (str) => str.toUpperCase();
const wordRegex = /(?:^|\s)\S/g;
const sentenceRegex = /(?:^|\.\s)\S/g;
const newlineRegex = /[\r\n]+/g;
const newlineWithWSRegex = /\s*[\r\n]+\s*/g;
const linebreakRegex = /\r\n|\r|\n/g;
const whitespace = /\s+/g;
const collapseWS = (str) => str.replace(whitespace, ' ');
const trimAndCollapseWS = (str) => str.trim().replace(whitespace, ' ');
export const createStringScalar = (config) => {
    const { capitalize, coerce, collapseWhitespace, errorHandler, lowercase, maxEmptyLines, maxLength, minLength, nonEmpty, parse, pattern, sanitize, serialize, singleline, trim, trimLeft, trimRight, truncate, uppercase, validate } = config, scalarConfig = __rest(config, ["capitalize", "coerce", "collapseWhitespace", "errorHandler", "lowercase", "maxEmptyLines", "maxLength", "minLength", "nonEmpty", "parse", "pattern", "sanitize", "serialize", "singleline", "trim", "trimLeft", "trimRight", "truncate", "uppercase", "validate"]);
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    const handleError = errorHandler || defaultErrorHandler;
    let emptyLineRegex = null;
    let emptyLineString = null;
    if (maxEmptyLines) {
        emptyLineRegex = new RegExp(`\n{${maxEmptyLines + 2},}`, 'g');
        emptyLineString = '\n'.repeat(maxEmptyLines + 1);
    }
    const parseValue = (unknownValue, ast) => {
        if (unknownValue == null) {
            return null;
        }
        let value;
        if (typeof unknownValue === 'string') {
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
        if (value) {
            if (trim) {
                value = value.trim();
            }
            else {
                if (trimLeft) {
                    value = value.trimLeft();
                }
                if (trimRight) {
                    value = value.trimRight();
                }
            }
            if (value) {
                if (singleline) {
                    value = value.replace(newlineRegex, singleline);
                }
                if (collapseWhitespace) {
                    if (singleline) {
                        value = value.replace(whitespace, ' ');
                    }
                    else if (maxEmptyLines) {
                        value = value
                            .split(linebreakRegex)
                            .map(trimAndCollapseWS)
                            .join('\n')
                            .replace(emptyLineRegex, emptyLineString);
                    }
                    else {
                        value = value
                            .split(newlineWithWSRegex)
                            .map(collapseWS)
                            .join('\n');
                    }
                }
                if (truncate != null && value.length > truncate) {
                    value = value.substring(0, truncate);
                }
                if (uppercase) {
                    value = value.toUpperCase();
                }
                else if (lowercase) {
                    value = value.toLowerCase();
                }
                if (capitalize) {
                    switch (capitalize) {
                        case 'characters':
                            value = value.toUpperCase();
                            break;
                        case 'words':
                            value = value.replace(wordRegex, strToUpperCase);
                            break;
                        case 'sentences':
                            value = value.replace(sentenceRegex, strToUpperCase);
                            break;
                        case 'first':
                        default:
                            value = value[0].toUpperCase() + value.slice(1);
                            break;
                    }
                }
            }
        }
        if (sanitize) {
            const valueOrNull = sanitize(value);
            if (valueOrNull == null) {
                return null;
            }
            value = valueOrNull;
        }
        if (nonEmpty && !value) {
            return handleError({
                code: 'empty',
                originalValue: unknownValue,
                value,
                ast,
                config,
            });
        }
        if (minLength != null && value.length < minLength) {
            return handleError({
                code: 'minLength',
                originalValue: unknownValue,
                value,
                ast,
                config,
            });
        }
        if (maxLength != null && value.length > maxLength) {
            return handleError({
                code: 'maxLength',
                originalValue: unknownValue,
                value,
                ast,
                config,
            });
        }
        if (regex != null && !regex.test(value)) {
            return handleError({
                code: 'pattern',
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
//# sourceMappingURL=string.js.map