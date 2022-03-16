// https://labuladong.gitee.io/algo/2/20/38/
/* 
T207 mid https://leetcode-cn.com/problems/course-schedule/
看见循环依赖问题 就用 环 来处理 (环检测算法DFS版本)
*/
const buildGraph = (numCourses, prerequisites) => {
    let graph = new Array(numCourses)
    for (let i = 0; i < numCourses; ++i) graph[i] = new Array();
    for (let edge in prerequisites) {
        let from = prerequisites[edge][1],
            to = prerequisites[edge][0];
        graph[from].push(to)
    }
    return graph
}
var canFinish = function (numCourses, prerequisites) {
    let path = [];
    let hasCycle = false;
    const graph = buildGraph(numCourses, prerequisites)
    let visited = new Array(graph.length)
    const traverse = (graph, s) => {
        if (path[s]) hasCycle = true
        if (visited[s] || hasCycle) return
        visited[s] = true
        path[s] = true
        for (let i in graph[s]) {
            traverse(graph, graph[s][i])
        }
        path[s] = false
    }
    for (let i = 0; i < numCourses; ++i) traverse(graph, i)
    return !hasCycle
};



/* 
T210 MID https://leetcode-cn.com/problems/course-schedule-ii/
课程表 II 拓扑排序（DFS）
拓扑排序 就是 把一幅图拉平 拉平后的图里所有边的方向是一致的
将后序遍历反转 就是拓扑排序的结果
*/

