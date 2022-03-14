/* 
细究如何写递归函数后 我们就来思考接下来的问题
那递归操作 究竟放在前序还是中序还是后序？
还是一句话 思考这个节点要干嘛 用啥遍历顺序就清楚了
*/

/* 
T652 https://leetcode-cn.com/problems/find-duplicate-subtrees/
寻找重复子树
*/

var findDuplicateSubtrees = function (root) {
    const res = [],
        visited = new Map();
    const traverse = root => {
        if (!root) return '#'
        const left = traverse(root.left)
        const right = traverse(root.right)
        const str = `${left},${right},${root.val}`
        const count = visited.get(str)
        if (count === 1) res.push(root)
        visited.set(str, (count || 0) + 1)
        return str
    }
    traverse(root)
    return res
};

