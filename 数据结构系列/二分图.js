/* 
简单理解二分图 就是 能够用两种颜色为图所有顶点着色 使得任何一条边都两个顶点颜色不同
leetcode 里面常见的就是判断一个图是不是二分图
*/

/* 
T886 https://leetcode-cn.com/problems/possible-bipartition/
*/
const possibleBipartition = (N, dislikes) => {

    let graph = [...Array(N + 1)].map(() => Array()), // 动态创建二维数组
        colors = Array(N + 1).fill(-1)

    // build the undirected graph
    for (const d of dislikes) {
        graph[d[0]].push(d[1])
        graph[d[1]].push(d[0])
    }

    const dfs = (cur, color = 0) => {
        colors[cur] = color
        for (const nxt of graph[cur]) {
            if (colors[nxt] !== -1 && colors[nxt] === color) return false // conflict
            if (colors[nxt] === -1 && !dfs(nxt, color ^ 1)) return false;
        }
        return true
    };

    for (let i = 0; i < N; ++i)
        if (colors[i] === -1 && !dfs(i, 0)) return false

    return true
};