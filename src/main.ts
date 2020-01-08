import { TrieOptions, Dictionary, Output, SearchOptions } from './interfaces';

export default class AC {

	public output: Output = [[]]
	private dict: Dictionary = [{}]
	private suffix: Map<number, number> = new Map()
	private startOnly: boolean

    constructor(public substrings: string[], options: TrieOptions = {
		allowDuplicates: true,
		startOnly: false
	}) {
		this.startOnly = options.startOnly || false;
        this.buildTrie(substrings, { 
			allowDuplicates: options.allowDuplicates || false
		 });
        if (!this.startOnly) this.buildSuffix();
    };

	/**
	 * Returns the number of results found for the last search
	 * @returns {Number}
	 */
    public get length (): Number {
        return this.output ? this.output.length : 0;
    }

	/**
	 * Build a new trie instance against which strings can be searched
	 * @param {string[]} substrings The list of substrings against which to check each string
	 * @param {trieOptions} options Options to specify the trie building settings
	 * @private
	 */
    public buildTrie(substrings: string[], options: TrieOptions = {}): void {
        let dict = [{}] as Dictionary;
        let output = [[]] as Output;
        let state = 0;
        for (let word of substrings) {
            let index = 0;
            for (let char of word) {                                   //dict: {0: {a: 1}}
                if (dict[index] && dict[index][char]) index = dict[index][char];
                else {
                    state++;                                           //1
                    dict[index][char] = state;                         //dict: {0: {a: 1}}
                    dict[state] = {};                                  //dict: {0: {a: 1}, 1: {}}
                    index = state;                                     //1
                    output[index] = [];                                //output: {1: []}
                }
            }
            if (options.allowDuplicates || output[index].indexOf(word) === -1) output[index].push(word);
        }
        this.dict = dict;
        this.output = output;
    }

	/**
	 * Build a new suffix tree based on tree substrings input
	 * @private
	 */
    public buildSuffix(): void {
        let dict = this.dict;
        let output = this.output;
        let suffix: Map<number, number> = new Map(Object.values(dict[0]).map(state => [state, 0]));        // represents the blue suffix link in the visual trie
        let xsuffix = Array.from(suffix.keys());
        while (xsuffix.length) {
			let r = xsuffix.shift() as number;
            // for each symbol a such that g(r, a) = s
            for (let [word, s] of Object.entries(dict[r])) {
                xsuffix.push(s);
                let state = suffix.get(r) as number;
                while(state > 0 && !dict[state][word]) {
                    state = suffix.get(state) as number;
                }
                if (dict[state][word]) {
                    let index = dict[state][word];
                    suffix.set(s, index);
                    output[s] = output[s].concat(output[index]);
                }
                else suffix.set(s, 0);
            }
        }
        this.dict = dict;
        this.output = output;
        this.suffix = suffix;
	}

	public check(str: string, options: SearchOptions): boolean {
		let s = this.search(str, options);
		return Boolean(s[0]);
	}

	/**
	 * Searchs a string for the pre-defined substrings and returns all that are found
	 * @param {string} string 
	 * @param {searchOptions} options 
	 * @public
	 * @returns {string[]}
	 */
    public search(str: string, options: SearchOptions = {
		positions: false,
		returns: 'all',
		startOnly: false
	} as SearchOptions): string[][] | [number, string] | string {
		if (!options.returns) options.returns = 'all';
        let state = 0;      //signifies the index in the dict
		let results = [] as (string | string[])[];
		DictLoop:
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            while (state > 0 && !this.dict[state][char] && this.suffix) {
                state = this.suffix.get(state) as number;
            }
            if (!this.dict[state][char]) {
                if (this.startOnly || options.startOnly) {
					if (options.returns === 'all') return [];
					else if (options.positions) return [-1, ''];
					else return '';
				}
                continue;
            }
            state = this.dict[state][char];
            if (this.output[state].length > 0) {
                let found = this.output[state];
                if (options.positions && options.returns === 'all') results[i] = found;
                else results.push(...found);
            }
        }
        let output = (() => {
            switch (options.returns) {
                case 'all':
                    return results as string[][]
                case 'first':
                    return this.substrings.find(s => results.indexOf(s) !== -1) as string;
                case 'last':
                    return this.substrings.reverse().find(s => results.indexOf(s) !== -1) as string;
                case 'shortest':
                    return (results as string[]).reduce((acc, curr) => curr.length < acc[0] ? [curr.length, curr] : acc, [Infinity, ''])[1] as string;
                case 'longest':
                    return (results as string[]).reduce((acc, curr) => curr.length > acc[0] ? [curr.length, curr] : acc, [0, ''])[1] as string;
            }
        })();
		if (options.returns === 'all') return output as string[][];
		else if (!options.positions) return output as string;
        else return [this.substrings.indexOf(output as string), output as string];
    }

}