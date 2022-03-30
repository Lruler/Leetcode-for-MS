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
            let middle = parseInt((left + right) / 2);
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


let sortArray1 = function (nums) {
    let len = nums.length
    if (len === 1) return nums
    let mid = len / 2
    let left = nums.slice(0, mid)
    let right = nums.slice(mid, len)
    return merge(sortArray(left), sortArray(right))
}
let merge = function (left, right) {
    let result = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left[0])
            left.splice(0, 1)
        } else {
            result.push(right[0]),
                right.splice(0, 1)
        }
    }
    return result.concat(left).concat(right)
}


 // 快速排序 分治思想的另一体现
var sortArray = function (nums) {
    const sort = (nums, lo, hi) => {
        let temp = new Array(nums.length)
        const merge = (nums, lo, mid, hi) => {
            for (let i = lo; i <= hi; ++i) {
                temp[i] = nums[i]
            }
            let i = lo;
            j = mid + 1;
            for (let p = lo; p <= hi; ++p) {
                if (i == mid + 1) {
                    nums[p] = temp[j++]
                } else if (j == hi + 1) {
                    nums[p] = temp[i++]
                } else if (temp[i] > temp[j]) {
                    nums[p] = temp[j++]
                } else {
                    nums[p] = temp[i++]
                }
            }
        }
        if (lo == hi) return
        let mid = lo + (hi - lo) / 2;
        sort(nums, lo, mid);
        sort(nums, mid + 1, hi)
        merge(nums, lo, mid, hi)
    }
    sort(nums, 0, nums.length - 1)
    return nums
};
 


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
            var bucket = parseInt((arr[j] % mod) / dev);
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