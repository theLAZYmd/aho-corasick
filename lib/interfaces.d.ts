declare enum CharType {
}
export declare type Char = string & CharType;
export declare const isChar: (str: string) => str is never;
export declare function char(c: string): Char;
export interface TrieOptions {
    allowDuplicates?: boolean;
    startOnly?: boolean;
}
export interface SearchOptions {
    positions?: boolean;
    returns?: 'all' | 'first' | 'last' | 'shortest' | 'longest';
    startOnly?: boolean;
}
export declare type Dictionary = {
    [key: string]: number;
}[];
export declare type Output = (string)[][];
export {};
