/* 
T931 MID https://leetcode-cn.com/problems/minimum-falling-path-sum/
下降路径最小和
*/
var minFallingPathSum = function (matrix) {
    var row = matrix.length
    var col = matrix[0].length
    var dp = []
    for (var i = 0; i < row; i++) {
        dp[i] = []
    }
    var max = Number.MAX_VALUE
    for (var j = 0; j < col; j++) {
        dp[0][j] = matrix[0][j]
        max = Math.min(max, dp[0][j])
    }
    if (row === 1) {
        return max
    }

    max = Number.MAX_VALUE
    for (var i = 1; i < row; i++) {
        for (var j = 0; j < col; j++) {
            dp[i][j] = dp[i - 1][j] + matrix[i][j]
            if (j - 1 >= 0) {
                dp[i][j] = Math.min(dp[i - 1][j - 1] + matrix[i][j], dp[i][j])
            }
            if (j + 1 < col) {
                dp[i][j] = Math.min(dp[i - 1][j + 1] + matrix[i][j], dp[i][j])
            }
            if (i === row - 1) {
                max = Math.min(max, dp[i][j])
            }
        }
    }
    return max
}