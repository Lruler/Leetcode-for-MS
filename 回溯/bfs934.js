// 934 最短的桥 https://leetcode.cn/problems/shortest-bridge/submissions/

var shortestBridge = function (A) {
    const rows = A.length;
    const cols = A[0].length;
    const queue = [];

    for (let i = 0; i < rows; i++) {
        if (A[i].includes(1)) {
            dfs(i, A[i].indexOf(1));
            break;
        }
    }

    function dfs(x, y) {
        if (x < 0 || x >= rows || y < 0 || y >= cols || A[x][y] === 2) {
            return;
        }
        if (A[x][y] === 0) {
            queue.push([x, y]); // 存储岛屿边缘
            return;
        }
        A[x][y] = 2; // 染色
        dfs(x - 1, y);
        dfs(x + 1, y);
        dfs(x, y - 1);
        dfs(x, y + 1);
    }

    let curQueue = [];
    let result = 0;
    while (queue.length) {
        const [x, y] = queue.shift();
        if (x < 0 || x >= rows || y < 0 || y >= cols || A[x][y] === 2) {
            updateLen();
            continue;
        }
        if (A[x][y] === 1) { // 扩张到另一岛屿时，桥梁建成
            break;
        }
        if (A[x][y] === 0) { // 存储下一轮扩张的坐标
            curQueue.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
        }
        A[x][y] = 2; // 标记已扩张部分，防止重复访问
        updateLen();
    }

    function updateLen() {
        if (!queue.length) { // 一轮扩张结束时，更新桥梁长度及下一轮扩张坐标
            result++;
            queue.push(...curQueue);
            curQueue = [];
        }
    }
    return result;
}