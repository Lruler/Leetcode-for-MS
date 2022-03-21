/* 
前缀和数组

*/


/* 
T303 easy https://leetcode-cn.com/problems/range-sum-query-immutable/
实现一个前缀和数组
*/

var NumArray = function (nums) {
    const n = nums.length;
    this.sums = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        this.sums[i + 1] = this.sums[i] + nums[i];
    }
};

NumArray.prototype.sumRange = function (i, j) {
    return this.sums[j + 1] - this.sums[i];
};



/* 
T304 Mid https://leetcode-cn.com/problems/range-sum-query-2d-immutable/
二维的前缀和数组 以原点为左上角的点计算
*/

var NumMatrix = function (matrix) {
    const m = matrix.length;
    if (m > 0) {
        const n = matrix[0].length;
        this.sums = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                // 计算每个矩阵[0, 0, i, j]的前缀和
                this.sums[i + 1][j + 1] = this.sums[i][j + 1] + this.sums[i + 1][j] - this.sums[i][j] + matrix[i][j];
            }
        }
    }
};

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
    return this.sums[row2 + 1][col2 + 1] - this.sums[row1][col2 + 1] - this.sums[row2 + 1][col1] + this.sums[row1][col1];
};


/* 
T560 Mid https://leetcode-cn.com/problems/subarray-sum-equals-k/
*/
var subarraySum = function (nums, k) {
    let n = nums.length;
    let preSum = new Map();
    preSum.set(0, 1)

    let res = 0,
        sumI = 0;
    for (let i = 0; i < n; ++i) {
        sumI += nums[i];
        let sumJ = sumI - k;
        if (preSum.has(sumJ)) {
            res += preSum.get(sumJ)
        }
        preSum.set(sumI, preSum.has(sumI) ? preSum.get(sumI) + 1 : 1)
    }
    return res
};