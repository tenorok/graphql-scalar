import { GraphQLScalarTypeConfig, ValueNode } from 'graphql';
import { ExcludeKeys } from 'tsdef';
export interface IScalarParseError<TConfig, TCode = string> {
    code: TCode;
    originalValue: unknown;
    value: unknown;
    ast?: ValueNode;
    config: TConfig;
}
export declare type ScalarParseErrorHandler<TInternal, TConfig, TCode = string> = (errorInfo: IScalarParseError<TConfig, TCode>) => TInternal;
export declare type ScalarCoerceFunction<T> = (raw: unknown) => T | null | undefined;
export declare type ScalarSanitizeFunction<T> = (value: T) => T | null | undefined;
export declare type ScalarValidateFunction<T> = (value: T) => boolean;
export declare type ScalarParseFunction<T, U> = (value: T) => U;
export declare type ScalarSerializeFunction<T, U> = (value: T) => U;
export interface IScalarConfig<TConfig, TErrorCode, TValue, TInternal, TExternal> extends ExcludeKeys<GraphQLScalarTypeConfig<TInternal, TExternal>, 'serialize' | 'parseValue' | 'parseLiteral'> {
    coerce?: ScalarCoerceFunction<TValue>;
    errorHandler?: ScalarParseErrorHandler<TInternal, TConfig, TErrorCode>;
    parse?: ScalarParseFunction<TValue, TInternal>;
    sanitize?: ScalarSanitizeFunction<TValue>;
    serialize?: ScalarSerializeFunction<TInternal, TExternal>;
    validate?: ScalarValidateFunction<TValue>;
}
//# sourceMappingURL=ts.d.ts.map