const Error = require("./errors");

class LAZYac {
    
    constructor(substrings, options = {}) {
        this.substrings = substrings;
        this.startOnly = options.startOnly || false;
        this.buildTrie(substrings, options);
        if (!this.startOnly) this.buildSuffix();
    };

    get length () {
        return this.output.length;
    }

    buildTrie(substrings, options) { //Build a tree out of the substrings. Only needs to be done once for a given set of substrings
        let dict = [{}]
        let allowDuplicates = typeof options.allowDuplicates !== "undefined" ? options.allowDuplicates : true;
        let output = [[]];
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
            if (allowDuplicates || output[index].indexOf(word) === -1) output[index].push(word);
        }
        this.dict = dict;
        this.output = output;
    }

    buildSuffix() {
        let dict = this.dict;
        let output = this.output;
        let suffix = new Map(Object.values(dict[0]).map(state => [state, 0]));        // represents the blue suffix link in the visual trie
        let xsuffix = Array.from(suffix.keys());
        while (xsuffix.length) {
            let r = xsuffix.shift();
            // for each symbol a such that g(r, a) = s
            for (let [word, s] of Object.entries(dict[r])) {
                xsuffix.push(s);
                let state = suffix.get(r);
                while(state > 0 && !dict[state][word]) {
                    state = suffix.get(state);
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

    search (string, _options = {}) {
        let options = Object.assign({
            "positions": false,
            "return": "all",             //"all", "first", "last", "shortest", "longest"
            "startOnly": false
        }, _options);
        if (typeof options.positions !== "boolean") throw new Error('boolean');
        if (typeof options.startOnly !== "boolean") throw new Error('boolean');
        if (!/^(?:all|first|last|shortest|longest)$/.test(options.return)) throw new Error('value').setValues(["all", "first", "last", "shortest", "longest"]);
        let state = 0;      //signifies the index in the dict
        let results = [];
        for (let i = 0; i < string.length; i++) {
            let char = string[i];
            while (state > 0 && !this.dict[state][char] && this.suffix) {
                state = this.suffix.get(state);
            }
            if (!this.dict[state][char]) {
                if (this.startOnly || options.startOnly) return;
                continue;
            }
            state = this.dict[state][char];
            if (this.output[state].length > 0) {
                let found = this.output[state];
                if (options.positions && options.return === "all") results[i] = found;
                else results.push(...found);
            }
        }
        let output = (() => {
            switch (options.return) {
                case "all":
                    return results
                case "first":
                    return this.substrings.find(s => results.indexOf(s) !== -1);
                case "last":
                    return this.substrings.reverse().find(s => results.indexOf(s) !== -1);
                case "shortest":
                    return results.reduce((acc, curr) => curr.length < acc[0] ? [curr.length, curr] : acc, [Infinity, null])[1];
                case "longest":
                    return results.reduce((acc, curr) => curr.length > acc[0] ? [curr.length, curr] : acc, [0, null])[1];
            }
        })();
        if (!options.positions || options.return === "all") return output;
        else return [this.substrings.indexOf(output), output];
    }

}

module.exports = LAZYac;