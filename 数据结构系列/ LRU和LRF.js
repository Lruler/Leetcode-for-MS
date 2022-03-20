// LRU
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map();
    }

    get(key) {
        let val = this.map.get(key);
        if (val === undefined) return -1;

        this.map.delete(key); // 因为被用过一次，原有位置删除
        this.map.set(key, val); // 放入最下面表示最新使用
        return val;
    }

    put(key, val) {
        if (this.map.has(key)) this.map.delete(key); // 如果有，删除

        this.map.set(key, val); // 放到最下面表示最新使用

        if (this.map.size > this.capacity) {
            // 这里有个知识点
            // map的entries方法，还有keys方法(可以看mdn))，会返回一个迭代器
            // 迭代器调用next也是顺序返回，所以返回第一个的值就是最老的，找到并删除即可
            this.map.delete(this.map.entries().next().value[0])
        }
    }
}


// LFU 与LRU不同 LRU是淘汰最久没被使用的 而LFU是淘汰使用次数最少的

class Node {
    constructor(key, val) {
        this.key = key;
        this.value = val;
        this.pre = null;
        this.next = null;
        this.cnt = 1;
    }
}
class DoubleLinkedList {
    constructor() {
        this.head = new Node();
        this.tail = new Node();
        this.head.next = this.tail;
        this.tail.pre = this.head;
    }
    addNode(node) {
        node.pre = this.head;
        node.next = this.head.next;
        this.head.next.pre = node;
        this.head.next = node;
    }
    removeNode(node) {
        node.pre.next = node.next;
        node.next.pre = node.pre;
    }
}

let LFUCache = function (capacity) {
    this.capacity = capacity;
    this.valMap = new Map();
    this.min = 0;
    this.cntkeysMap = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function (key) {
    if (this.valMap.has(key)) {
        //查到了
        //增加key的操作次数
        let node = this.valMap.get(key);
        this.putVal(node);
        //给返回值
        return node.value;
    } else {
        //没查到的话，不影响操作次数，新旧程度，总容量
        return -1;
    }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function (key, value) {
    if (this.capacity === 0) {
        return;
    }
    if (this.valMap.has(key)) {
        //  更新值
        let node = this.valMap.get(key);
        node.value = value;
        // this.valMap.set(key, node);
        this.putVal(node);
    } else {
        //  键不在
        //  1capacity够不够？2频率3新旧
        if (this.capacity === this.valMap.size) {
            //  不够用 看频率
            let lowArr = this.cntkeysMap.get(this.min);
            let needDelKey = lowArr.tail.pre;
            lowArr.removeNode(needDelKey);
            if (lowArr.head.next === lowArr.tail) {
                this.cntkeysMap.delete(this.min);
            }
            this.valMap.delete(needDelKey.key);
        }
        let newNode = new Node(key, value);
        this.valMap.set(key, newNode);
        if (this.cntkeysMap.has(1)) {
            let array = this.cntkeysMap.get(1);
            array.addNode(newNode);
            this.cntkeysMap.set(1, array);
        } else {
            let newDb = new DoubleLinkedList();
            newDb.addNode(newNode);
            this.cntkeysMap.set(1, newDb);
        }
        this.min = 1;
    }
};

LFUCache.prototype.putVal = function (node) {
    //  增加key的操作数
    let num = node.cnt;
    node.cnt = num + 1;
    //    把之前存在num里面的node删掉
    let needDelete = this.cntkeysMap.get(num);
    needDelete.removeNode(node);
    if (needDelete.head.next === needDelete.tail) {
        this.cntkeysMap.delete(num);
        if (this.min === num) {
            this.min++;
        }
    }
    if (this.cntkeysMap.has(num + 1)) {
        let DBList = this.cntkeysMap.get(num + 1);
        DBList.addNode(node);
        this.cntkeysMap.set(num + 1, DBList);
    } else {
        let BDListOne = new DoubleLinkedList();
        BDListOne.addNode(node);
        this.cntkeysMap.set(num + 1, BDListOne);
    }
};
