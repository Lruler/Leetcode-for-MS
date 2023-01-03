// T151 反转字符串中的单词 https://leetcode.cn/problems/reverse-words-in-a-string/description/
// 先整体反转 再反转每个单词即可
var reverseWords = function (s) {
  let l = 0,
    r = s.length - 1;
  s = s.split('')
  while (l < r) {
    let temp = s[l]
    s[l] = s[r]
    s[r] = temp
    l++
    r--
  }
  s = s.join('').split(' ')
  for (let i = 0; i < s.length; ++i) {
    let l = 0,
      r = s[i].length - 1;
    s[i] = s[i].split('')
    while (l < r) {
      let temp = s[i][l]
      s[i][l] = s[i][r]
      s[i][r] = temp
      l++
      r--
    }
    s[i] = s[i].join('')
  }
  return s.filter(s => s).join(' ')
};

// T48 旋转图像 https://leetcode.cn/problems/rotate-image/description/
// 原地的思路就是 先镜像反转 再水平反转
// 使用额外空间就注意 对于矩阵中第 i 行的第 j 个元素，在旋转后，它出现在倒数第 i 列的第 j 个位置。 
// 按照规律创建个新数组就可以
var rotate = function (matrix) {
  const n = matrix.length;
  // 主对角线翻转
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  // 水平反转
  for (let i = 0; i < matrix.length; ++i) matrix[i].reverse()
};

// T54 螺旋矩阵 https://leetcode.cn/problems/spiral-matrix/
/**
  直接模拟思路
  1. 在顶部从左向右遍历 
  2. 在右侧从上向下遍历
  3. 在底部从右向左遍历
  4. 在左侧从下向上遍历
  每次遍历完后 缩小边界即可
 */
var spiralOrder = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;
  let top = 0,
    bottom = m - 1,
    left = 0,
    right = n - 1;
  let res = [];
  while (res.length < m * n) {
    if (top <= bottom) {
      for (let j = left; j <= right; j++) {
        res.push(matrix[top][j])
      }
      top++ // 上边界下移
    }
    if (left <= right) {
      for (let i = top; i <= bottom; i++) {
        res.push(matrix[i][right])
      }
      right-- // 右边界左移
    }
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        res.push(matrix[bottom][j])
      }
      bottom-- // 下边界上移
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        res.push(matrix[i][left])
      }
      left++ // 左边界右移
    }
  }
  return res
};

// T59 https://leetcode.cn/problems/spiral-matrix-ii/
// 上面那道题的逆向，根据遍历结果生成矩阵

// 思路是先创建一个矩阵，然后根据螺旋遍历的思路 res.shift 给矩阵赋值就行
var generateMatrix = function (n) {
  let top = 0,
    bottom = n - 1,
    left = 0,
    right = n - 1;
  let res = [];
  for (let i = 1; i <= n * n; ++i) res.push(i)

  let matrix = Array.from(Array(n), () => Array(n).fill(0))
  while (res.length > 0) {
    if (top <= bottom) {
      for (let j = left; j <= right; j++) {
        matrix[top][j] = res.shift()
      }
      top++ // 上边界下移
    }
    if (left <= right) {
      for (let i = top; i <= bottom; i++) {
        matrix[i][right] = res.shift()
      }
      right-- // 右边界左移
    }
    if (top <= bottom) {
      for (let j = right; j >= left; j--) {
        matrix[bottom][j] = res.shift()
      }
      bottom-- // 下边界上移
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        matrix[i][left] = res.shift()
      }
      left++ // 左边界右移
    }
  }
  return matrix
};
