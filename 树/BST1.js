/* 
二叉搜索树 BST 左节点比右节点小 基于此的数据结构还有AVL树 红黑树 B+树 线段树
中序遍历可以将BST中的值升序打印出来
*/

/* 
T230 https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/
二叉搜索树第k小的元素
*/

var kthSmallest = function (root, k) {
    let arr = []
    const res = (root) => {
        if (!root) return
        res(root.left);
        arr.push(root.val)
        res(root.right)
    }
    res(root);
    return arr[k - 1]
};


/* 
t538 https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/
把BST转换成累加树
*/
var bstToGst = function (root) {
    let sum = 0
    const t = (root) => {
        if (!root) return;
        t(root.right)
        sum += root.val
        root.val = sum
        t(root.left)
    }
    t(root)
    return root
};