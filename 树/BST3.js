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