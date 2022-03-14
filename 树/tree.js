/* 
T104 easy https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
求二叉树深度
*/
var maxDepth = function (root) {
    // 首先判断root节点是否为空 不为空就把最大深度返回并加一
    return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};


/* 
T543 east https://leetcode-cn.com/problems/diameter-of-binary-tree/
求二叉树直径长度 就是树中两个节点的最大距离
*/

var diameterOfBinaryTree = function (root) {

};