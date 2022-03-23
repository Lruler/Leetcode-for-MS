/* 
T300 MID https://leetcode-cn.com/problems/longest-increasing-subsequence/
最长递增子序列
*/

var lengthOfLIS = function (nums) {
    let dp = new Array(nums.length).fill(1);
    for (let i = 0; i < nums.length; ++i) {
        for (let j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                // dp[i] 就是指 以nums[i]结尾的递增子序列的长度
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
T354 https://leetcode-cn.com/problems/russian-doll-envelopes/
把上面的题扩展到二维 即锁死一个纬度 用一维的方法去考虑另一个维度 再用二分优化
*/
var maxEnvelopes = function (envelopes) {
    const n = envelopes.length;
    // 二维转一维
    envelopes.sort((o1, o2) => {
        return o1[0] - o2[0] || o2[1] - o1[1];
    });
    let top = [];
    for (let i = 0; i < n; i++) {
        let left = 0;
        let right = top.length;
        // 二分优化 思路就是放纸牌游戏 遍历一组纸牌 只能把小的压在大的上面 不然就要重新开启一个堆
        while (left < right) {
            // i就是要处理的牌 然后利用二分查找看看这张牌该放在哪个牌堆上
            let mid = (left + right) >> 1;
            if (top[mid] < envelopes[i][1]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        top[left] = envelopes[i][1];
    }

    return top.length;
};


/* 
T53 Easy https://leetcode-cn.com/problems/maximum-subarray/
最长子数组 就是把序列改成数组 思路一致
*/
var maxSubArray = function (nums) {
    let n = nums.length;
    if (n == 1) return nums[0]
    let dp = [...nums];
    // 站在i前 选择加还是不加 dp[i] = Math.max(dp[i - 1] + i, i)
    for (let i = 0; i < n; ++i) {
        if (i == 0) continue
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    }
    return Math.max(...dp)
};