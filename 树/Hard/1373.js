// https://leetcode-cn.com/problems/maximum-sum-bst-in-binary-tree/
// https://labuladong.gitee.io/algo/2/19/30/

// 终点就是 明确一个节点 要做什么！！！

var maxSumBST = function (root) {
    let maxSum = 0;
    const traverse = (root) => {
        if (!root) return [1, Infinity, -Infinity, 0]

        let left = traverse(root.left)
        let right = traverse(root.right)

        let res = new Array(4)
        if (left[0] == 1 && right[0] == 1 &&
            root.val > left[2] && root.val < right[1]) {
            // 以 root 为根的二叉树是 BST
            res[0] = 1;
            // 计算以 root 为根的这棵 BST 的最小值
            res[1] = Math.min(left[1], root.val);
            // 计算以 root 为根的这棵 BST 的最大值
            res[2] = Math.max(right[2], root.val);
            // 计算以 root 为根的这棵 BST 所有节点之和
            res[3] = left[3] + right[3] + root.val;
            // 更新全局变量
            maxSum = Math.max(maxSum, res[3]);
        } else {
            // 以 root 为根的二叉树不是 BST
            res[0] = 0;
            // 其他的值都没必要计算了，因为用不到
        }
        return res
    }
    traverse(root)
    return maxSum
};