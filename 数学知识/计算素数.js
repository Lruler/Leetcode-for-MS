// 计算素数
// T204 https://leetcode.cn/problems/count-primes/description/

var countPrimes = function(n) {
  const isPrime = Array(n).fill(true);
  for (let i = 2; i * i < n; i++) {
      if(isPrime[i]) {
          for (let j = i * i; j < n; j += i) isPrime[j] = false
      }
  }
  let count = 0;
  for (let i = 2; i < n; i++) if (isPrime[i]) count++
  return count
};