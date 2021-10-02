"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var error_1 = require("graphql/error");
exports.defaultErrorHandler = function (_a) {
    var code = _a.code, ast = _a.ast;
    throw new error_1.GraphQLError("code=" + code, ast ? [ast] : []);
};
exports.defaultSerialize = function (x) { return x; };
exports.getValueFromValueNode = function (ast) {
    switch (ast.kind) {
        case graphql_1.Kind.BOOLEAN:
            return ast.value;
        case graphql_1.Kind.FLOAT:
            return parseFloat(ast.value);
        case graphql_1.Kind.INT:
            return parseInt(ast.value, 10);
        case graphql_1.Kind.NULL:
            return null;
        case graphql_1.Kind.STRING:
            return ast.value;
        case graphql_1.Kind.ENUM:
            return ast.value;
    }
    return undefined;
};
//# sourceMappingURL=common.js.map