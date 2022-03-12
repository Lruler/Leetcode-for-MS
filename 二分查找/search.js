// 二分查找 可以理解为一种变相的双指针，每次移动区间为半个当前数组区间长度 尝试对于区间问题熟悉一种写法  

/* 
框架 统一查找区间为左闭右闭
如果是搜索某一个值 比如 [1,2,3,4,5] 中 查找 2
int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length -1;
    while (left <= right) {  跳出循环条件是 left > right 最后一次的寻找区间就是一个值
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid
        } else if (nums[mid] < target) {
            left = mid + 1             因为mid因为查找过了，所以要 (+ ｜ -) 1
        } else if (nums[mid] > target) {
            right = mid - 1
        }
    }
    return -1;
}
如果有左侧边界 比如 [1,2,2,2,3,5] 中 查找最左侧的2(得出来的下标就可以理解为数组中有几个数比2小)
int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            right = mid - 1
        } else if (nums[mid] < target) {
            left = mid + 1
        } else if (nums[mid] > target) {
            right = mid - 1
        }
    }
    因为 当left = right + 1时，结束循环，所以要考虑到越界情况
    if (left >= nums.length || nums[left] != target) return -1
    return left
}
右侧边界和左侧同理了
int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            left = mid + 1
        } else if (nums[mid] < target) {
            left = mid + 1
        } else if (nums[mid] > target) {
            right = mid - 1
        }
    }
    考虑到越界情况
    if (right < 0 || nums[right] != target) return -1
    return left
}
*/

/* 
T69 easy https: //leetcode-cn.com/problems/sqrtx/
给定一个非负整数， 求它的开方， 向下取整。
In: 8
Out: 2

tips: 比较标准的二分查找模式 没有多余记忆点
*/
var mySqrt = function (x) {
    if (x < 2) return x
    let left = 1
    let right = Math.floor(x / 2);
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)
        if (mid * mid === x) return mid
        if (mid * mid < x) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return right
};

/* 
T34 mid https: //leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/
 给定一个增序的整数数组和一个值， 查找该值第一次和最后一次出现的位置。
 Input: nums = [5, 7, 7, 8, 8, 10], target = 8
 Output: [3, 4]

 tips: 查找第一次和最后一次，类似于indexOf和lastIndexOf，要在查找到目标值后，以该下标为左/右边界继续查找才能确定该下标是否为边界下标
*/

const binarySearch = (nums, target, lower) => {
    let left = 0,
        right = nums.length - 1,
        ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

var searchRange = function (nums, target) {
    let ans = [-1, -1];
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    }
    return ans;
};

/* 
T81 mid https: //leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/

Input: nums = [2, 5, 6, 0, 0, 1, 2], target = 0
Output: true
这题太奇葩了 不妨代码了 锤子二分 一个includes就解决了
实际上思路是用二分找出排序好的区间 然后再查 我觉得这是硬二分 没意义
*/

/* 
T154 Hard https: //leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/
就是n次旋转后的数组找出最小值
*/

/* 
当mid是偶数 mid & 1 = 0
当mid是基数 mid & 1 = 1
T540 mid https: //leetcode-cn.com/problems/single-element-in-a-sorted-array/
给你一个仅由整数组成的有序数组， 其中每个元素都会出现两次， 唯有一个数只会出现一次。
请你找出并返回只出现一次的那个数。
输入: nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
输出: 2
*/

// 判断单独数的下标必是偶数来查找
var singleNonDuplicate = function (nums) {
    let low = 0,
        high = nums.length - 1;
    while (low < high) {
        let mid = Math.floor((high - low) / 2) + low;
        mid -= mid & 1;
        if (nums[mid] === nums[mid + 1]) {
            low = mid + 2;
        } else {
            high = mid;
        }
    }
    return nums[low];
};


/* 
T4 hard https: //leetcode-cn.com/problems/median-of-two-sorted-arrays/
给定两个大小分别为 m 和 n 的正序（ 从小到大） 数组 nums1 和 nums2。 请你找出并返回这两个正序数组的 中位数。
输入： nums1 = [1, 3], nums2 = [2]
输出： 2.00000
解释： 合并数组 = [1, 2, 3]， 中位数 2
Hard我直接摆烂
*/
var findMedianSortedArrays = function (nums1, nums2) {

};