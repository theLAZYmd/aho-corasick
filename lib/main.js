"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AC = /** @class */ (function () {
    function AC(substrings, options) {
        if (options === void 0) { options = {
            allowDuplicates: true,
            startOnly: false
        }; }
        this.substrings = substrings;
        this.output = [[]];
        this.dict = [{}];
        this.suffix = new Map();
        this.startOnly = options.startOnly || false;
        this.buildTrie(substrings, {
            allowDuplicates: options.allowDuplicates || false
        });
        if (!this.startOnly)
            this.buildSuffix();
    }
    ;
    Object.defineProperty(AC.prototype, "length", {
        /**
         * Returns the number of results found for the last search
         * @returns {Number}
         */
        get: function () {
            return this.output ? this.output.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Build a new trie instance against which strings can be searched
     * @param {string[]} substrings The list of substrings against which to check each string
     * @param {trieOptions} options Options to specify the trie building settings
     * @private
     */
    AC.prototype.buildTrie = function (substrings, options) {
        if (options === void 0) { options = {}; }
        var dict = [{}];
        var output = [[]];
        var state = 0;
        for (var _i = 0, substrings_1 = substrings; _i < substrings_1.length; _i++) {
            var word = substrings_1[_i];
            var index = 0;
            for (var _a = 0, word_1 = word; _a < word_1.length; _a++) { //dict: {0: {a: 1}}
                var char = word_1[_a];
                if (dict[index] && dict[index][char])
                    index = dict[index][char];
                else {
                    state++; //1
                    dict[index][char] = state; //dict: {0: {a: 1}}
                    dict[state] = {}; //dict: {0: {a: 1}, 1: {}}
                    index = state; //1
                    output[index] = []; //output: {1: []}
                }
            }
            if (options.allowDuplicates || output[index].indexOf(word) === -1)
                output[index].push(word);
        }
        this.dict = dict;
        this.output = output;
    };
    /**
     * Build a new suffix tree based on tree substrings input
     * @private
     */
    AC.prototype.buildSuffix = function () {
        var dict = this.dict;
        var output = this.output;
        var suffix = new Map(Object.values(dict[0]).map(function (state) { return [state, 0]; })); // represents the blue suffix link in the visual trie
        var xsuffix = Array.from(suffix.keys());
        while (xsuffix.length) {
            var r = xsuffix.shift();
            // for each symbol a such that g(r, a) = s
            for (var _i = 0, _a = Object.entries(dict[r]); _i < _a.length; _i++) {
                var _b = _a[_i], word = _b[0], s = _b[1];
                xsuffix.push(s);
                var state = suffix.get(r);
                while (state > 0 && !dict[state][word]) {
                    state = suffix.get(state);
                }
                if (dict[state][word]) {
                    var index = dict[state][word];
                    suffix.set(s, index);
                    output[s] = output[s].concat(output[index]);
                }
                else
                    suffix.set(s, 0);
            }
        }
        this.dict = dict;
        this.output = output;
        this.suffix = suffix;
    };
    AC.prototype.check = function (str, options) {
        var s = this.search(str, options);
        return Boolean(s[0]);
    };
    /**
     * Searchs a string for the pre-defined substrings and returns all that are found
     * @param {string} string
     * @param {searchOptions} options
     * @public
     * @returns {string[]}
     */
    AC.prototype.search = function (str, options) {
        var _this = this;
        if (options === void 0) { options = {
            positions: false,
            returns: 'all',
            startOnly: false
        }; }
        if (!options.returns)
            options.returns = 'all';
        var state = 0; //signifies the index in the dict
        var results = [];
        DictLoop: for (var i = 0; i < str.length; i++) {
            var char = str[i];
            while (state > 0 && !this.dict[state][char] && this.suffix) {
                state = this.suffix.get(state);
            }
            if (!this.dict[state][char]) {
                if (this.startOnly || options.startOnly) {
                    if (options.returns === 'all')
                        return [];
                    else if (options.positions)
                        return [-1, ''];
                    else
                        return '';
                }
                continue;
            }
            state = this.dict[state][char];
            if (this.output[state].length > 0) {
                var found = this.output[state];
                if (options.positions && options.returns === 'all')
                    results[i] = found;
                else
                    results.push.apply(results, found);
            }
        }
        var output = (function () {
            switch (options.returns) {
                case 'all':
                    return results;
                case 'first':
                    return _this.substrings.find(function (s) { return results.indexOf(s) !== -1; });
                case 'last':
                    return _this.substrings.reverse().find(function (s) { return results.indexOf(s) !== -1; });
                case 'shortest':
                    return results.reduce(function (acc, curr) { return curr.length < acc[0] ? [curr.length, curr] : acc; }, [Infinity, ''])[1];
                case 'longest':
                    return results.reduce(function (acc, curr) { return curr.length > acc[0] ? [curr.length, curr] : acc; }, [0, ''])[1];
            }
        })();
        if (options.returns === 'all')
            return output;
        else if (!options.positions)
            return output;
        else
            return [this.substrings.indexOf(output), output];
    };
    return AC;
}());
exports.default = AC;
