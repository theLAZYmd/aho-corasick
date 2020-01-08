import { TrieOptions, Output, SearchOptions } from './interfaces';
export default class AC {
    substrings: string[];
    output: Output;
    private dict;
    private suffix;
    private startOnly;
    constructor(substrings: string[], options?: TrieOptions);
    /**
     * Returns the number of results found for the last search
     * @returns {Number}
     */
    get length(): Number;
    /**
     * Build a new trie instance against which strings can be searched
     * @param {string[]} substrings The list of substrings against which to check each string
     * @param {trieOptions} options Options to specify the trie building settings
     * @private
     */
    buildTrie(substrings: string[], options?: TrieOptions): void;
    /**
     * Build a new suffix tree based on tree substrings input
     * @private
     */
    buildSuffix(): void;
    check(str: string, options: SearchOptions): boolean;
    /**
     * Searchs a string for the pre-defined substrings and returns all that are found
     * @param {string} string
     * @param {searchOptions} options
     * @public
     * @returns {string[]}
     */
    search(str: string, options?: SearchOptions): string[][] | [number, string] | string;
}
