/* 
T931 MID https://leetcode.cn/problems/minimum-falling-path-sum/
下降路径最小和
*/
var minFallingPathSum = function(matrix) {
    const n = matrix.length;
    let res = Infinity;
    const memo = Array.from(Array(n), () => Array(n).fill(66666))
    const dp = (matrix, i, j) => {
        // 1、索引合法性检查
        if (i < 0 || j < 0 ||i >= matrix.length ||j >= matrix[0].length) {
            return 99999;
        }
        // 2、base case
        if (i == 0) {
            return matrix[0][j];
        }
        // 3、查找备忘录，防止重复计算
        if (memo[i][j] != 66666) {
            return memo[i][j];
        }
        // 进行状态转移
        memo[i][j] = matrix[i][j] + Math.min(
                dp(matrix, i - 1, j), 
                dp(matrix, i - 1, j - 1),
                dp(matrix, i - 1, j + 1)
            );
        return memo[i][j]
    }
    for (let j = 0; j < n; ++j) {
        res = Math.min(res, dp(matrix, n - 1, j))
    }
    return res
};