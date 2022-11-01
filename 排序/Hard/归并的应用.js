/* 
逆序对 HARD https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/
*/

var reversePairs = function (nums) {
    let cnt = 0;

    let merge = (left, right) => {
        let res = [];
        let i = 0,
            j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                res.push(left[i++]);
                cnt += j; // 逆序对增加
            } else {
                res.push(right[j++]);
            }
        }
        if (i < left.length) {
            res.push(...left.slice(i));
            cnt += (left.length - i) * j; // 逆序对增加
        } else res.push(...right.slice(j));
        return res;
    }

    let mergeSort = arr => {
        if (arr.length < 2) return arr;
        let mid = ~~(arr.length / 2);
        let left = mergeSort(arr.slice(0, mid));
        let right = mergeSort(arr.slice(mid));
        return merge(left, right);
    }

    mergeSort(nums);
    return cnt;
};
/* 
T315 HARD https://leetcode.cn/problems/count-of-smaller-numbers-after-self/
计算右侧小于当前元素的个数 
输入： nums = [5, 2, 6, 1]
输出：[2, 1, 1, 0]
解释：
5 的右侧有 2 个更小的元素(2 和 1)
2 的右侧仅有 1 个更小的元素(1)
6 的右侧有 1 个更小的元素(1)
1 的右侧有 0 个更小的元素
*/
let counts = [],
    indices = [],
    helpers = [],
    res = []

var countSmaller = function (nums) {
    if (!nums || !nums.length) {
        return []
    }
    counts = new Array(nums.length).fill(0)
    indices = new Array(nums.length).fill(0).map((val, index) => index)
    helpers = new Array(nums.length)
    res = new Array(nums.length).fill(0)

    mergeSort(nums, 0, nums.length - 1)
    return res
};

function mergeSort(nums, left, right) {
    if (left >= right) {
        return
    }
    const mid = left + Math.floor((right - left) / 2)
    mergeSort(nums, left, mid)
    mergeSort(nums, mid + 1, right)

    if (nums[indices[mid]] <= nums[indices[mid + 1]]) {
        return
    }

    merge(nums, left, mid, right)
}

function merge(nums, left, mid, right) {
    for (let i = left; i <= right; i++) {
        helpers[i] = indices[i]
    }

    let i = left,
        j = mid + 1
    // 核心思想，在移动i的时候，小于i对应元素的数量实际为[mid, j]的数量，因为mid到j的元素已经移走了，所以肯定小于i元素。
    for (let k = left; k <= right; k++) {
        if (i > mid) { // 左半部分已经遍历完，则移动右半部分，移动右边的无须计数
            indices[k] = helpers[j]
            j++
        } else if (j > right) { // 有半部分已经遍历完，则移动左半部分，并且，对应位置的元素统计数为已经移动其左侧的数量(right - mid)
            indices[k] = helpers[i]
            i++
            res[indices[k]] += (right - mid)
        } else if (nums[helpers[i]] <= nums[helpers[j]]) { // 左、右半部分都未遍历完，则比较大小，如果左半部分小，则取i
            indices[k] = helpers[i]
            i++
            res[indices[k]] += (j - mid - 1) // 统计已经移动到左侧的元素j - mid - 1
        } else {
            indices[k] = helpers[j]
            j++
        }
    }
}


/* 
T493  HARD https://leetcode.cn/problems/reverse-pairs/
翻转对 不仅要大 还要大于它的两倍
*/

var reversePairs = function (nums) {
    if (nums.length === 0) {
        return 0;
    }
    return reversePairsRecursive(nums, 0, nums.length - 1);
};

const reversePairsRecursive = (nums, left, right) => {
    if (left === right) {
        return 0;
    } else {
        const mid = Math.floor((left + right) / 2);
        const n1 = reversePairsRecursive(nums, left, mid);
        const n2 = reversePairsRecursive(nums, mid + 1, right);
        let ret = n1 + n2;

        let i = left;
        let j = mid + 1;
        while (i <= mid) {
            while (j <= right && nums[i] > 2 * nums[j]) {
                j++;
            }
            ret += j - mid - 1;
            i++;
        }

        const sorted = new Array(right - left + 1);
        let p1 = left,
            p2 = mid + 1;
        let p = 0;
        while (p1 <= mid || p2 <= right) {
            if (p1 > mid) {
                sorted[p++] = nums[p2++];
            } else if (p2 > right) {
                sorted[p++] = nums[p1++];
            } else {
                if (nums[p1] < nums[p2]) {
                    sorted[p++] = nums[p1++];
                } else {
                    sorted[p++] = nums[p2++];
                }
            }
        }
        for (let k = 0; k < sorted.length; k++) {
            nums[left + k] = sorted[k];
        }
        return ret;
    }
}





/* 
T327 HARD https://leetcode.cn/problems/count-of-range-sum/
区间和的个数
*/



const countRangeSumRecursive = (sum, lower, upper, left, right) => {
    if (left === right) {
        return 0;
    } else {
        const mid = Math.floor((left + right) / 2);
        const n1 = countRangeSumRecursive(sum, lower, upper, left, mid);
        const n2 = countRangeSumRecursive(sum, lower, upper, mid + 1, right);
        let ret = n1 + n2;

        // 首先统计下标对的数量
        let i = left;
        let l = mid + 1;
        let r = mid + 1;
        while (i <= mid) {
            while (l <= right && sum[l] - sum[i] < lower) l++;
            while (r <= right && sum[r] - sum[i] <= upper) r++;
            ret += (r - l);
            i++;
        }

        // 随后合并两个排序数组
        const sorted = new Array(right - left + 1);
        let p1 = left,
            p2 = mid + 1;
        let p = 0;
        while (p1 <= mid || p2 <= right) {
            if (p1 > mid) {
                sorted[p++] = sum[p2++];
            } else if (p2 > right) {
                sorted[p++] = sum[p1++];
            } else {
                if (sum[p1] < sum[p2]) {
                    sorted[p++] = sum[p1++];
                } else {
                    sorted[p++] = sum[p2++];
                }
            }
        }
        for (let i = 0; i < sorted.length; i++) {
            sum[left + i] = sorted[i];
        }
        return ret;
    }
}
var countRangeSum = function (nums, lower, upper) {
    let s = 0;
    const sum = [0];
    for (const v of nums) {
        s += v;
        sum.push(s);
    }
    return countRangeSumRecursive(sum, lower, upper, 0, sum.length - 1);
};