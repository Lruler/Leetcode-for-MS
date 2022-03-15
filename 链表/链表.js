// 链表相关题目

// 对链表操作 几乎都是递归/迭代   对值操作 哈希/双指针等

/* 
T206 easy https://leetcode-cn.com/problems/reverse-linked-list/
反转链表 简单 迭代/递归 都行
*/


/* 
T21 https://leetcode-cn.com/problems/merge-two-sorted-lists/
合并两个有序链表 easy  也是迭代/递归
*/


/* 
 **** HARD 合并k个有序列表 https://leetcode-cn.com/problems/merge-k-sorted-lists/
 用 优先队列(二叉堆) 实现
*/
class MinHeap {
    constructor() {
        this.heap = [];
    }
    // 交换节点位置
    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }
    // 获得父节点
    getParentIndex(i) {
        return (i - 1) >> 1;
    }
    // 获得左节点
    getleftIndex(i) {
        return 2 * i + 1;
    }
    // 获得右节点
    getrightIndex(i) {
        return 2 * i + 2;
    }
    // 上移
    shiftUp(index) {
        if (index === 0) return;

        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] && this.heap[parentIndex].val > this.heap[index].val) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }
    // 下移
    shiftDown(index) {
        const leftIndex = this.getleftIndex(index);
        const rightIndex = this.getrightIndex(index);
        if (this.heap[leftIndex] && this.heap[leftIndex].val < this.heap[index].val) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex);
        }
        if (this.heap[rightIndex] && this.heap[rightIndex].val < this.heap[index].val) {
            this.swap(rightIndex, index);
            this.shiftDown(rightIndex);
        }
    }
    // 插入
    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length - 1);
    }
    // 删除堆顶
    pop() {
        if (this.size() === 1) return this.heap.shift()
        const top = this.heap[0]
        // pop()方法删除数组最后一个元素并返回，赋值给堆顶
        this.heap[0] = this.heap.pop();
        // 对堆顶重新排序
        this.shiftDown(0);
        return top
    }
    // 获取堆顶
    peek() {
        return this.heap[0];
    }
    // 获取堆的大小
    size() {
        return this.heap.length;
    }
}
var mergeKLists = function (lists) {
    const res = new ListNode(0)
    let p = res
    const h = new MinHeap()
    // 插入k个升序链表的头部节点
    lists.forEach(l => {
        if (l) h.insert(l)
    })
    // 不断的地比较最小堆中k个节点的大小
    while (h.size()) {
        const n = h.pop()
        p.next = n
        p = p.next
        if (n.next) h.insert(n.next)
    }
    return res.next
};


/* 
T24 https://leetcode-cn.com/problems/swap-nodes-in-pairs/
两两交换相邻节点 也是迭代/递归
*/

/* 
T160 https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/
相交链表找出相交的点  哈希/双指针
*/

/* 
T234 https://leetcode-cn.com/problems/palindrome-linked-list/solution/
回文链表 转换成数组判断是否回文/递归 递归就用栈来思考 能想明白
*/

let frontPointer;

const recursivelyCheck = (currentNode) => {
    if (currentNode !== null) {
        if (!recursivelyCheck(currentNode.next)) {
            return false;
        }
        if (currentNode.val !== frontPointer.val) {
            return false;
        }
        frontPointer = frontPointer.next;
    }
    return true;
}

var isPalindrome = function (head) {
    frontPointer = head;
    return recursivelyCheck(head);
};


/* 
T83 https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/
删除列表的重复元素 eazy 线性遍历直接过
*/


/* 
T328 mid https://leetcode-cn.com/problems/odd-even-linked-list/
输入: head = [1, 2, 3, 4, 5]
输出: [1, 3, 5, 2, 4]
就是把奇数和偶数分组
*/


/* 
T19 https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
删除改链表第n个节点 快慢指针
*/

/* 
T148 https://leetcode-cn.com/problems/sort-list/
升序排序列表  自顶向下归并  自低向上归并 即一个递归一个迭代
*/

/* 
T876 easy https://leetcode-cn.com/problems/middle-of-the-linked-list/
找到链表中间节点
*/
