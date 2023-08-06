/* 
子序列问题思路
涉及到子序列一般都用dp
两种思路
1. 一维思路 以dp[i] 表示以 nums[i] 结尾的子序列状态
int n = array.length;
int[] dp = new int[n];
for (int i = 1; i < n; i++) {
    for (int j = 0; j < i; j++) {
        dp[i] = 最值(dp[i], dp[j] + ...)
    }
}
2. 二维思路 就是涉及到有两个数组/字符串的子序列问题
int n = arr.length;
int[][] dp = new dp[n][n];
for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j++) {
        if (arr[i] == arr[j])
            dp[i][j] = dp[i][j] + ...
            else
                dp[i][j] = 最值(...)
    }
}
涉及两个字符串 / 数组时（比如最长公共子序列）， dp 数组的含义如下：
在子数组arr1[0..i] 和子数组arr2[0..j] 中， 我们要求的子序列（最长公共子序列） 长度为dp[i][j]。
只涉及一个字符串 / 数组时（ 比如本文要讲的最长回文子序列）， dp 数组的含义如下：
在子数组array[i..j] 中， 我们要求的子序列（最长回文子序列） 的长度为dp[i][j]
*/
/* 
T300 MID https://leetcode.cn/problems/longest-increasing-subsequence/
最长递增子序列
*/
// DP方法
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
// 纸牌/二分查找法
var lengthOfLIS = function (nums) {
    const dp = [nums[0]];
    const len = nums.length;
    for (let i = 0; i < len; i++) {
      if (nums[i] > dp[dp.length - 1]) {
        dp.push(nums[i]);
      } else {
        let left = 0;
        let right = dp.length - 1;
        while (left < right) {
          let middle = (left + right) >> 1;
          if (nums[i] > dp[middle]) {
            left = middle + 1;
          } else {
            right = middle;
          }
        }
        dp[left] = nums[i];
      }
    }
    return dp.length;
  };

/* 
T354 https://leetcode.cn/problems/russian-doll-envelopes/
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
T516 MID https://leetcode.cn/problems/longest-palindromic-subsequence/
最长回文子序列
*/
// 在子串s[i..j]中，最长回文子序列的长度为dp[i][j]。
var longestPalindromeSubseq = function (s) {
    let n = s.length;
    let dp = Array.from(Array(n), () => Array(n).fill(0))
    for (let i = 0; i < n; ++i) {
        dp[i][i] = 1;
    }
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
        }
    }
    return dp[0][n - 1]
};
/* 
T53 Easy https://leetcode.cn/problems/maximum-subarray/
最大子数组和
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
/* 
T1143 https://leetcode.cn/problems/longest-common-subsequence/
MID 最长公共子序列
*/
// dp[i][j] 表示 text1[0..i]和text[0..j]的最长公共子序列
var longestCommonSubsequence = function (text1, text2) {
    let m = text1.length,
        n = text2.length;
    let dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            // 两个字符相同 说明两个都在公共子序列中
            if (text1[i - 1] == text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1]
            // 不相同 二者有其一在
            else dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
        }
    }
    return dp[m][n]
};
//T583 https://leetcode.cn/problems/delete-operation-for-two-strings/ 
// 一致的思路 就是求最长公共子序列 然后用原字符的长度去减 两个字符的删除操作
// T712 https://mp.weixin.qq.com/s/ZhPEchewfc03xWv9VP3msg 
// 同上 在求序列的时候顺带记录下ASCII码就行
var minimumDeleteSum = function (text1, text2) {
    let m = text1.length,
        n = text2.length;
    let memo = Array.from(Array(m + 1), () => Array(n + 1).fill(-1));
    const dp = (i, j) => {
        let res = 0;
        if (i == m) {
            for (; j < text2.length; ++j) res += text2.charCodeAt(j)
            return res;
        }
        if (j == n) {
            for (; i < text1.length; ++i) res += text1.charCodeAt(i)
            return res;
        }
        if (memo[i][j] !== -1) return memo[i][j];
        if (text1[i] == text2[j]) memo[i][j] = dp(i + 1, j + 1)
        else {
            memo[i][j] = Math.min(
                text1.charCodeAt(i) + dp(i + 1, j),
                text2.charCodeAt(j) + dp(i, j + 1)
            );

        }
        return memo[i][j]
    }
    return dp(0, 0)
};
// T392 https://leetcode.cn/problems/is-subsequence/
// 判断子序列
// 双指针思路
var isSubsequence = function(s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) i++
        j++
    }
    return i === s.length
};

// 二分 (不知道为什么有一个用例跑不通)
const left_search = (arr, t) => {
    let left = 0, right = arr.length;
    while (left < right) {
        let mid = left + (right - left) / 2;
        if (t > arr[mid]) left = mid + 1;
        else right = mid
    }
    if (left === arr.length) return -1
    return left
}
var isSubsequence = function(s, t) {
    let m = s.length, n = t.length
    const index = new Map()
    for (let i = 0; i < n; ++i) {
        const c = t[i];
        if (!index.get(c)) index.set(c, []);
        index.get(c).push(i)
    }
    let j = 0;
    for (let i = 0; i < m; ++i) {
        const c = s[i];
        if (!index.get(c)) return false;
        let pos = left_search(index.get(c), j)
        if (pos == -1) return false;
        j = index.get(c)[pos] + 1;
        console.log(pos)
    }
    return true
};

// 匹配子序列的单词数
// T792 https://leetcode.cn/problems/number-of-matching-subsequences
var numMatchingSubseq = function(s, words) {
    const posMap = new Map()
    let cnt = 0
    for(let i=0;i<s.length;i++) {
      if(!posMap.has(s[i])) posMap.set(s[i], [])
      posMap.get(s[i]).push(i)
    }
    for(const word of words) {
      let shouwldAdd = false
      let idx = -1
      for(let i=0;i<word.length;i++) {
        if(!posMap.has(word[i])) break
        const idxes = posMap.get(word[i])
        if(idxes[idxes.length - 1] <= idx) break
        idx = binarSearch(idxes, idx)
        if(i === word.length - 1) shouwldAdd = true
      }
      if(shouwldAdd) {
        cnt++
      }
    }
    return cnt
  };
  function binarSearch(nums, target) {
    let l = 0, r = nums.length - 1
    while(l < r) {
      const mid = Math.floor((l + r) / 2)
      if(nums[mid] > target) {
        r = mid
      } else {
        l = mid + 1
      }
    }
    return nums[l]
  }