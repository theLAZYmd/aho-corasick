import * as regexes from './regexes';

enum CharType {}
export type Char = string & CharType 
export const isChar = (str: string): str is Char => regexes.char.test(str);

export function char(c:string): Char{
   if (!isChar(c)) throw new Error('not a char');
   return c
}

export interface TrieOptions {
	allowDuplicates?: boolean
	startOnly?: boolean
}

export interface SearchOptions {
	positions?: boolean
	returns?: 'all' | 'first' | 'last' | 'shortest' | 'longest'
	startOnly?: boolean
}

export type Dictionary = {
	[key: string]: number
}[]

export type Output = (string)[][]