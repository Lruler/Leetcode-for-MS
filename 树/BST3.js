/* 
前面说了BST的中序遍历和基本操作 这篇说说如何计算有效的BST
*/
/* 
T96 https://leetcode.cn/problems/unique-binary-search-trees/
给你一个整数 n， 求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？ 返回满足题意的二叉搜索树的种数。
*/
var numTrees = function(n) {
  let memo = Array.from(Array(n + 1), () => Array(n + 1).fill(0));
  

  const count = (lo, hi) => {
      if (lo > hi) return 1

      if (memo[lo][hi] !== 0) {
          return memo[lo][hi]
      }

      let res = 0;
      for (let mid = lo; mid <= hi; mid++) {
          let left = count(lo, mid - 1);
          let right = count(mid + 1, hi)
          res += left * right;
      }
      memo[lo][hi] = res
      return res
  }
  return count(1, n)
};

/* 
T95 https://leetcode.cn/problems/unique-binary-search-trees-ii/
*/
// 给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。
var generateTrees = function (n) {
    if (!n) return null;
    return help(1, n);
};

const help = (left, right) => {
    if (left > right) { return null };
    const ans = [];
    for (let i = left; i <= right; i++) {
        const leftTree = help(left, i - 1);
        const rightTree = help(i + 1, right);
        const l = leftTree || [null];
        const r = rightTree || [null];
        for (const left of l) {
            for (const right of r) {
                const curr = new TreeNode(i);
                curr.left = left;
                curr.right = right;
                ans.push(curr);
            }
        }
    }
    return ans;
}