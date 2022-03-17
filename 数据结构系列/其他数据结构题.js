/* 
https://leetcode-cn.com/problems/maximum-frequency-stack/
T 795 HARD 最大频率栈
*/
class FreqStack {
    maxFreq = 0
    // FV MAP
    FreqToVal = new Map()
    ValToFreq = new Map()

    push = (val) => {
        // 修改VF表
        let freq = this.ValToFreq.has(val) ? this.ValToFreq.get(val) + 1 : 1
        this.ValToFreq.set(val, freq)
        // 修改FV表：在对应freq对应的列表上加上val
        if (!this.FreqToVal.has(freq)) {
            this.FreqToVal.set(freq, [])
        }
        this.FreqToVal.get(freq).push(val)
        this.maxFreq = Math.max(this.maxFreq, freq)
    }

    pop = () => {
        // 修改FV表： pop出一个maxFreq 对应的元素v
        let vals = this.FreqToVal.get(this.maxFreq)
        let v = vals.pop()
        // 修改VF表，使v对应的freq-1
        let freq = this.ValToFreq.get(v) - 1
        this.ValToFreq.set(v, freq)
        // 更新maxFreq
        if (!vals.length) {
            this.maxFreq--
        }
        return v
    }
}


/* 
https://leetcode-cn.com/problems/find-median-from-data-stream/
T 295 HARD 数据流中位数 用两个堆来实现 大顶堆和小顶堆
*/
var MedianFinder = function () {
    this.maxHeap = new Heap()
    this.minHeap = new Heap()
}
MedianFinder.prototype.addNum = function (num) {
    let maxSize = this.maxHeap.getSize()
    let minSize = this.minHeap.getSize()
    if (maxSize === 0) {
        this.maxHeap.insert(num, false)
    } else {
        if (this.maxHeap.getTop() > num) {
            this.maxHeap.insert(num, false)
        } else {
            this.minHeap.insert(num, true)
        }
        maxSize = this.maxHeap.getSize()
        minSize = this.minHeap.getSize()
        if (minSize > maxSize) {
            // 需要从小顶堆删除堆顶元素，并放入到大顶堆
            let top = this.minHeap.pop(true)
            this.maxHeap.insert(top, false)
        } else if (maxSize - 1 > minSize) {
            // 需要从大顶堆删除堆顶元素，并放入到小顶堆
            let top = this.maxHeap.pop(false)
            this.minHeap.insert(top, true)
        }
    }
}
MedianFinder.prototype.findMedian = function () {
    let maxSize = this.maxHeap.getSize()
    let minSize = this.minHeap.getSize()
    if (maxSize === minSize) {
        return (this.maxHeap.getTop() + this.minHeap.getTop()) / 2
    } else {
        return this.maxHeap.getTop()
    }
}
class Heap {
    constructor() {
        this.data = [0]
        this.count = 0
    }

    getTop() {
        return this.data[1]
    }

    pop(minFlag) {
        let top = this.data[1]
        if (this.count > 1) {
            this.data[1] = this.data[this.count]
            this.data.splice(this.count, 1)
            this.count--
            let i = 1
            if (minFlag) {
                while (true) {
                    let maxPos = i
                    if (
                        i * 2 <= this.count &&
                        this.data[i] > this.data[i * 2]
                    ) {
                        maxPos = i * 2
                    }
                    if (
                        i * 2 + 1 <= this.count &&
                        this.data[maxPos] > this.data[i * 2 + 1]
                    ) {
                        maxPos = i * 2 + 1
                    }
                    if (i === maxPos) {
                        break
                    }
                    this.swap(i, maxPos)
                    i = maxPos
                }
            } else {
                while (true) {
                    let maxPos = i
                    if (
                        i * 2 <= this.count &&
                        this.data[i] < this.data[i * 2]
                    ) {
                        maxPos = i * 2
                    }
                    if (
                        i * 2 + 1 <= this.count &&
                        this.data[maxPos] < this.data[i * 2 + 1]
                    ) {
                        maxPos = i * 2 + 1
                    }
                    if (i === maxPos) {
                        break
                    }
                    this.swap(i, maxPos)
                    i = maxPos
                }
            }
        } else {
            this.data.splice(this.count, 1)
            this.count--
        }
        return top
    }

    insert(val, minFlag) {
        this.count++
        this.data[this.count] = val
        let i = this.count
        if (minFlag) {
            while (
                parseInt(i / 2) > 0 &&
                this.data[i] < this.data[parseInt(i / 2)]
            ) {
                this.swap(i, parseInt(i / 2))
                i = parseInt(i / 2)
            }
        } else {
            while (
                parseInt(i / 2) > 0 &&
                this.data[i] > this.data[parseInt(i / 2)]
            ) {
                this.swap(i, parseInt(i / 2))
                i = parseInt(i / 2)
            }
        }
    }

    getSize() {
        return this.count
    }

    swap(i, j) {
        let temp = this.data[i]
        this.data[i] = this.data[j]
        this.data[j] = temp
    }
}

