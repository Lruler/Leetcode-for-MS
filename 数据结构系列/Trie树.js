/* 
// https://labuladong.gitee.io/algo/2/21/49/
Trie树，字典树，前缀树，单词查找树，由二叉树衍生，主要应用处理字符串前缀相关操作
树枝存储前缀(字符) 节点存储值 每个节点的children是一个数组 长度为256 (ASCII码对照)
*/

/* 
T208 https://leetcode-cn.com/problems/implement-trie-prefix-tree/
构造Trie
*/

var Trie = function () {
    this.children = {};
};

Trie.prototype.insert = function (word) {
    let node = this.children;
    for (const ch of word) {
        if (!node[ch]) {
            node[ch] = {};
        }
        node = node[ch];
    }
    node.isEnd = true;
};

Trie.prototype.searchPrefix = function (prefix) {
    let node = this.children;
    for (const ch of prefix) {
        if (!node[ch]) {
            return false;
        }
        node = node[ch];
    }
    return node;
}

Trie.prototype.search = function (word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
};

Trie.prototype.startsWith = function (prefix) {
    return this.searchPrefix(prefix);
};


/* 
T648 MID https://leetcode-cn.com/problems/replace-words/submissions/
单词替换 就是求单词的前缀
*/
var replaceWords = function (dictionary, sentence) {
    const trie = new Trie();
    const ans = [];

    for (const word of dictionary) {
        trie.insert(word);
    }

    sentence = sentence.split(' ');

    sentence.forEach(word => {
        ans.push(trie.shortestKey(word));
    });

    return ans.join(' ');
};

class Trie {
    constructor() {
        this.dict = {};
    }
    insert(word) {
        let node = this.dict;
        for (let i = 0; i < word.length; i++) {
            const w = word[i];
            if (!node[w]) {
                node[w] = {
                    isEnd: false,
                }
            }
            node = node[w];
        }
        node.isEnd = true;
    }
    shortestKey(word) {
        let node = this.dict;
        for (let i = 0; i < word.length; i++) {
            const w = word[i];
            if (node[w]) {
                node = node[w];
                if (node.isEnd) {
                    return word.slice(0, i + 1);
                }
            } else {
                break;
            }
        }
        return word;
    }
}

/* 
T211 MID https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/
构造词典 就是做出模式匹配(类似正则)
*/

var WordDictionary = function () {
    this.trieRoot = new TrieNode();
};

WordDictionary.prototype.addWord = function (word) {
    this.trieRoot.insert(word);
};

WordDictionary.prototype.search = function (word) {
    const dfs = (index, node) => {
        if (index === word.length) {
            return node.isEnd;
        }
        const ch = word[index];
        if (ch !== '.') {
            const child = node.children[ch.charCodeAt() - 'a'.charCodeAt()]
            if (child && dfs(index + 1, child)) {
                return true;
            }
        } else {
            for (const child of node.children) {
                if (child && dfs(index + 1, child)) {
                    return true;
                }
            }
        }
        return false;
    }

    return dfs(0, this.trieRoot);
};

class TrieNode {
    constructor() {
        this.children = new Array(26).fill(0);
        this.isEnd = false;
    }

    insert(word) {
        let node = this;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            const index = ch.charCodeAt() - 'a'.charCodeAt();
            if (node.children[index] === 0) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index];
        }
        node.isEnd = true;
    }

    getChildren() {
        return this.children;
    }

    isEnd() {
        return this.isEnd;
    }
}
// 正则写法
var WordDictionary = function () {
    this.words = {}
};

WordDictionary.prototype.addWord = function (word) {
    if (this.words[word.length]) {
        this.words[word.length].push(word)
    } else {
        this.words[word.length] = [word]
    }
};

WordDictionary.prototype.search = function (word) {
    if (!this.words[word.length]) return false
    if (!word.includes('.')) {
        return this.words[word.length].some(item => item === word)
    }
    const rule = new RegExp(word)
    return this.words[word.length].some(item => {
        return rule.test(item)
    })
};


/* 
677 MId https://leetcode-cn.com/problems/map-sum-pairs/
键值映射 前面都是只考虑前缀 即树枝 没考虑节点 这个就是把节点也加上了
*/