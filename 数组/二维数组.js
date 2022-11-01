
/* 
T48 MID https://leetcode.cn/problems/rotate-image/
旋转图像 就是90 度反转矩阵， 先取对角线镜像对称 然后反转每一行
*/

var rotate = function (matrix) {
    const n = matrix.length;
    // 水平翻转
    for (let i = 0; i < Math.floor(n / 2); i++) {
        for (let j = 0; j < n; j++) {
            [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
        }
    }
    // 主对角线翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
};


/* 
T54 MID https://leetcode.cn/problems/spiral-matrix/
螺旋矩阵
*/

var spiralOrder = function (matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }

    const rows = matrix.length,
        columns = matrix[0].length;
    const order = [];
    let left = 0,
        right = columns - 1,
        top = 0,
        bottom = rows - 1;
    while (left <= right && top <= bottom) {
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column]);
        }
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right]);
        }
        if (left < right && top < bottom) {
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column]);
            }
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left]);
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
    }
    return order;
};

/* 
T59 Mid https://leetcode.cn/problems/spiral-matrix-ii/
生成螺旋矩阵
*/
var generateMatrix = function (n) {
    let num = 1;
    const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let left = 0,
        right = n - 1,
        top = 0,
        bottom = n - 1;
    while (left <= right && top <= bottom) {
        for (let column = left; column <= right; column++) {
            matrix[top][column] = num;
            num++;
        }
        for (let row = top + 1; row <= bottom; row++) {
            matrix[row][right] = num;
            num++;
        }
        if (left < right && top < bottom) {
            for (let column = right - 1; column > left; column--) {
                matrix[bottom][column] = num;
                num++;
            }
            for (let row = bottom; row > top; row--) {
                matrix[row][left] = num;
                num++;
            }
        }
        left++;
        right--;
        top++;
        bottom--;
    }
    return matrix;
};
