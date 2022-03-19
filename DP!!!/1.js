/* 
求解动态规划的核心问题是穷举
动态规划的穷举有点特别， 因为这类问题存在「 重叠子问题」
动态规划问题一定会具备「 最优子结构」， 才能通过子问题的最值得到原问题的最值。
只有列出正确的「 状态转移方程」， 才能正确地穷举。
自顶向下的递归 自底向上的迭代

# 初始化 base case
dp[0][0][...] = base
# 进行状态转移
for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
        for ...
            dp[状态1][状态2][...] = 求最值(选择1，选择2...)
*/

/* 
T322 MID https://leetcode-cn.com/problems/coin-change/
找零钱问题
*/

var coinChange = function (coins, amount) {
    if (amount === 0) return 0;
    //初始化长度为amount+1，值为无穷大的数组
    let dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0;
    for (let i = 0; i < dp.length; i++) {
        for (let j = 0; j < coins.length; j++) {
            // 如果差值小于零
            if (i - coins[j] < 0) continue;
            // 每一个金额最低需要几个硬币
            dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
        }
    }
    if (dp[amount] === Infinity) return -1;
    else return dp[amount]
};