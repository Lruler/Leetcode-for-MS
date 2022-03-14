/* 
BFS的本质 注意这一点 BFS的本质 就是 找最短路径！！！
直接看框架
计算起点 start 到终点 target 的最近距离
const BFS = (Node start, Node target) => {
    const queue = []; // BFS 核心数据结构
    const visited = new Set() // 避免走回头路

    queue.push(start) // 起点入队
    visited.add(start)
    let step = 0;

    while (queue.length) {
        let len = queue.length
        // 队列中所有节点开始扩散
        for (let i = 0; i < len; ++i) {
            let cur = queue.shift()  

            if (cur === target) // 判断是否到终点
                return step
            // 将cur的相邻节点加入队列
            for (遍历 cur 相邻节点)
                if (x not in visited) {
                    queue.push(x)
                    visited.add(x)
                }
        }
        step++
    }
}
*/


/* 
T752 mid https://leetcode-cn.com/problems/open-the-lock/
用BFS框架 思路很简单 要考究的地方是死亡字典 和 八个“邻接节点”的枚举
*/
var openLock = function (deadends, target) {
    if (target === '0000') {
        return 0;
    }

    const dead = new Set(deadends);
    if (dead.has("0000")) {
        return -1;
    }

    let step = 0;
    const queue = [];
    queue.push("0000");
    const seen = new Set();
    seen.add("0000");

    while (queue.length) {
        ++step;
        const size = queue.length;
        for (let i = 0; i < size; ++i) {
            const status = queue.shift();
            for (const nextStatus of get(status)) {
                if (!seen.has(nextStatus) && !dead.has(nextStatus)) {
                    if (nextStatus === target) {
                        return step;
                    }
                    queue.push(nextStatus);
                    seen.add(nextStatus);
                }
            }
        }
    }

    return -1;
};

const numPrev = (x) => {
    return x === '0' ? '9' : (parseInt(x) - 1) + '';
}

const numSucc = (x) => {
    return x === '9' ? '0' : (parseInt(x) + 1) + '';
}

// 枚举 status 通过一次旋转得到的数字
const get = (status) => {
    const ret = [];
    const array = Array.from(status);
    for (let i = 0; i < 4; ++i) {
        const num = array[i];
        array[i] = numPrev(num);
        ret.push(array.join(''));
        array[i] = numSucc(num);
        ret.push(array.join(''));
        array[i] = num;
    }

    return ret;
}

/* 
双向BFS 及BFS优化 就是在知道终点的情况下 从起点和终点同时开始BFS遍历 不再使用队列 使用Set判断两个集合是否有交集
*/

const openLock = (deadends, target) => {
    const dead = new Set(deadends)
    // 用集合不用队列，可以快速判断元素是否存在
    let queue1 = new Set < string > (['0000'])
    let queue2 = new Set < string > ([target])
    const visited = new Set()
    let res = 0

    while (queue1.size && queue2.size) {
        if (queue1.size > queue2.size) {
            ;
            [queue1, queue2] = [queue2, queue1]
        }
        // 本层搜出来的结果
        const tmp = new Set()
        for (const cur of queue1) {
            if (dead.has(cur)) continue
            if (queue2.has(cur)) return res
            visited.add(cur)

            for (const next of getNextStates(cur)) {
                if (visited.has(next)) continue
                tmp.add(next)
            }
        }

        res++
        queue1 = queue2
        queue2 = tmp
    }
    return -1

    // 八个临边
    function getNextStates(s) {
        const ans = []
        for (let i = 0; i < s.length; i++) {
            ans.push(s.slice(0, i) + ((+s[i] + 1) % 10).toString() + s.slice(i + 1))
            // +9模10表示-1
            ans.push(s.slice(0, i) + ((+s[i] + 9) % 10).toString() + s.slice(i + 1))
        }
        return ans
    }
}
