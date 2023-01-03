// t20 https://leetcode.cn/problems/valid-parentheses/ 有效的括号
const dict = {
  "(": ')',
  "[": "]",
  "{": "}"
}
var isValid = function (s) {
  const stack = []
  if (s.length % 2 !== 0) return false // 长度为奇数肯定错误
  for (let i = 0; i < s.length; i++) {
      if (dict[s[i]]) { // 是开头符号 入栈
          stack.push(s[i])
      } else {//是结尾符号
          if (stack.length === 0) return false
          if (dict[stack[stack.length - 1]] === s[i]) { //能合并则出栈
              stack.pop()
          } else { // 不能合并说明错误
              return false
          }
      }
  }
  return !stack.length  // 栈清空则表示全部合并完成
};

// T394 https://leetcode.cn/problems/decode-string/description/
var decodeString = function(s) {
  // 用两个栈来存放当前状态，前者是重复次数，后者是累积字符串
  let repetStack=[],resStack=[];
  //拼接字符串
  let resStr = "";
  //表示重复次数
  let repet = 0;
  // 遍历s
  for(let i=0;i<s.length;i++){
      let cur = s.charAt(i);
      if(cur == '['){
          //双双压入栈中,保存当前状态
          repetStack.push(repet);
          resStack.push(resStr);
          //置空，准备下面的累积
          repet = 0;
          resStr = "";
      }else if(cur == ']'){
          // 取出当前重复次数栈中的值，也就是当前字符串的重复次数
          let count = repetStack.pop();
          // 根据重复次数生成重复字符串，赋值给temp，和resStr拼接
          let temp = "";
          for(let i = 0;i<count;i++){
              temp += resStr;
          }
          // 和前面已经求得的字符串进行拼接
          resStr = resStack.pop() + temp;
      }else if(cur>='0' && cur<='9'){
          // repet累积
          repet = repet*10 + (cur-'0');
      }else{
          //字符累积
          resStr += cur;
      }
  }
  return resStr;
};


// T22 https://leetcode.cn/problems/generate-parentheses/
var generateParenthesis = function(n) {
  if (n == 0) return [];
  let res = [];
  let track = '';
  back (n, n, track)
  function back (left, right, track) {
      // 若左括号剩下的多，说明不合法
      if (right < left) return;
      // 数量小于 0 肯定是不合法的
      if (left < 0 || right < 0) return;
      // 当所有括号都恰好用完时，得到一个合法的括号组合
      if (left == 0 && right == 0) {
          res.push(track);
          return;
      }
      track += "("
      back(left - 1, right, track)
      track = track.slice(0, track.length - 1)
      console.log(track, 2)
      track += ")"
      back(left, right - 1, track) 
      track = track.slice(0, track.length - 1)
  }
  return res
};

