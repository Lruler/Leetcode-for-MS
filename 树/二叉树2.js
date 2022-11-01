/* 
二叉树问题 细究下来就是要看一下根节点做什么 然后一句这个抽象一个递归函数出来
那对于构造二叉树问题 根节点要做的 就是把自己构造出来
*/

/* 
T654 https://leetcode.cn/problems/maximum-binary-tree/
构造最大二叉树
*/

var constructMaximumBinaryTree = function (nums) {
    if (!nums.length) {
        return null
    }
    //es6语法求数组中最大值
    // var max = Math.max(...nums)
    //es5语法中求数组最大值
    var max = Math.max.apply(null, nums)
    var root = new TreeNode(max)
    //es6求数组指定元素的下标
    var index = nums.findIndex((value) => value === max)
    root.left = constructMaximumBinaryTree(nums.slice(0, index))
    root.right = constructMaximumBinaryTree(nums.slice(index + 1, nums.length))
    return root;
};


/* 
T105 https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
根据前序和中序 序列 构造二叉树
*/

var buildTree = function (preorder, inorder) {
    const res = (inorder) => {
        if (!inorder || inorder.length === 0) return null //如果中序遍历的节点递归到了叶子节点或者已经递归完毕，则返回null
        let top = preorder.shift() //取出根节点
        let p = inorder.indexOf(top) //查找中序遍历中根节点所在位置
        let tree = new TreeNode(top)
        tree.left = res(inorder.slice(0, p)) //将中序遍历的左子树递归到新树
        tree.right = res(inorder.slice(p + 1)) //将中序遍历的右子树递归到新树
        return tree
    }
    return res(inorder)
};

/* 
T106 https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
根据后序和中序 构造二叉树
*/
var buildTree = function (inorder, postorder) {
    if (!postorder.length) return null;
    const top = postorder.pop();
    const root = new TreeNode(top);
    const topIndex = inorder.indexOf(top);
    root.left = buildTree(inorder.slice(0, topIndex), postorder.slice(0, topIndex));
    root.right = buildTree(inorder.slice(topIndex + 1), postorder.slice(topIndex));
    return root;
};


/* 
T889 https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-postorder-traversal/
通过前序和后序生成二叉树
*/

var constructFromPrePost = function (preorder, postorder) {
    if (!preorder.length || !postorder.length) {
        return null;
    }
    if (preorder.length == 1) {
        return new TreeNode(preorder[0]);
    }

    if (postorder.length == 1) {
        return new TreeNode(inorder[0]);
    }

    let index = postorder.indexOf(preorder[1])

    let postLeft = postorder.slice(0, index + 1)
    let postRight = postorder.slice(index + 1, postorder.length - 1)


    let preLeft = preorder.slice(1, postLeft.length + 1)
    let preRight = preorder.slice(postLeft.length + 1);


    let root = new TreeNode(preorder[0]);
    root.left = constructFromPrePost(preLeft, postLeft);
    root.right = constructFromPrePost(preRight, postRight);

    return root;
};