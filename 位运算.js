/*

1. 按位与(AND) &
2. 按位或(OR) |
3. 按位异或(XOR) ^
4. 按位非(NOT) ~
5. 左移（Left shift）<<
6. 有符号右移>>
7. 无符号右移>>>
使用&运算符判断一个数的奇偶
// 偶数 & 1 = 0
// 奇数 & 1 = 1
使用~, >>, <<, >>>, |来取整
使用^来完成值交换

n & (n-1) 这个操作是算法中常见的，作用是消除数字 n 的二进制表示中的最后一个 1。
判断一个数是不是 2 的指数
 */

// T191 https://leetcode.cn/problems/number-of-1-bits/description/

var hammingWeight = function(n) {
  let ret = 0;
  while (n) {
      n &= n - 1;
      ret++;
  }
  return ret;
};

// T231 https://leetcode.cn/problems/power-of-two/description/
var isPowerOfTwo = function(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) == 0;
};

// a ^ a = 0 的运用 一个数和它本身做异或运算结果为 0，即 a ^ a = 0；一个数和 0 做异或运算的结果为它本身，即 a ^ 0 = a。
// T136 https://leetcode.cn/problems/single-number/description/
var singleNumber = function(nums) {
  let res = 0;
  for (let n of nums) {
      res = res ^ n;
  }
  return res;

};