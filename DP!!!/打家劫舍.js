/* 
T198 mid https://leetcode.cn/problems/house-robber/ 
打家劫舍I

站在 i 面前 两个选择 抢 还是 不抢，  抢了 之后 钱就多 去下下家，不抢 钱不变 去下家
所以有 dp[i] = max(dp[i + 1], nums[i] + dp[i + 2])
*/

// 自顶向下递归
const rob = (nums) => {
    let memo = Array(nums.length).fill(-1);
    const dp = (start) => {
        if (start >= nums.length) return 0;
        if (memo[start] !== -1) return memo[start];

        let res = Math.max(dp(start + 1), nums[start] + dp(start + 2))
        memo[start] = res;
        return res
    }
    return dp(0)
}
// 自底向上迭代
var rob2 = function (nums) {
    let n = nums.length
    // Data Bae
    let dp = Array(n + 2).fill(0)
    for (let i = n - 1; i >= 0; --i) {
        dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2])
    }
    return dp[0]
};


/* 
T213 mid https://leetcode.cn/problems/house-robber-ii/
打家劫舍II 数组变成环形数组
那考虑抢第一间 和抢最后一间谁大就行
*/

var robII = function (nums) {
    let n = nums.length;
    if (n == 1) return nums[0];
    // 优化空间复杂度
    const dp = (start, end) => {
        let dp_1 = dp_2 = 0;
        let dp_i = 0;
        for (let i = end; i >= start; i--) {
            dp_i = Math.max(dp_1, nums[i] + dp_2);
            dp_2 = dp_1;
            dp_1 = dp_i
        }
        return dp_i
    }
    return Math.max(dp(0, n - 2), dp(1, n - 1))
};


/* 
T337 MID https://leetcode.cn/problems/house-robber-iii/
打家劫舍III 因为是二叉树 所以采取递归的形式(也可以改写成dp table)
*/

let memo = new Map();
var robIII = function (root) {
    if (root == null) return 0;
    if (memo.has(root)) return memo.get(root);
    let doR = root.val + (root.left == null ? 0 : rob(root.left.left) + rob(root.left.right)) +
        (root.right == null ? 0 : rob(root.right.left) + rob(root.right.right))
    let notDo = rob(root.left) + rob(root.right);
    let res = Math.max(doR, notDo);
    memo.set(root, res);
    return res;
};