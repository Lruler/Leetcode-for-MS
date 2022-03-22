// T188 HARD https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/

// 一定靠想仔细“状态” 才能去做状态转移

/* 
每到一天 我都需要进行一个操作(买，卖，啥也不做)，然后我还有k次交易机会 
那 天数 i 操作 bull sell rest 和 k 次交易机会，就是状态，三个变量，我们就用一个dp三维数组维护
这里调换一下顺序 就是 dp[i][k][1/0] 1/0表示我手里是否持有股票
*/
var maxProfit = function (k, prices) {
    let len = prices.length;
    if (len === 0) return 0;
    // 指可以无限交易了
    if (k >= len / 2) return maxProfit2(prices);
    // 构造dp table
    let dp = Array.from(new Array(len), () => new Array(k + 1));
    // base case
    for (let i = 0; i < len; i++) {
        for (let j = 0; j <= k; j++) {
            dp[i][j] = new Array(2).fill(0);
        }
    }
    for (let i = 0; i < len; i++) {
        for (let j = k; j > 0; j--) {
            if (i === 0) {
                // 处理 i = -1 时的 base case
                dp[i][j][0] = 0;
                dp[i][j][1] = -prices[i];
                continue;
            }
            // 今天没有股票，两种可能，昨天也没有，今天啥也不干，或者昨天有，但我今天卖了
            dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
            // 今天有股票， 两种可能，昨天就有，今天啥也不干，或者昨天没有，今天买入了
            dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
        }
    }
    return dp[len - 1][k][0];
};

function maxProfit2(prices) {
    let profits = 0;
    for (let i = 0; i < prices.length + 1; i++) {
        if (prices[i + 1] - prices[i] > 0) {
            profits += prices[i + 1] - prices[i]
        }
    }
    return profits;
};


// T121 easy https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
// 就是 k = 1 的场景

var maxProfit = function (prices) {
    let n = prices.length;
    let dp = new Array(n).fill(new Array(2));
    for (let i = 0; i < n; ++i) {
        if (i == 0) {
            dp[i][0] = 0;
            dp[i][1] = -prices[i];
            continue;
        }
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
    }
    return dp[n - 1][0]
};

// T122 mid https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
// k为正无穷的情况 就是上面的 maxProfit2 函数

/* 
T123 HARD https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/
k = 2的场景
*/

// T309 https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/ 考虑一天冷冻期

// T714 https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/ 考虑减去手续费