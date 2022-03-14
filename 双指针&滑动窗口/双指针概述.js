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
T76: https://leetcode-cn.com/problems/minimum-window-substring/
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
T567 https://leetcode-cn.com/problems/permutation-in-string/
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
T438 https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/
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
T3 https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
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