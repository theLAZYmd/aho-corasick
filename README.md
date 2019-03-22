# LAZYahocorasick

The Aho-Corasick algorithm is the fastest string-matching algorithm for a set of substrings of a fixed number that are known beforehand. Its runs at O(n) for each new string processed, where n indicates the length of the string in number of characters. This is accomplished by first building a 'trie' or 'tree' from the number of substrings that are to be matched to the string. Each substring is broken down into constituent characters and a trie built up. The trie includes the 'child' characters that follow (stored in the 'dict' object of the script) and the 'suffix' characters that list the identical suffixes at any point on the trie (stored in the 'suffix' object of the script). You can read more about the algorithm [here](https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm)

This build of the Aho-Corasick algorithm has three main priorities:
- Ease of use for the user
- Number of features built in for the user
- Speed using the latest ES6 methods

To use the library, simply build the trie using the `new` keyword, then use the `.search()` method to begin searching within a string. A typical implementation might look like this:

```js
const lazyac = require('lazy-aho-corasick');

let substrings = [
    'a',
    'ab',
    'bab',
    'bc',
    'bca',
    'c',
    'caa'
];
let string = 'abccab';

const trie = new lazyac(substrings)
console.log(trie.search(string)); //[ 'a', 'ab', 'bc', 'c', 'c', 'a', 'ab']
```

This build also lets you specify a number of options with the initial build, which so far are:

- `allowDuplicates`: (boolean) set to `false` to skip duplicate substrings on the input. A substring inputted twice that appears twice will only be listed twice. A substring inputted 3 times that appears 5 times will be listed 5 times. Should be used on the trie when dealing with a large number of substrings - only checking the start vastly improves trie build time.
- `startOnly`: (boolean) a reduce from of Aho-Corasick, which just checks for substrings at the start of the string. As soon as a failure is introduced, the substring becomes null (no matches can be found from the middle of the string).

Specify options using an object as the second parameter, ex:

```js
const lazyac = require('lazy-aho-corasick');

const trie = new lazyac(['b', 'c', 'aa', 'd', 'b'], {
    "allowDuplicates": false,
    "startOnly": false
})

console.log(trie.search('caaab')); //[ 'c', 'aa', 'aa', 'b' ]
```

Options can also be specified on an individual level for incoming strings:

- `positions`: (boolean) returns each found substring with its position (of last character) in the string. The found substrings are returned as nested Arrays, where the index of each represents the character position at which that set of substrings was found.
- `startOnly`: (boolean) only checks the start of the string. Does not improve runtime or build time; it is for running multiple strings past a trie, some of which require a start-only parameter to be true
- `return`: (string: all|first|last|shortest|longest; def: all) whether to reduce the output value. `all` returns all substrings found in the string, the rest only return one.

Do this by using an object as the second parameter on the `.search()` method, ex:

```js
const lazyac = require('./main');
let trie = new lazyac(['a', 'b', 'c', 'aa', 'd', 'b'])

console.log(trie.search('caaab', {
    "positions": true
}));    //[ [ 'c' ], [ 'a' ], [ 'aa', 'a' ], [ 'aa', 'a' ], [ 'b', 'b' ] ]
```

v.1.0.0