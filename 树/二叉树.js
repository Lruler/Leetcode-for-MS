/* 
二叉树 典中典中典中典

看一下二叉树遍历框架

traverse = (TreeNode root) {
    if (root == null) return node

    // 前序操作
    traverse(root.left)
    // 中序操作
    traverse(root.right)
    // 后序操作
}
前序位置的代码在刚刚进入一个二叉树节点的时候执行；

后序位置的代码在将要离开一个二叉树节点的时候执行；

中序位置的代码在一个二叉树节点左子树都遍历完， 即将开始遍历右子树的时候执行。

二叉树题目的递归解法可以分两类思路， 第一类是遍历一遍二叉树得出答案，
第二类是通过分解问题计算出答案， 这两类思路分别对应着 回溯算法核心框架 和 动态规划核心框架。
*/

/* 
T104 easy https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
求二叉树深度
*/
// 第一种递归接法
var maxDepth = function (root) {
    let res = 0;
    let deepth = 0;
    const traverse = (root) => {
        if (root == null) res = Math.max(res, deepth)

        deepth++
        traverse(root.left)
        traverse(root.right)
        deepth--
    }
    return res
};
// 第二种分解问题解法
var maxDepth2 = (root) => {
    if (root == null) return 0

    let leftMax = maxDepth2(root.left)
    let rightMax = maxDepth2(root.right)

    return Math.max(leftMax, rightMax) + 1
}

/* 
后序遍历解题
这里还要注意后序的特殊之处
因为后序实在出节点后 也就是说 他可以拿到 子节点递归完成后的数据！
也就是说 如果题目和子树有关 那么很大可能性是需要后序操作
T543  https://leetcode-cn.com/problems/diameter-of-binary-tree/
求二叉树直径
*/

var diameterOfBinaryTree = function (root) {
    let res = 0
    depth(root)
    return res

    function depth(node) {
        if (!node) return 0 // 节点不存在返回0
        let left = depth(node.left) // left为左子树的深度
        let right = depth(node.right) //right 为右子树的深度
        res = Math.max(left + right, res) //计算l+r 更新res
        return Math.max(left, right) + 1 //返回该节点为根的子树的深度
    }
};
/* 
T124 https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/
求二叉树最大路径和
*/
var maxPathSum = function (root) {
    let max = root.val;
    const traverse = (node) => {
        if (node !== null) {
            const left = Math.max(0, traverse(node.left));
            const right = Math.max(0, traverse(node.right));
            max = Math.max(max, left + right + node.val);
            return Math.max(left, right) + node.val
        }
        return 0
    }
    traverse(root);
    return max

};

/* 
T366 要VIP 简单的写一下
输入[1,2,3,4,5] 输出 [[4,5,3],[2], [1]]
*/

/* 
层序遍历 就是迭代遍历嘛 
一个while循环 分管树枝 从上到下 一个for 循环 分管树层 从左到右
BFS 就是从层序遍历推广来的
*/

/* 
T515 https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/
找出树的每一层最大值
 */
var largestValues = function (root, res = []) {
    const queue = []
    if (root) queue.push(root)
    while (queue.length) {
        let len = queue.length
        const curLevel = []
        for (let i = 0; i < len; i++) {
            let node = queue.shift()
            curLevel.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        res.push(Math.max(...curLevel))
    }
    return res
};