const AC = require('../lib/main').default;

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
const trie1 = new AC(substrings)
console.log(trie1.search(string)); //[ 'a', 'ab', 'bc', 'c', 'c', 'a', 'ab']

const trie2 = new AC(['b', 'c', 'aa', 'd', 'b'], {
    "allowDuplicates": false,
    "startOnly": false
})
console.log(trie2.search('caaab')); //[ 'c', 'aa', 'aa', 'b' ]

const trie3 = new AC(['a', 'b', 'c', 'aa', 'd', 'b'])
console.log(trie3.search('caaab', {
    "positions": true
}));    //[ [ 'c' ], [ 'a' ], [ 'aa', 'a' ], [ 'aa', 'a' ], [ 'b', 'b' ] ]