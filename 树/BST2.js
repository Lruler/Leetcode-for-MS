/* 
要注意 BST的概念上直说了左右子节点和父节点的大小关系
但事实上 左右子树 和 根节点  都满足 左小右大  即左子树所有节点都小于根节点 右子树都大于
所以 如果是对BST进行操作的话 可以用如下框架

const BST = (root, target) => {
    if (root.val === targer) // 找到后进行操作
    if (roo.val < target) BST(root.right, target)
    if (roo.val > target) BST(root.left, target)
}
*/

/* 
T98 https://leetcode-cn.com/problems/validate-binary-search-tree/
验证BST
*/

const check = (root, min, max) => {
    if (!root) return true
    if (min != null && root.val <= min.val) return false;
    if (max != null && root.val >= max.val) return false;
    return check(root.left, min, root) && check(root.right, root, max)
}
var isValidBST = function (root) {
    return check(root, null, null)
};

/* 
 T700 https://leetcode-cn.com/problems/search-in-a-binary-search-tree/
 搜索BST中节点并作为根节点返回
*/

var searchBST = function (root, val) {
    if (!root) return null;

    if (root.val > val) return searchBST(root.left, val)
    if (root.val < val) return searchBST(root.right, val)

    return root
};


/* 
T701 https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/
BST 中插入一个节点
*/
var insertIntoBST = function (root, val) {
    if (!root) return new TreeNode(val);

    if (root.val < val) root.right = insertIntoBST(root.right, val)
    if (root.val > val) root.left = insertIntoBST(root.left, val)

    return root
};


/* 
T450 https://leetcode-cn.com/problems/delete-node-in-a-bst/
BST 中 删除一个节点(注意有三种情况)
*/

const getMin = (node) => {
    while (node.left !== null) node = node.left
    return node
}
var deleteNode = function (root, key) {
    if (root == null) return null;
    if (root.val == key) {
        if (root.left == null) return root.right
        if (root.right == null) return root.left
        let minNode = getMin(root.right)
        root.right = deleteNode(root.right, minNode.val)
        minNode.left = root.left
        minNode.right = root.right
        root = minNode
    } else if (root.val > key) root.left = deleteNode(root.left, key)
    else if (root.val < key) root.right = deleteNode(root.right, key)

    return root
};