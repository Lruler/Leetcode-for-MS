var validPalindrome = function (s, r = 0) {
    if (s.length === 2 && r === 0) return true
    if (s.length === 3 && r === 0) return s[0] === s[1] || s[1] === s[2] || s[0] === s[2]
    let i1 = 0
    let i2 = s.length - 1
    while (i1 < i2) {
        if (s[i1] === s[i2]) {
            i1++
            i2--
        } else {
            if (r > 0) {
                return false
            }
            let s1 = s.slice(i1 + 1, i2 + 1)
            let s2 = s.slice(i1, i2)
            return validPalindrome(s1, r + 1) || validPalindrome(s2, r + 1)
        }
    }
    return true
};


/* 
T344 easy https://leetcode-cn.com/problems/reverse-string/submissions/
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