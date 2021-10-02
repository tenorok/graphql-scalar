import { GraphQLScalarType } from 'graphql';
import { IScalarConfig } from './ts';
export declare type FloatScalarErrorCode = 'type' | 'minimum' | 'maximum' | 'validate';
export interface IFloatScalarConfig<TInternal = number, TExternal = number> extends IScalarConfig<IFloatScalarConfig<TInternal, TExternal>, FloatScalarErrorCode, number, TInternal, TExternal> {
    maximum?: number;
    minimum?: number;
}
export declare const isSafeFloat: (n: unknown) => n is number;
export declare const createFloatScalar: <TInternal = string, TExternal = string>(config: IFloatScalarConfig<TInternal, TExternal>) => GraphQLScalarType;
//# sourceMappingURL=float.d.ts.map