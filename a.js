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
            for (; i < text2.length; ++i) res += text1.charCodeAt(i)
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
    let v = dp(0, 0)
    console.log(memo)
    return v
};

let a = minimumDeleteSum('delete', 'leet')
console.log(a)