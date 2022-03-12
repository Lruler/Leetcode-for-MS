// https://leetcode-cn.com/problems/path-sum/

// dfs 递归
var hasPathSum = function (root, targetSum) {
    if (!root) return false
    let res = false
    const dfs = (n, s) => {
        if (!n.left && !n.right && s === targetSum) {
            res = true
        }
        if (n.left) dfs(n.left, s + n.left.val)
        if (n.right) dfs(n.right, s + n.right.val)
    }
    dfs(root, root.val)
    return res
};

// bfs 
const hasPathSum = (root, targetSum) => {
    if (!root) return false;
    let res = false
    let queue = [];

    while (root) {
        
    }
}