var lengthOfLongestSubstring2 = function (s) {
    const n = s.length
    if (n <= 1) return n

    let left = 0,
        right = 0
    const window = new Map()
    let maxLen = 0
    while (right < n) {
        const rightCharIndex = window.has(s[right]) ? window.get(s[right]) : -1
        left = Math.max(left, rightCharIndex)
        maxLen = Math.max(maxLen, right - left + 1)
        window.set(s[right], right + 1)
        right++
    }
    return maxLen
};
