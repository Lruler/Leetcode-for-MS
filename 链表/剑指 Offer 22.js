var getKthFromEnd = function (head, k) {
    let arr = [];
    while (head) {
        arr.push(head)
        head = head.next
    }
    for (let i = 0; i < k - 1; i++) {
        arr.pop()
    }
    return arr[arr.length - 1]
};

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
升序排序列表  自顶向下归并  自低向上归并
*/