// https://leetcode.cn/problems/number-of-provinces/submissions/
// 省份数量

// 递归
var findCircleNumDfs = function (isConnected) {

    let n = isConnected.length,
        count = 0;
    let visited = new Array(n).fill(false);

    const dfs = (isConnected, i, visited) => {
        visited[i] = true;
        for (let j = 0; j < n; ++j) {
            if (isConnected[i][j] == 1 && !visited[j]) {
                dfs(isConnected, j, visited)
            }
        }
    }

    for (let i = 0; i < n; ++i) {
        if (!visited[i]) {
            dfs(isConnected, i, visited)
                ++count
        }
    }
    return count
};

// bfs
var findCircleNumBfs = function (isConnected) {
    const provinces = isConnected.length;
    const visited = new Set();
    let circles = 0;
    const queue = new Array();
    for (let i = 0; i < provinces; i++) {
        if (!visited.has(i)) {
            queue.push(i);
            while (queue.length) {
                const j = queue.shift();
                visited.add(j);
                for (let k = 0; k < provinces; k++) {
                    if (isConnected[j][k] === 1 && !visited.has(k)) {
                        queue.push(k);
                    }
                }
            }
            circles++;
        }
    }
    return circles;
};
