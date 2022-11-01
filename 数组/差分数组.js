/* 
前缀和 适用于原数组不会被修改的情况下 频繁的查询某个区间的累加和

差分数组主要场景是频繁的对原始数组的某个区间的元素进行增减

diff差分数组 diff[i] = nums[i] - num[i - 1]
想对nums[i..j]全部加3 就让diff[i] += 3, diff[j + 1] -= 3即可
*/

/* 
T1109 https://leetcode.cn/problems/corporate-flight-bookings/
*/
// 同样的思想 不过构造下面那个class说我超出时间限制 不懂
var corpFlightBookings = function (bookings, n) {
    const nums = new Array(n).fill(0);
    for (const booking of bookings) {
        nums[booking[0] - 1] += booking[2];
        if (booking[1] < n) {
            nums[booking[1]] -= booking[2];
        }
    }
    for (let i = 1; i < n; i++) {
        nums[i] += nums[i - 1];
    }
    return nums;
};

// 差分数组类
class DiffArray {
    constructor(nums) {
        this.diff = new Array(nums.length)
        this.diff[0] = nums[0];
        for (let i = 1; i < nums.length; ++i) {
            this.diff[i] = nums[i] - nums[i - 1]
        }
    }

    increment(i, j, val) {
        this.diff[i] += val
        if (j + 1 < this.diff.length) this.diff[j + 1] -= val
    }

    result() {
        let res = new Array(this.diff.length)
        res[0] = this.diff[0]
        for (let i = 1; i < this.diff.length; ++i) {
            res[i] = res[i - 1] + this.diff[i]
        }
        return res
    }
}

/* 
T1094 mid https://leetcode.cn/problems/car-pooling/
*/

var carPooling = function (trips, capacity) {
    let diff = new Array(1002).fill(0);
    let sum = 0;
    for (let [n, s, e] of trips) {
        diff[s] += n;
        diff[e] -= n; // e - 1 + 1
    }
    for (let i = 0; i < diff.length; i++) {
        sum += diff[i];
        if (sum > capacity) return false;
    }
    return true;
};