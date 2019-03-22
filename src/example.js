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
const trie1 = new lazyac(substrings)
console.log(trie1.search(string)); //[ 'a', 'ab', 'bc', 'c', 'c', 'a', 'ab']

const trie2 = new lazyac(['b', 'c', 'aa', 'd', 'b'], {
    "allowDuplicates": false,
    "startOnly": false
})
console.log(trie2.search('caaab')); //[ 'c', 'aa', 'aa', 'b' ]

const trie3 = new lazyac(['a', 'b', 'c', 'aa', 'd', 'b'])
console.log(trie3.search('caaab', {
    "positions": true
}));    //[ [ 'c' ], [ 'a' ], [ 'aa', 'a' ], [ 'aa', 'a' ], [ 'b', 'b' ] ]