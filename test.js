// 归并
const merge = (left, right) => {
    const res = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) res.push(left.shift());
        else res.push(right.shift())
    }
    while (left.length) res.push(left.shift())
    while (right.length) res.push(right.shift())
    return res
}

const mergeSort = (nums) => {
    const len = nums.length;
    if (len <= 1) return nums;

    const mid = len >> 1;
    const left = nums.slice(0, mid);
    const right = nums.slice(mid, len);

    const leftSort = mergeSort(left);
    const rightSort = mergeSort(right);

    return merge(leftSort, rightSort)
}

let nums = [2, 7, 9, 1, 8, 5, 3, 12, 4]
// 快排

const quickSort = (nums) => {
    const swap = (nums, i, j) => {
        let temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }
    const sort = (nums, lo, hi) => {
        if (lo >= hi) return
        const partition = (nums, lo, hi) => {
            let p = nums[lo];
            let i = lo + 1,
                j = hi;

            while (i <= j) {
                while (i < hi && nums[i] <= p) i++
                while (j > lo && nums[j] > p) j--
                if (i >= j) break;
                swap(nums, i, j)
            }
            swap(nums, lo, j)
            return j
        }


        // p作为基准，此时p已经排序过了 所以后面不需要排序p
        const p = partition(nums, lo, hi)
        sort(nums, lo, p - 1);
        sort(nums, p + 1, hi)
    }
    sort(nums, 0, nums.length - 1)
}

// curry

const curry = (fn, ...args) => {
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}

// 深拷贝 (注意  这不能拷贝Symbol 键)
const deepClone = (obj) => {
    if (!obj || typeof obj !== 'object') return
    let newObj = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
    return newObj
}

// new
const myNew = (constructor) => {
    let newObj = {};
    newObj.__proto__ = constructor.prototype
    let res = constructor.call(newObj)
    return res instanceof Object ? res : newObj
}

// 防抖
function debounce(fn, wait) {
    let timer = null;

    return function () {
        let context = this,
            args = arguments

        if (timer) {
            clearTimeout(timer);
            timer = null
        }

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}

// 节流

function throttle(fn, wait) {
    let timer = null;

    return function () {
        let context = this,
            args = arguments;
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(context, args)
            timer = null
        }, wait)
    }
}

// Promise

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onFufilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (value instanceof Promise) return value.then(resolve, reject)
            if (this.status == PENDING) {
                this.status == FULFILLED;
                this.value = value;
                this.onFufilledCallbacks.forEach(fn => fn())
            }
        }

        const reject = (reason) => {
            if (this.status == PENDING) {
                this.status == REJECTED;
                this.reason == reason;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFufilled, onRejected) {
        let newPromise;
        if (this.status === FULFILLED) {
            return newPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let result = onFufilled(this.value)
                        resolve(result)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        }

        if (this.status === REJECTED) {
            return newPromise = new Promise((resovle, reject) => {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.reason)
                        resovle(result);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
        }

        if (this.status === PENDING) {
            return newPromise = new Promise((resovle, reject) => {
                setTimeout(() => {
                    this.onResolvedCallbacks.push(() => {
                        try {
                            let result = onFulfilled(this.value);
                            resovle(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    this.onRejectedCallbacks.push(() => {
                        try {
                            let result = onRejected(this.reason)
                            resovle(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                })
            })
        }
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    catch (errcallback) {
        return this.then(null, errcallback)
    }
}

MyPromise.prototype.finally = (callback) => {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => value)
    }, (reason) => {
        return Promise.resolve(callback()).then(() => {
            throw reason
        })
    })
}
