// T172 https://leetcode.cn/problems/factorial-trailing-zeroes/description/
// 主要思路是能拆解出几个5就有几个0

var trailingZeroes = function(n) {
  let res = 0;
  for (let d = n; d / 5 > 0; d = d / 5) {
      res += Math.floor(d / 5);
  }
  return res;
};