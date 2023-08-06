/* 
T931 MID https://leetcode.cn/problems/minimum-falling-path-sum/
下降路径最小和
*/
var minFallingPathSum = function(matrix) {
    const n = matrix.length;
    let res = Infinity;
    const memo = Array.from(Array(n), () => Array(n).fill(66666))
    const dp = (matrix, i, j) => {
        // 1、索引合法性检查
        if (i < 0 || j < 0 ||i >= matrix.length ||j >= matrix[0].length) {
            return 99999;
        }
        // 2、base case
        if (i == 0) {
            return matrix[0][j];
        }
        // 3、查找备忘录，防止重复计算
        if (memo[i][j] != 66666) {
            return memo[i][j];
        }
        // 进行状态转移
        memo[i][j] = matrix[i][j] + Math.min(
                dp(matrix, i - 1, j), 
                dp(matrix, i - 1, j - 1),
                dp(matrix, i - 1, j + 1)
            );
        return memo[i][j]
    }
    for (let j = 0; j < n; ++j) {
        res = Math.min(res, dp(matrix, n - 1, j))
    }
    return res
};
/* 
T64 MID https://leetcode.cn/problems/minimum-path-sum/
最小路径和 一遍过 简单
*/
var minPathSum = function (grid) {
    const m = grid.length,
        n = grid[0].length
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
    for (let i = 1; i < m + 1; ++i) {
        for (let j = 1; j < n + 1; ++j) {
            if (i == 1) {
                dp[i][j] = dp[i][j - 1] + grid[i - 1][j - 1]
            } else if (j == 1) {
                dp[i][j] = dp[i - 1][j] + grid[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(dp[i][j - 1] + grid[i - 1][j - 1], dp[i - 1][j] + grid[i - 1][j - 1])
            }
        }
    }
    return dp[m][n]
};
/* 
T787 https://leetcode.cn/problems/cheapest-flights-within-k-stops/
加权有向图的最短路径  dp 和 Dijkstra算法都可以
*/
var findCheapestPrice = function (n, flights, src, dst, k) {
    const INF = 10000 * 101 + 1;
    const f = new Array(k + 2).fill(0).map(() => new Array(n).fill(INF));
    f[0][src] = 0;
    for (let t = 1; t <= k + 1; ++t) {
        for (const flight of flights) {
            const j = flight[0],
                i = flight[1],
                cost = flight[2];
            f[t][i] = Math.min(f[t][i], f[t - 1][j] + cost);
        }
    }
    let ans = INF;
    for (let t = 1; t <= k + 1; ++t) {
        ans = Math.min(ans, f[t][dst]);
    }
    return ans == INF ? -1 : ans;
};