/* 
方法:                  用途：
快慢指针                链表操作，归并排序找终点，链表成环判定
两端开始搜索(左右指针)    反转数组(代替二分查找)
滑动窗口                子串问题
*/
// 快慢指针
// 环形链表
// 寻找链表倒数第k个数
// 左右指针
/* 
滑动窗口
大概逻辑:
const slidingWindow (s, t) {
    const window = new Map();

    for (let i in t) Map.set()

    let left = 0, right = 0;
    let valid = 0;

    while (right < s.length) {
        let c = s[right];
        // 增大窗口
        right++
        // 更新窗口数据 比如 window.push()
        ...

        // 判断窗口是否要收缩
        while (window 缩小条件) {
            let d = s[left]
            // 缩小窗口
            left++
            // 更新窗口数据 比如 window.remove();
            ...
        }
    }
}
*/

/* 
T76: https://leetcode.cn/problems/minimum-window-substring/
给你一个字符串 s、 一个字符串 t。 返回 s 中涵盖 t 所有字符的最小子串。 如果 s 中不存在涵盖 t 所有字符的子串， 则返回空字符串 ""
输入： s = "ADOBECODEBANC", t = "ABC"
输出： "BANC"
*/
var minWindow = function (s, t) {
    let l = 0;
    let r = 0;
    let res = "";
    const m = new Map();
    for (let i = 0; i < t.length; i++) {
        const c = t[i];
        m.set(c, m.has(c) ? m.get(c) + 1 : 1);
    }
    let needType = m.size;
    while (r < s.length) {
        const c = s[r];
        if (m.has(c)) {
            // 更新字典表中的次数 - 1
            m.set(c, m.get(c) - 1);
            //  如果次数为0，证明这个字符种类在当前窗口已经集齐了，needType - 1
            if (m.get(c) === 0) needType -= 1;
        }
        // 当needType为0，证明所有需要匹配的字符都已经在当前滑动窗口中
        while (needType === 0) {
            const c2 = s[l];
            // 记录当前滑动窗口的字符
            let newRes = s.slice(l, r + 1);
            // 当新的窗口中的字符长度小于上次的字符长度时，更新结果
            // !res 是在结果值为空的时候需要更新一下第一次匹配的值
            if (!res || newRes.length < res.length) res = newRes;
            // 如果左指针移动过程中出现字典中的值,证明需要匹配的字符已经脱离了当前窗口
            if (m.has(c2)) {
                // 更新表中需要出现的次数
                m.set(c2, m.get(c2) + 1);
                // 更新needType
                if (m.get(c2) === 1) needType += 1;
            }
            l++;
        }
        r++;
    }
    return res;
};
/* 
T567 https://leetcode.cn/problems/permutation-in-string/
s1 的排列之一是 s2 的 子串
输入： s1 = "ab"
s2 = "eidbaooo"
输出： true
解释： s2 包含 s1 的排列之一("ba").
*/
var checkInclusion = function (s1, s2) {
    // 先处理 s1， 利用map 列个清单 记录字符出现的 种类 和 次数 
    let need = new Map();
    for (let i of s1) {
        need.set(i, need.has(i) ? need.get(i) + 1 : 1);
    }
    // 现在处理s2 看看有没有这样一个子串 
    let l = r = 0;
    let window = new Map();
    let valid = 0;
    while (r < s2.length) {
        if (need.has(s2[r])) {
            window.set(s2[r], window.has(s2[r]) ? window.get(s2[r]) + 1 : 1);
            if (window.get(s2[r]) == need.get(s2[r])) valid++; // s2[r]这个所需字符全了  valid++
        }
        r++;
        while (r - l >= s1.length) {
            if (valid == need.size) return true; // 所有字符种类都找全了 成功✅
            if (need.has(s2[l])) {
                if (window.get(s2[l]) == need.get(s2[l])) valid--;
                window.set(s2[l], window.get(s2[l]) - 1);
            }
            l++;
        }
    }
    return false;
};
/* 
T438 https://leetcode.cn/problems/find-all-anagrams-in-a-string/
给定两个字符串 s 和 p， 找到 s 中所有 p 的 异位词 的子串， 返回这些子串的起始索引。 不考虑答案输出的顺序。
异位词 指由相同字母重排列形成的字符串（ 包括相同的字符串）。
输入: s = "cbaebabacd", p = "abc"
输出: [0, 6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc"
的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc"
的异位词。
*/
var findAnagrams = function (s2, s1) {
    // 先处理 s1， 利用map 列个清单 记录字符出现的 种类 和 次数 
    let need = new Map();
    for (let i of s1) {
        need.set(i, need.has(i) ? need.get(i) + 1 : 1);
    }
    // 现在处理s2 看看有没有这样一个子串 
    let l = r = 0;
    let window = new Map();
    let valid = 0;
    let res = [];
    while (r < s2.length) {
        if (need.has(s2[r])) {
            window.set(s2[r], window.has(s2[r]) ? window.get(s2[r]) + 1 : 1);
            if (window.get(s2[r]) == need.get(s2[r])) valid++; // s2[r]这个所需字符全了  valid++
        }
        r++;
        while (r - l >= s1.length) {
            if (valid == need.size) res.push(l); // 所有字符种类都找全了 成功✅
            if (need.has(s2[l])) {
                if (window.get(s2[l]) == need.get(s2[l])) valid--;
                window.set(s2[l], window.get(s2[l]) - 1);
            }
            l++;
        }
    }
    return res;
};
/*
T3 https://leetcode.cn/problems/longest-substring-without-repeating-characters/
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，
所以其长度为 3
*/
var lengthOfLongestSubstring = function (s) {
    let window = new Map();
    let l = r = 0;
    let res = 0;
    while (r < s.length) {
        let c = s[r]
        r++

        window.set(c, window.has(c) ? window.get(c) + 1: 1)
        while (window.get(c) > 1) {
            let d = s[l];
            l++
            window.set(d, window.get(d) - 1)
        }
        res = Math.max(res, r - l)
    }
    return res
};
/* 
T5 Mid https://leetcode.cn/problems/longest-palindromic-substring/
最长回文子串
*/
// 在s中寻找以s[l]和s[r]为中心的最长回文串
const check = (s, l, r) => {
    while (l >= 0 && r < s.length && s[l] == s[r]) {
        l--;
        r++;
    }
    return s.slice(l + 1, r)
}
var longestPalindrome = function (s) {
    let res = '';
    for (let i = 0; i < s.length; ++i) {
        let s1 = check(s, i, i)
        let s2 = check(s, i, i + 1)
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;

    }
    return res
};
/* 
T718 MID https://leetcode.cn/problems/maximum-length-of-repeated-subarray/submissions/
最长公共子数组
*/
var findLength = function (nums1, nums2) {
    let max = 0; // 用于记录最大子数组长度
    let longer = nums1.length > nums2.length ? nums1 : nums2; // 找到二者中较长者
    let shorter = nums1.length > nums2.length ? nums2 : nums1; // 找到二者中较短者
    let r = 0,
        l = r - shorter.length + 1; // 移动较短的数组，l和r分别代表较短数组的0和最后一个元素，在较长数组中的位置索引。

    function find(ul, ur, dl, dr) {
        // 确定位置后，一次遍历找到当前的最大子数组长度 
        let max = 0;
        let c = 0;
        while (ul < ur && dl < dr) {
            if (longer[ul] === shorter[dl]) c += 1;
            else c = 0;
            max = Math.max(max, c);
            ul += 1;
            dl += 1;
        }
        return max;
    }

    while (l <= 0) {
        // 较短数组在较长数组左侧的情况
        max = Math.max(max, find(0, r + 1, -l, shorter.length));
        l++;
        r++;
    }
    while (r < longer.length) {
        // 较短数组在较长数组内部的情况
        max = Math.max(max, find(l, r + 1, 0, shorter.length));
        l++;
        r++;
    }
    while (l < longer.length) {
        // 较短数组在较长数组右侧的情况
        max = Math.max(max, find(l, longer.length, 0, shorter.length - (r + 1 - longer.length)));
        l++;
        r++;
    }
    return max;
};
/* 
下面这部分不用滑动窗口
用快慢 / 左右
*/
/* 
T26 easy https://leetcode.cn/problems/remove-duplicates-from-sorted-array/
删除有序数组重复项
*/
var removeDuplicates = function (nums) {
    if (nums.length == 0) return 0
    let l = r = 0;
    while (r < nums.length) {
        if (nums[r] !== nums[l]) {
            l++
            nums[l] = nums[r]
        }
        r++
    }
    return l + 1
};
/* 
T27 easy https://leetcode.cn/problems/remove-element/
数组原地移除给定的val
*/
var removeElement = function (nums, val) {
    let fast = slow = 0;
    while (fast < nums.length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return slow
};
/* 
T283 easy https://leetcode.cn/problems/move-zeroes/
移动0
*/
var moveZeroes = function (nums) {
    let n = nums.length
    let k = 0
    for (let i = 0; i < n; i++) {
        if (nums[i] != 0) {
            nums[k++] = nums[i]
        }
    }
    while (k < n) {
        nums[k++] = 0
    }
};
/* 
T344 easy https://leetcode.cn/problems/reverse-string/submissions/
反转字符串数组
*/
var reverseString = function (s) {
    let l = 0;
    r = s.length - 1;
    while (l < r) {
        if (s[l] == s[r]) {
            l++;
            r--;
            continue
        };
        let temp = s[r]
        s[r] = s[l];
        s[l] = temp;
        l++;
        r--;
    }
    return s
};
/* 
T239 MID https://leetcode.cn/problems/minimum-size-subarray-sum/ 长度最小的子数组
输入： target = 7, nums = [2, 3, 1, 2, 4, 3]
输出： 2
解释： 子数组[4, 3] 是该条件下的长度最小的子数组。
*/
var minSubArrayLen = function (target, nums) {
    const len = nums.length;
    let l = r = sum = 0,
        res = len + 1; // 子数组的长度最大不会超过自身
    while (r < len) {
        sum += nums[r++]; // 右指针右移
        while (sum >= target) {
            // 因为上一步右指针右移了，所以r始终为开区间 [l, r)
            res = res < r - l ? res : r - l;
            sum -= nums[l++]; // 动态调节滑动窗口的起始位置（关键点）
        }
    }
    return res > len ? 0 : res;
};
// T2024 T1004 https://leetcode.cn/problems/maximize-the-confusion-of-an-exam/ 一个思路
/* 
给定一个二进制数组 nums 和一个整数 k， 如果可以翻转最多 k 个 0， 则返回 数组中连续 1 的最大个数。
思路转化为
对于任意的右端点 right，希望找到最小的左端点left，使得 [left,right] 包含不超过 k 个 0。
只要我们枚举所有可能的右端点，将得到的区间的长度取最大值，即可得到答案。
*/
var longestOnes = function (nums, k) {
    const n = nums.length;
    let left = 0,
        lsum = 0,
        rsum = 0;
    let ans = 0;
    for (let right = 0; right < n; ++right) {
        rsum += 1 - nums[right];
        while (lsum < rsum - k) {
            lsum += 1 - nums[left];
            ++left;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};
// T481 https://leetcode.cn/problems/magical-string/description/
var magicalString = function(n) {
    if (n < 4) {
        return 1;
    }
    const s = new Array(n).fill(0);
    s[0] = '1';
    s[1] = '2';
    s[2] = '2';
    let res = 1;
    let i = 2;
    let j = 3;
    while (j < n) {
        let size = s[i].charCodeAt() - '0'.charCodeAt();
        const num = 3 - (s[j - 1].charCodeAt() - '0'.charCodeAt());
        while (size > 0 && j < n) {
            s[j] = String.fromCharCode('0'.charCodeAt() + num);
            if (num === 1) {
                ++res;
            }
            ++j;
            --size;
        }
        ++i;
    }
    return res;
};
