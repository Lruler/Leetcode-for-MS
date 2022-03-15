// https://leetcode-cn.com/problems/count-complete-tree-nodes/submissions/
// https://labuladong.gitee.io/algo/2/19/34/

/* 
计算完全二叉树的根节点数

首先注意 计算一颗普通二叉树节点
public int countNodes(TreeNode root) {
    if (root == null) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

计算一颗满二叉树节点
public int countNodes(TreeNode root) {
    int h = 0;
    // 计算树的高度
    while (root != null) {
        root = root.left;
        h++;
    }
    // 节点总数就是 2^h - 1
    return (int) Math.pow(2, h) - 1;
}
而计算完全二叉树 就是把二者结合起来
因为一颗完全二叉树 至少有一颗子树是满二叉树
*/
var countNodes = function (root) {
    let l = root,
        r = root;
    let hl = 0,
        hr = 0;
    while (l) {
        l = l.left
        hl++
    }
    while (r) {
        r = r.right
        hr++
    }
    if (hl == hr) {
        return Math.pow(2, hl) - 1
    }
    return 1 + countNodes(root.left) + countNodes(root.right)
};