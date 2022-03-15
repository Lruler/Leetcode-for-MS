// https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/

// 求两颗二叉树最近的公共祖先

/* 
考虑三个情况
1. p, q 都在 root为根的子树中 
2. 都不在
3. 有一个在
*/

var lowestCommonAncestor = function (root, p, q) {
    let ans;
    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
            ans = root;
        }
        return lson || rson || (root.val === p.val || root.val === q.val);
    }
    dfs(root, p, q);
    return ans;
};