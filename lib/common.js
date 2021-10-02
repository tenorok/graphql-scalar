import { Kind, } from 'graphql';
import { GraphQLError } from 'graphql/error';
export const defaultErrorHandler = ({ code, ast, }) => {
    throw new GraphQLError(`code=${code}`, ast ? [ast] : []);
};
export const defaultSerialize = (x) => x;
export const getValueFromValueNode = (ast) => {
    switch (ast.kind) {
        case Kind.BOOLEAN:
            return ast.value;
        case Kind.FLOAT:
            return parseFloat(ast.value);
        case Kind.INT:
            return parseInt(ast.value, 10);
        case Kind.NULL:
            return null;
        case Kind.STRING:
            return ast.value;
        case Kind.ENUM:
            return ast.value;
    }
    return undefined;
};
//# sourceMappingURL=common.js.map