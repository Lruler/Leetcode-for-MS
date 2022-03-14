/* 
古人有云
快速排序 就是 二叉树的 前序遍历
归并排序 就是 二叉树的 后序遍历
所以换种角度理解 只要涉及到递归 全部都可以抽象成二叉树的问题
*/


/* 
T226 https://leetcode-cn.com/problems/invert-binary-tree/
翻转二叉树
*/

var invertTree = function (root) {
    if (!root) return null

    let temp = root.left;
    root.left = root.right
    root.right = root.temp

    invertTree(root.left)
    invertTree(root.right)
    return root
};


/* 
T116 https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/
填充二叉树节点右侧指针
*/
var connect = function (root) {
    function connectTwoNode(node1, node2) {
        if (!node1 || !node2) return

        node1.next = node2;

        connectTwoNode(node1.left, node1.right)
        connectTwoNode(node2.left, node2.right)
        connectTwoNode(node1.right, node2.left)
    }
    if (!root) return root
    connectTwoNode(root.left, root.right)
    return root
};


/* 
T114 https: //leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/
将二叉树展开成链表
就两步
1. root的左子树和右子树拉平   2. root右子树接到左子树下方 然后将这个左子树作为右子树
*/
var flatten = function (root) {
    if (!root) return root

    flatten(root.left)
    flatten(root.right)

    
    let left = root.left
    let right = root.right
    // 左子树作为右子树 
    root.left = null
    root.right = left
    // 原先右子树接到当前右子树末端
    let p = root
    while (p.right !== null) {
        p = p.right
    }

    p.right = right
};

// 总 考究一点 如何写递归函数 可以先想一下 当这个树的深度只有2 的时候(即只有三个节点) 函数该怎么写 然后把那个函数当作递归函数就行了