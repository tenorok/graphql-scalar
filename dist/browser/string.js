"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var graphql_1 = require("graphql");
var common_1 = require("./common");
var strToUpperCase = function (str) { return str.toUpperCase(); };
var wordRegex = /(?:^|\s)\S/g;
var sentenceRegex = /(?:^|\.\s)\S/g;
var newlineRegex = /[\r\n]+/g;
var newlineWithWSRegex = /\s*[\r\n]+\s*/g;
var linebreakRegex = /\r\n|\r|\n/g;
var whitespace = /\s+/g;
var collapseWS = function (str) { return str.replace(whitespace, ' '); };
var trimAndCollapseWS = function (str) {
    return str.trim().replace(whitespace, ' ');
};
exports.createStringScalar = function (config) {
    var capitalize = config.capitalize, coerce = config.coerce, collapseWhitespace = config.collapseWhitespace, errorHandler = config.errorHandler, lowercase = config.lowercase, maxEmptyLines = config.maxEmptyLines, maxLength = config.maxLength, minLength = config.minLength, nonEmpty = config.nonEmpty, parse = config.parse, pattern = config.pattern, sanitize = config.sanitize, serialize = config.serialize, singleline = config.singleline, trim = config.trim, trimLeft = config.trimLeft, trimRight = config.trimRight, truncate = config.truncate, uppercase = config.uppercase, validate = config.validate, scalarConfig = tslib_1.__rest(config, ["capitalize", "coerce", "collapseWhitespace", "errorHandler", "lowercase", "maxEmptyLines", "maxLength", "minLength", "nonEmpty", "parse", "pattern", "sanitize", "serialize", "singleline", "trim", "trimLeft", "trimRight", "truncate", "uppercase", "validate"]);
    var regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    var handleError = errorHandler || common_1.defaultErrorHandler;
    var emptyLineRegex = null;
    var emptyLineString = null;
    if (maxEmptyLines) {
        emptyLineRegex = new RegExp("\n{" + (maxEmptyLines + 2) + ",}", 'g');
        emptyLineString = '\n'.repeat(maxEmptyLines + 1);
    }
    var parseValue = function (unknownValue, ast) {
        if (unknownValue == null) {
            return null;
        }
        var value;
        if (typeof unknownValue === 'string') {
            value = unknownValue;
        }
        else {
            if (coerce) {
                var valueOrNull = coerce(unknownValue);
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
                    ast: ast,
                    config: config,
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
            var valueOrNull = sanitize(value);
            if (valueOrNull == null) {
                return null;
            }
            value = valueOrNull;
        }
        if (nonEmpty && !value) {
            return handleError({
                code: 'empty',
                originalValue: unknownValue,
                value: value,
                ast: ast,
                config: config,
            });
        }
        if (minLength != null && value.length < minLength) {
            return handleError({
                code: 'minLength',
                originalValue: unknownValue,
                value: value,
                ast: ast,
                config: config,
            });
        }
        if (maxLength != null && value.length > maxLength) {
            return handleError({
                code: 'maxLength',
                originalValue: unknownValue,
                value: value,
                ast: ast,
                config: config,
            });
        }
        if (regex != null && !regex.test(value)) {
            return handleError({
                code: 'pattern',
                originalValue: unknownValue,
                value: value,
                ast: ast,
                config: config,
            });
        }
        if (validate && !validate(value)) {
            return handleError({
                code: 'validate',
                originalValue: unknownValue,
                value: value,
                ast: ast,
                config: config,
            });
        }
        if (parse) {
            return parse(value);
        }
        return value;
    };
    return new graphql_1.GraphQLScalarType(tslib_1.__assign(tslib_1.__assign({}, scalarConfig), { serialize: serialize || common_1.defaultSerialize, parseValue: parseValue, parseLiteral: function (ast) {
            return parseValue(common_1.getValueFromValueNode(ast), ast);
        } }));
};
//# sourceMappingURL=string.js.map