"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var graphql_1 = require("graphql");
var common_1 = require("./common");
exports.isSafeFloat = function (n) {
    return typeof n === 'number' && isFinite(n);
};
exports.createFloatScalar = function (config) {
    var coerce = config.coerce, errorHandler = config.errorHandler, maximum = config.maximum, minimum = config.minimum, parse = config.parse, sanitize = config.sanitize, validate = config.validate, serialize = config.serialize, scalarConfig = tslib_1.__rest(config, ["coerce", "errorHandler", "maximum", "minimum", "parse", "sanitize", "validate", "serialize"]);
    var handleError = errorHandler || common_1.defaultErrorHandler;
    var parseValue = function (unknownValue, ast) {
        if (unknownValue == null) {
            return null;
        }
        var value;
        if (exports.isSafeFloat(unknownValue)) {
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
        if (sanitize && value != null) {
            var valueOrNull = sanitize(value);
            if (valueOrNull == null) {
                return null;
            }
            value = valueOrNull;
        }
        if (minimum != null && value < minimum) {
            return handleError({
                code: 'minimum',
                originalValue: unknownValue,
                value: value,
                ast: ast,
                config: config,
            });
        }
        if (maximum != null && value > maximum) {
            return handleError({
                code: 'maximum',
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
//# sourceMappingURL=float.js.map