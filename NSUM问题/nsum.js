// 先看Two Sum的框架代码

const twoSum = (nums, t, start = 0) => {
    nums.sort((a, b) => a - b);
    let lo = start,
        hi = nums.length - 1;
    let res = [];
    while (lo < hi) {
        let sum = nums[lo] + nums[hi];
        let left = nums[lo],
            right = nums[hi];
        // 优化 避免重复元素
        if (sum < t) {
            while (lo < hi && nums[lo] == left) lo++
        } else if (sum > t) {
            while (lo < hi && nums[hi] == right) hi--
        } else {
            res.push([left, right])
            while (lo < hi && nums[lo] == left) lo++;
            while (lo < hi && nums[lo] == right) hi--;
        }
    }
    return res
}


/* 
T15 https://leetcode.cn/problems/3sum/
Mid 3数之和
*/

var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    return nSumTarget(nums, 3, 0, 0)
};


/* 
T15 https://leetcode.cn/problems/4sum/submissions/
Mid 四数之和
*/


const nSumTarget = (nums, n, start, target) => {
    let len = nums.length
    let res = [];
    if (n < 2 || len < n) return res
    if (n == 2) {
        let lo = start,
            hi = len - 1;
        while (lo < hi) {
            let sum = nums[lo] + nums[hi];
            let left = nums[lo],
                right = nums[hi];
            if (sum < target) {
                while (lo < hi && nums[lo] == left) lo++;
            } else if (sum > target) {
                while (lo < hi && nums[hi] == right) hi--;
            } else {
                res.push([left, right])
                while (lo < hi && nums[lo] == left) lo++;
                while (lo < hi && nums[hi] == right) hi--;
            }
        }
    } else {
        // n > 2 时，递归计算 (n-1)Sum 的结果
        for (let i = start; i < len; i++) {
            let sub = nSumTarget(nums, n - 1, i + 1, target - nums[i]);
            for (let arr of sub) {
                // (n-1)Sum 加上 nums[i] 就是 nSum
                arr.push(nums[i]);
                res.push(arr);
            }
            while (i < len - 1 && nums[i] == nums[i + 1]) i++;
        }
    }
    return res
}


// https://leetcode.cn/problems/3sum-closest/ 最接近的三数之和
const twoSumClosest = (nums, start, target) => {
    let lo = start,
        hi = nums.length;
    let delta = Infinity;
    while (lo < hi) {
        let sum = nums[lo] + nums[hi];
        if (Math.abs(delta) > Math.abs(target - sum)) {
            delta = target - sum;
        }
        if (sum < target) {
            lo++;
        } else {
            hi--;
        }
    }
    return target - delta;
}

var threeSumClosest = function (nums, target) {
    if (nums.length < 3) return 0;
    nums.sort((a, b) => a - b);
    let delta = Infinity;
    for (let i = 0; i < nums.length - 2; ++i) {
        let sum = nums[i] + twoSum(nums, i + 1, target - nums[i])
        if (Math.abs(delta) > Math.abs(target - sum)) {
            delta = target - sum;
        }
    }
    return target - delta
};