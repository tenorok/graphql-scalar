import { GraphQLScalarType } from 'graphql';
import { IScalarConfig } from './ts';
export declare type IntScalarErrorCode = 'type' | 'minimum' | 'maximum' | 'validate';
export interface IIntScalarConfig<TInternal = number, TExternal = number> extends IScalarConfig<IIntScalarConfig<TInternal, TExternal>, IntScalarErrorCode, number, TInternal, TExternal> {
    maximum?: number;
    minimum?: number;
}
export declare const isSafeInteger: (n: unknown) => n is number;
export declare const createIntScalar: <TInternal = string, TExternal = string>(config: IIntScalarConfig<TInternal, TExternal>) => GraphQLScalarType;
//# sourceMappingURL=int.d.ts.map