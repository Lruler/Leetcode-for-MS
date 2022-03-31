// 冒泡
const bubbleSort = (nums) => {
    const len = nums.length
    for (let i = 0; i < len; ++i) {
        for (let j = 0; j < len - 1 - i; ++j) {
            if (nums[j] > nums[j + 1]) { //相邻元素两两对比
                let temp = nums[j + 1]; //元素交换
                nums[j + 1] = nums[j];
                nums[j] = temp;
            }
        }
    }
    return nums
}

/* 
** 改进冒泡排序： ** 
设置一标志性变量pos, 用于记录每趟排序中最后一次进行交换的位置。 
由于pos位置之后的记录均已交换到位, 故在进行下一趟排序时只要扫描到pos位置即可。
*/

const bubbleSort2 = (nums) => {
    let pos;
}

// 选择排序
const selectSort = (nums) => {
    const len = nums.length;
    for (let i = 0; i < len; ++i) {
        let minIndex = i
        for (let j = i; j < len; ++j) {
            minIndex = nums[j] > nums[minIndex] ? minIndex : j;
        }
        temp = nums[i];
        nums[i] = nums[minIndex];
        nums[minIndex] = temp;
    }
    return nums
}


// 插入排序
const insertSort = (nums) => {
    const len = nums.length;
    let preIndex, current;
    for (let i = 0; i < len; ++i) {
        preIndex = i - 1;
        current = nums[i];
        while (preIndex >= 0 && nums[preIndex] > current) {
            nums[preIndex + 1] = nums[preIndex];
            preIndex--;
        }
        nums[preIndex + 1] = current;
    }
    return nums
}

/* 
优化后 查找插入位置时用二分查找
*/
function binaryInsertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i],
            left = 0,
            right = i - 1;
        while (left <= right) {
            let middle = parselet((left + right) / 2);
            if (key < array[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        for (let j = i - 1; j >= left; j--) {
            array[j + 1] = array[j];
        }
        array[left] = key;
    }
    return array
}


// 希尔排序  插入排序的更高效的改进版本 分组来插入 比如一开始10个数 第一次就是 10/3 = 3 组，然后 3 / 3 = 1组
function shellSort(arr) {
    let len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 3) { //动态定义间隔序列
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            temp = arr[i];
            for (let j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}


// 归并排序 (涉及到分而治之的思想应用)
/*
自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第 2 种方法）；
自下而上的迭代； 迭代太复杂了 就算了
*/


function mergeSort(arr) {
    let len = arr.length
    if (len < 2) {
        return arr
    }
    let middle = Math.floor(len / 2)
    //拆分成两个子数组
    let left = arr.slice(0, middle)
    let right = arr.slice(middle, len)
    //递归拆分
    let mergeSortLeft = mergeSort(left)
    let mergeSortRight = mergeSort(right)
    //合并
    return merge(mergeSortLeft, mergeSortRight)
}
const merge = (left, right) => {
    const result = [];

    while (left.length && right.length) {
        // 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
        if (left[0] <= right[0]) {
            result.push(left.shift()); //每次都要删除left或者right的第一个元素，将其加入result中
        } else {
            result.push(right.shift());
        }
    }
    //将剩下的元素加上
    while (left.length) result.push(left.shift());

    while (right.length) result.push(right.shift());

    return result;
};



// 快速排序 分治思想的另一体现
var sortArray = function (nums) {
    const swap = (nums, i, j) => {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    const sort = (nums, lo, hi) => {
        if (lo >= hi) return;
        const partition = (nums, lo, hi) => {
            let pivot = nums[lo];
            // 关于区间的边界控制需格外小心，稍有不慎就会出错
            // 我这里把 i, j 定义为开区间，同时定义：
            // [lo, i) <= pivot；(j, hi] > pivot
            // 之后都要正确维护这个边界区间的定义
            let i = lo + 1,
                j = hi;
            // 当 i > j 时结束循环，以保证区间 [lo, hi] 都被覆盖
            while (i <= j) {
                while (i < hi && nums[i] <= pivot) {
                    i++;
                    // 此 while 结束时恰好 nums[i] > pivot
                }
                while (j > lo && nums[j] > pivot) {
                    j--;
                    // 此 while 结束时恰好 nums[j] <= pivot
                }
                // 此时 [lo, i) <= pivot && (j, hi] > pivot
                if (i >= j) {
                    break;
                }
                swap(nums, i, j);
            }
            // 将 pivot 放到合适的位置，即 pivot 左边元素较小，右边元素较大
            swap(nums, lo, j);
            return j;
        }
         // 对 nums[lo..hi] 进行切分
         // 使得 nums[lo..p-1] <= nums[p] < nums[p+1..hi]
        let p = partition(nums, lo, hi);
        sort(nums, lo, p - 1);
        sort(nums, p + 1, hi);
    }
    sort(nums, 0, nums.length - 1)
};

let nums = [3,8,7,12,1,9]
sortArray(nums)

/* 
后面还有堆 计数 桶 基数 先不管了
*/

function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0;
    arrLen = arr.length,
        bucketLen = maxValue + 1;

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (var j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}

var counter = [];

function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < arr.length; j++) {
            var bucket = parselet((arr[j] % mod) / dev);
            if (counter[bucket] == null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for (var j = 0; j < counter.length; j++) {
            var value = null;
            if (counter[j] != null) {
                while ((value = counter[j].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}

