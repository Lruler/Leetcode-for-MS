// 链表相关题目
// 对链表操作 几乎都是递归/迭代   对值操作 哈希/双指针等
/* 
T206 easy https://leetcode.cn/problems/reverse-linked-list/
反转链表 简单 迭代/递归 都行
*/
var reverseList = function(head) {
    // 终止条件
    if (!head || !head.next) return head;
    let last = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return last
};
/* 
T92 mid https://leetcode.cn/problems/reverse-linked-list-ii/
反转链表 II
 */
// 反转前n个节点
let successor = null
const reverseN = (head, n) => {
    if (n == 1) {
        successor = head.next
        return head
    }
    let last = reverseN(head.next, n - 1)
    head.next.next = head
    head.next = successor
    return last
}
var reverseBetween = function (head, left, right) {
    if (left == 1) return reverseN(head, right)

    head.next = reverseBetween(head.next, left - 1, right - 1)
    return head
};
/* 
T25 HARD !!!! https://leetcode.cn/problems/reverse-nodes-in-k-group/
K 个一组翻转链表e
*/
var reverseKGroup = function (head, k) {
    // 反转链表函数
    var reverseList = function (a, b) {
        let pre, cur, nxt;
        pre = null;
        cur = a;
        nxt = a;
        // 进行的操作是每次循环将cur->pre，注意b的方向没有改变
        while (cur != b) {
            // 保存a的下一个值next
            nxt = cur.next;
            // 将cur指向上一个值pre（反转指向）
            cur.next = pre;
            // 将pre赋予当前值，当做下一次循环的pre
            pre = cur;
            // 将cur赋予新值，用于下一次循环的cur
            cur = nxt;
        }
        // 返回的pre是b结点前一个节点，改变了方向
        return pre;
    }

    if (!head) {
        return null;
    }
    let a = head;
    let b = head;
    // 区间[a,b)包含k个元素
    for (i = 0; i < k; i++) {
        //剩余的结点数不足k个，反转结束
        if (b == null) {
            return head;
        } else {
            b = b.next;
        }
    }
    //反转前k个元素
    let newHead = reverseList(a, b);
    a.next = reverseKGroup(b, k);
    return newHead;
};
/* 
T21 https://leetcode.cn/problems/merge-two-sorted-lists/
合并两个有序链表 easy  也是迭代/递归
*/
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
/* 
T23 **** HARD 合并k个有序列表 https://leetcode.cn/problems/merge-k-sorted-lists/
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
T24 https://leetcode.cn/problems/swap-nodes-in-pairs/
两两交换相邻节点 也是迭代/递归
*/
var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};
/* 
T160 https://leetcode.cn/problems/intersection-of-two-linked-lists/solution/
相交链表找出相交的点  哈希/双指针
*/
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
/* 
T234 https://leetcode.cn/problems/palindrome-linked-list/solution/
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
T83 https://leetcode.cn/problems/remove-duplicates-from-sorted-list/
删除列表的重复元素 eazy 线性遍历直接过
*/
var deleteDuplicates = function(head) {
    if (head == null) return head
    let cur = head
    while (cur) {
        if (cur.next && cur.val === cur.next.val) {
            cur.next = cur.next.next
        }
        else {
            cur = cur.next
        }
    }
    return head
};
/* 
T328 mid https://leetcode.cn/problems/odd-even-linked-list/
输入: head = [1, 2, 3, 4, 5]
输出: [1, 3, 5, 2, 4]
就是把奇数和偶数分组
*/
var oddEvenList = function(head) {
    if (head === null) {
        return head;
    }
    let evenHead = head.next;
    let odd = head, even = evenHead;
    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
};
/* 
T19 https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
删除改链表第n个节点 快慢指针
*/
function Node(val){
    this.val = val
    this.next = null
}
var removeNthFromEnd = function(head, n) {
    let h = new Node(0) // 创建一个新的头结点，方便删除头结点
    h.next = head
    let start = h
    let end = h
    let count = 1
    while(end&&end.next){
        end = end.next
        if(count > n){
            start = start.next
        }
        count++
    }
    start.next = start.next.next
    return h.next
};
/* 
T148 https://leetcode.cn/problems/sort-list/
升序排序列表  自顶向下归并  自低向上归并 即一个递归一个迭代
*/
function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
/* 
T876 easy https://leetcode.cn/problems/middle-of-the-linked-list/
找到链表中间节点
*/
var middleNode = function(head) {
    let slow = head, faster = head
    while (faster && faster.next) {
        slow = slow.next
        faster = faster.next.next
    }
    return slow
};
/* 
T141 https://leetcode.cn/problems/linked-list-cycle/submissions/
easy 判断链表是否有环 环形链表
*/
const hasCycle = function (head) {
    if (head === null || head.next === null) {
        return false;
    }
    let slow = head;
    let fast = head.next;
    while (slow) {
        if (slow === fast) {
            return true
        }
        slow = slow?.next || null;
        fast = fast?.next?.next || null;
    }
    return false;
};
/* 
T142 https: //leetcode-cn.com/problems/linked-list-cycle-ii/
mid 判断有无环 并返回环的起点 环形链表
*/
var detectCycle = function (head) {
    if (head === null) {
        return null;
    }
    let slow = head,
        fast = head;
    while (fast !== null) {
        slow = slow.next;
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        if (fast === slow) {
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
};

// T143 重排链表 https://leetcode.cn/problems/reorder-list/

/**
这样我们的任务即可划分为三步：
找到原链表的中点（参考「876. 链表的中间结点」）。
我们可以使用快慢指针来 O(N)O(N)O(N) 地找到链表的中间节点。
将原链表的右半端反转（参考「206. 反转链表」）。
我们可以使用迭代法实现链表的反转。
将原链表的两端合并。
因为两链表长度相差不超过1，因此直接合并即可。
**/
