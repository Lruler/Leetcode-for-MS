// https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
// https://labuladong.gitee.io/algo/2/19/31/
// 二叉树的序列化和反序列化 前序遍历嘛

var serialize = function (root) {
    return rserialize(root, '');
};

var deserialize = function (data) {
    const dataArray = data.split(",");
    return rdeserialize(dataArray);
};

const rserialize = (root, str) => {
    if (root === null) {
        str += "None,";
    } else {
        str += root.val + '' + ",";
        str = rserialize(root.left, str);
        str = rserialize(root.right, str);
    }
    return str;
}

const rdeserialize = (dataList) => {
    if (dataList[0] === "None") {
        dataList.shift();
        return null;
    }

    const root = new TreeNode(parseInt(dataList[0]));
    dataList.shift();
    root.left = rdeserialize(dataList);
    root.right = rdeserialize(dataList);

    return root;
}