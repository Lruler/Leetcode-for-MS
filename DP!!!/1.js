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
T322 MID https://leetcode.cn/problems/coin-change/
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


/* 
T887 HARD https://leetcode.cn/problems/super-egg-drop/
高楼接鸡蛋
dp[k][n] = m
# 当前状态为 k 个鸡蛋， 面对 n 层楼
# 这个状态下最少的扔鸡蛋次数为 m
反向思考
dp[k][m] = n
# 当前有 k 个鸡蛋，可以尝试扔 m 次鸡蛋
# 这个状态下，最坏情况下最多能确切测试一栋 n 层的楼

# 比如说 dp[1][7] = 7 表示：
# 现在有 1 个鸡蛋，允许你扔 7 次;
# 这个状态下最多给你 7 层楼，
# 使得你可以确定楼层 F 使得鸡蛋恰好摔不碎
# （一层一层线性探查嘛）
题目不是给你K鸡蛋，N层楼，让你求最坏情况下最少的测试次数m 吗？
while循环结束的条件是dp[K][m] == N，也就是给你K个鸡蛋，允许测试m次，最坏情况下最多能测试N层楼。
*/
var superEggDrop = function (K, N) {
    let dp = Array(K + 1);
    for (let i = 0; i < K + 1; ++i) {
        dp[i] = new Array(N + 1).fill(0)
    }
    let m = 0;
    while (dp[K][m] < N) {
        m++;
        for (let k = 1; k <= K; k++) {
            dp[k][m] = dp[k][m - 1] + dp[k - 1][m - 1] + 1;
        }
    }
    return m
};


/* 
T72 HARD https://leetcode.cn/problems/edit-distance/ 编辑距离
*/

const min = (a, b, c) => {
    return Math.min(a, Math.min(b, c))
}
var minDistance = function (word1, word2) {
    let m = word1.length,
        n = word2.length;
    let dp = new Array(m + 1);
    for (let i = 0; i < m + 1; ++i) {
        dp[i] = Array(n + 1).fill(0)
    }
    // base case
    for (let i = 1; i <= m; ++i) dp[i][0] = i;
    for (let j = 1; j <= n; j++) dp[0][j] = j;
    // 自底向上求解
    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1]
            else {
                dp[i][j] = min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1)
            }
        }
    }
    return dp[m][n]
};


/* 
T312 戳气球 HARD https://leetcode.cn/problems/burst-balloons/
dp[i][j] = x表示， 戳破气球i和气球j之间（ 开区间， 不包括i和j） 的所有气球， 可以获得的最高分数为x。
*/
var maxCoins = function (nums) {
    let n = nums.length;
    let point = new Array(n + 2);
    point[0] = point[n + 1] = 1;
    for (let i = 1; i <= n; ++i) {
        point[i] = nums[i - 1];
    }
    let dp = Array.from(Array(n + 2), () => Array(n + 2).fill(0));
    console.log(point)
    for (let i = n; i >= 0; i--) {
        for (let j = i + 1; j < n + 2; ++j) {
            for (let k = i + 1; k < j; ++k) {
                dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k][j] + point[i] * point[j] * point[k])
            }
        }
    }
    return dp[0][n + 1]
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