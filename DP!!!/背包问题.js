/* 
0 - 1 背包问题
框架咯
int knapsack(int W, int N, int[] wt, int[] val) {
    // base case 已初始化
    int[][] dp = new int[N + 1][W + 1];
    for (int i = 1; i <= N; i++) {
        for (int w = 1; w <= W; w++) {
            if (w - wt[i - 1] < 0) {
                // 这种情况下只能选择不装入背包
                dp[i][w] = dp[i - 1][w];
            } else {
                // 装入或者不装入背包，择优
                dp[i][w] = Math.max(
                    dp[i - 1][w - wt[i - 1]] + val[i - 1],
                    dp[i - 1][w]
                );
            }
        }
    }

    return dp[N][W];
}
*/

/* 
T416 https://leetcode.cn/problems/partition-equal-subset-sum/
MID 分割背包问题
*/

var canPartition = function (nums) {
    let n = nums.length;
    if (n <= 1) return false;
    let subSum = nums.reduce((pre, cur) => pre + cur) / 2;
    if (subSum >> 0 !== subSum) return false
    let dp = Array.from(Array(n + 1), () => Array(subSum + 1).fill(0))
    for (let i = 0; i <= n; ++i) {
        dp[i][0] = true;
    }
    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= subSum; ++j) {
            if (j - nums[i - 1] < 0) {
                // 背包容量不足 不能装第i个
                dp[i][j] = dp[i - 1][j];
            } else {
                // 装入或者不装入
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }
    return dp[n][subSum]
};
/* 
压缩为一维后
    boolean[] dp = new boolean[sum + 1];

    // base case
    dp[0] = true;

    for (int i = 0; i < n; i++) {
        for (int j = sum; j >= 0; j--) {
            if (j - nums[i] >= 0) {
                dp[j] = dp[j] || dp[j - nums[i]];
            }
        }
    }
    return dp[sum];
*/

/* 
完全背包问题
T518 mid https://leetcode.cn/problems/coin-change-ii/
*/
var change = function (amount, coins) {
    const n = coins.length;
    let dp = Array.from(Array(n + 1), () => Array(amount + 1).fill(0));
    for (let i = 0; i <= n; ++i) dp[i][0] = 1;
    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= amount; ++j) {
            if (j - coins[i - 1] >= 0)
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]]
            else
                dp[i][j] = dp[i - 1][j]
        }
    }
    return dp[n][amount]
};