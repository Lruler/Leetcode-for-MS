// T42 接雨水 https://leetcode.cn/problems/trapping-rain-water/
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
var trap = function (height) {
    let ans = 0;
    let left = 0,
        right = height.length - 1;
    let leftMax = 0,
        rightMax = 0;
    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if (height[left] < height[right]) {
            ans += leftMax - height[left];
            ++left;
        } else {
            ans += rightMax - height[right];
            --right;
        }
    }
    return ans;
};

/* 
T11 https://leetcode.cn/problems/container-with-most-water/
盛最多水的容器
*/
 var maxArea = function (height) {
     let left = 0
     let right = height.length - 1
     let max = 0
     while (left < right) {
         curArea = Math.min(height[left], height[right]) * (right - left)
         max = Math.max(max, curArea)
         if (height[left] <= height[right]) {
             left++
         } else {
             right--
         }
     }
     return max
 };
