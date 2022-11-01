/* 
什么是贪心算法呢？贪心算法可以认为是动态规划算法的一个特例，
相比动态规划，使用贪心算法需要满足更多的条件（贪心选择性质），但是效率比动态规划要高。
比如说一个算法问题使用暴力解法需要指数级时间，如果能使用动态规划消除重叠子问题，就可以降到多项式级别的时间，
如果满足贪心选择性质，那么可以进一步降低时间复杂度，达到线性级别的。
什么是贪心选择性质呢，简单说就是：
每一步都做出一个局部最优的选择，最终的结果就是全局最优。注意哦，这是一种特殊性质，其实只有一部分问题拥有这个性质。
*/

// 452和435 区间调度问题 排序再贪心解
/* 
T435 MID https://leetcode.cn/problems/non-overlapping-intervals/
无重叠子区间
*/
var eraseOverlapIntervals = function (intervals) {
    if (!intervals.length) {
        return 0;
    }

    intervals.sort((a, b) => a[1] - b[1]);

    const n = intervals.length;
    let right = intervals[0][1];
    let ans = 1;
    for (let i = 1; i < n; ++i) {
        if (intervals[i][0] >= right) {
            ++ans;
            right = intervals[i][1];
        }
    }
    return n - ans;
};


/* 
T452 MId https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/
用最少的箭戳爆气球
*/
var findMinArrowShots = function (points) {
    const n = points.length
    let a = n
    if (n <= 1) return 1
    points.sort((a, b) => a[1] - b[1]) // 排序
    let prev = points[0][1]
    for (let i = 1; i < n; i++) {
        if (points[i][0] <= prev) a--
        else prev = points[i][1]
    }
    return a
};

// 跳跃游戏

/* 
T55 mid https://leetcode.cn/problems/jump-game/
跳跃游戏 思路转换 
请问通过题目中的跳跃规则， 最多能跳多远？ 如果能够越过最后一格， 返回 true， 否则返回 false。
*/


var canJump = function (nums) {
    let n = nums.length;
    let farthest = 0;
    for (let i = 0; i < n - 1; ++i) {
        // 不断计算能跳到的最远距离
        farthest = Math.max(farthest, i + nums[i]);
        // 可能碰到了 0，卡住跳不动了
        if (farthest <= i) {
            return false;
        }
    }
    return farthest >= n - 1
};

/* 
T45 mid https://leetcode.cn/problems/jump-game-ii/
跳跃游戏II 每一步都跳最大的再穷举
*/

var jump = function (nums) {
    let n = nums.length;
    let end = 0,
        farthest = 0;
    let jumps = 0;
    for (let i = 0; i < n - 1; ++i) {
        farthest = Math.max(nums[i] + i, farthest)
        if (end == i) {
            jumps++
            end = farthest;
        }
    }
    return jumps
};