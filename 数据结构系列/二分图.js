/* 
简单理解二分图 就是 能够用两种颜色为图所有顶点着色 使得任何一条边都两个顶点颜色不同
leetcode 里面常见的就是判断一个图是不是二分图 这样首先肯定要遍历图 看一下遍历框架
*/

/* 
二叉树
const traverse = (root) => {
    if (root == null) return;
    traverse(root.left);
    traverse(root.right);
}

多叉树
const traverse = (root) => {
    if (root == null) return;
    for (let child in root) traverse
}

图
let visited: boolean[] = []; 
const traverse = (graph, v) => {
    if (visited[v]) return
    visited[v] = true;
    for (let neighbor in graph.neighbors(v)) traverse(graph, neighbor)
}   

对图进行一点润色

let visited: boolean[] = [];
const traverse = (graph, v) => {
    visited[v] = true;
    for (let neighbor of graph[v]) {
        if (!visited[neighbor]) {
            // 相邻节点没被访问 给节点涂上和v不同的颜色 
        } else {
            // 相邻节点被访问了  比较节点neighbor和v的颜色 若相同 则不是二分图
        }
    }
}
*/


/* 
T785 mid https://leetcode.cn/problems/is-graph-bipartite/
判断二分图 也能有BFS改写 这里就不用了 还是优先DFS 
*/

var isBipartite = function (graph) {
    let n = graph.length
    let visited = new Array(n).fill(false);
    let color = new Array(n).fill(false);
    let ok = true
    const traverse = (graph, v) => {
        if (!ok) return
        visited[v] = true;

        for (let neighbor of graph[v]) {
            if (!visited[neighbor]) {
                color[neighbor] = !color[v]
                traverse(graph, neighbor)
            } else {
                if (color[neighbor] == color[v]) {
                    ok = false
                }
            }
        }
    }
    for (let v in graph) {
        if (!visited[v]) traverse(graph, v)
    }
    return ok
};


/* 
T886 MID https://leetcode.cn/problems/possible-bipartition/
可能的二分法  就是 构建图 然后判断是否是二分图就行
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