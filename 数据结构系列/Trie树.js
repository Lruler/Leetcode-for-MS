/* 
// https://labuladong.gitee.io/algo/2/21/48/
Trie树，字典树，前缀树，单词查找树，由二叉树衍生，主要应用处理字符串前缀相关操作
树枝存储前缀 节点存储值 每个节点都children是一个数组 长度为256 (ASCII码对照)
*/

class TrieNode {
    val = null
    children = new Array(256)
}

const getNode = (node, key) => {
    const p = node;

    for (let i = 0; i < key.length; i++) {
        if (p == null) return null
        const c = key.charAt(i)
        p = p.children[c]
    }
    return p
}


class TrieMap {

    R = 256;
    size = 0;
    constructor() {
        
    }

    put = (ket, val) => {

    }

    remove = (key) => { }
    
    get = (key) => { 
        const x = getNode(root, key)
        if (x == null || x.val == null) return null
        return x.val
    }
    
    containsKet = (key) => { 
        return get(key) !== null
    }
    
    shortestPrefixOf = (query) => { }
    
    longestPrefixOf = (query) => { }
    
    keysWithPrefix = (prefix) => { }
    
    hasKeywithPrefix = (prefix) => { }
    
    keysWithPattern = (pattern) => { }
    
    hasKeyWithPattern = (pattern) => { }
    
    
}