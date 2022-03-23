var rob2 = function (nums) {
    let n = nums.length
    let dp = Array(n + 2).fill(0)
    for (let i = n - 1; i >= 0; --i) {
        dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2])
    }
    console.log(dp)
    return dp[0]
};

rob2([1, 2, 3, 1])