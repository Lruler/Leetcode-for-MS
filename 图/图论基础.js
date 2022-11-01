// 图的遍历框架
// 记录被遍历过的节点
let visited = [];
// 记录从起点到当前节点路径
let path = [];
const traverse = (graph, s) => {
    if (visited[s]) return
    // 标记已遍历
    visited[s] = true
    // 标记节点s在路上
    path[s] = true
    for (let neighbor in graph[s]) traverse(graph, neighbor)
    // 节点离开路径
    path[s] = false
}

/* 
T797 MID https://leetcode.cn/problems/all-paths-from-source-to-target/
图的所有可能路径
*/

var allPathsSourceTarget = function (graph) {
    let res = [];
    let path = [];
    // 图遍历框架
    const traverse = (graph, s, path) => {
        // 添加节点s到路径
        path.push(s);
        let n = graph.length;
        if (s == n - 1) {
            // 到达终点
            res.push([...path])
            path.pop()
            return
        }
        // 递归每一个相邻节点
        for (let i in graph[s]) {
            traverse(graph, graph[s][i], path)
        }
        // 从路径中移除节点s
        path.pop()
    }

    traverse(graph, 0, path)
    return res
};