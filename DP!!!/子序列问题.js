/* 
T300 MID https://leetcode-cn.com/problems/longest-increasing-subsequence/
最长递增子序列
*/

var lengthOfLIS = function (nums) {
    let dp = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; ++i) {
        for (let j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    let res = 0;
    for (let i = 0; i < dp.length; ++i) {
        res = Math.max(res, dp[i]);
    }
    return res
};




/* 
T72 HARD https://labuladong.gitee.io/algo/3/25/77/

*/