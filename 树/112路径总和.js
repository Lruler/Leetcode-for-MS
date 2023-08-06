// https://leetcode.cn/problems/path-sum/  路径总和 简单
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
/* 
T113 https://leetcode.cn/problems/path-sum-ii/
MID 树的回溯 路径总和
*/
var pathSum = function (root, targetSum) {
    const res = [];
    if (!root) return res;
    const traverse = (root, sum, path) => {
        if (!root) return;
        let remain = sum - root.val;

        if (!root.left && !root.right) {
            if (remain == 0) {
                path.push(root.val);
                res.push([...path]);
                path.pop();
            }
            return;
        }
        path.push(root.val);
        traverse(root.left, remain, path);
        path.pop();
        path.push(root.val);
        traverse(root.right, remain, path);
        path.pop();
    }
    traverse(root, targetSum, []);
    return res;
};