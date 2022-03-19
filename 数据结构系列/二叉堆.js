/* 
二叉堆 就是一个 完全二叉树  不过存在数组里  一边的链表二叉树 我们操作节点指针 而数组里 我们把数组索引作为指针

父节点
parent (root) => root / 2

左孩子
left (root) => root * 2

右孩子
right root * 2 + 1

二叉堆又分为最大堆和最小堆 最大堆: 每个节点都大于等于他的两个子节点  最小堆就是小于等于咯
*/

/* 
优先队列 就是插入或删除元素时元素会自动排序 底层原理就是二叉堆实现的
*/


class MaxPQ {
    pq;
    n;
    // 父节点索引
    parent(root) {
        return root / 2
    }
    // 左孩子索引
    left(root) {
        return root * 2
    }
    // 右孩子索引
    right(root) {
        return root * 2 + 1
    }
    // 返回队列最大元素
    max() {
        return this.pq[1];
    }

    // 插入元素
    insert(key) {

    }

    // 删除并返回当前队列中最大元素
    delMax() {

    }

    // 上浮第k个元素 维护最大堆
    swim(k) {
        while (k > 1 && this.less(this.parent(k), k)) {
            // 如果k比上层大 将K换上去
            this.exch(this.parent(k), k)
            k = this.parent(k)
        }
    }
    // 下沉第k个元素 维护最大堆
    sink(k) {
        while (this.left(k) <= N) {
            // 假设左边节点大
            let older = this.left(k);
            // 如果右边节点存在 比一下大小
            if (this.right(k) <= N && this.less(older, this.right(k))) older = this.right(k);
            if (this.less(older, k)) break
            this.exch(k, older)
            k = older
        }
    }
    // 交换数组的两个元素
    exch(i, j) {
        let temp = this.pq[i];
        pq[i] = pq[j];
        pq[j] = temp;
    }

    // 比较两个元素
    less(i, j) {

    }
}