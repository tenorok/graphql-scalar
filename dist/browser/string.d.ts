import { GraphQLScalarType } from 'graphql';
import { IScalarConfig } from './ts';
export declare type StringScalarErrorCode = 'type' | 'empty' | 'minLength' | 'maxLength' | 'pattern' | 'validate';
export interface IStringScalarConfig<TInternal = string, TExternal = string> extends IScalarConfig<IStringScalarConfig<TInternal, TExternal>, StringScalarErrorCode, string, TInternal, TExternal> {
    capitalize?: 'characters' | 'words' | 'sentences' | 'first';
    collapseWhitespace?: boolean;
    lowercase?: boolean;
    maxEmptyLines?: number;
    maxLength?: number;
    minLength?: number;
    nonEmpty?: boolean;
    pattern?: RegExp | string;
    singleline?: string;
    trim?: boolean;
    trimLeft?: boolean;
    trimRight?: boolean;
    truncate?: number;
    uppercase?: boolean;
}
export declare const createStringScalar: <TInternal = string, TExternal = string>(config: IStringScalarConfig<TInternal, TExternal>) => GraphQLScalarType;
//# sourceMappingURL=string.d.ts.map