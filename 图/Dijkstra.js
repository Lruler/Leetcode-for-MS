/* 
Dijkstra算法 BFS的加强版 都是从二叉树的层序遍历衍生来的
// https://labuladong.gitee.io/algo/2/20/44/
给出 起点和 终点  计算起点到终点的最短加权路径

let weight 

const dijkstra = (start, end, graph) => {
    while
}
*/





/* 
T743 MID https://leetcode-cn.com/problems/network-delay-time/
把网络延迟看作边的权重
*/

	function networkDelayTime(times, n, k) {
	    // 节点编号是从 1 开始的，所以要一个大小为 n + 1 的邻接表
	    let graph = new Array(n + 1).fill(0).map((v) => [])
	    // 构造图
	    for (let edge of times) {
	        let from = edge[0]
	        let to = edge[1]
	        let weight = edge[2]
	        // from -> List<(to, weight)>
	        // 邻接表存储图结构，同时存储权重信息
	        const temp = [to, weight]
	        graph[from].push(temp)
	    }
	    // 启动 dijkstra 算法计算以节点 k 为起点到其他节点的最短路径
	    let distTo = dijkstra(k, graph)

	    // 找到最长的那一条最短路径
	    let res = 0
	    for (let i = 1; i < distTo.length; i++) {
	        if (distTo[i] == Number.MAX_VALUE) {
	            // 有节点不可达，返回 -1
	            return -1
	        }
	        res = Math.max(res, distTo[i])
	    }
	    return res
	}

	// 输入一幅图和一个起点 start，计算 start 到其他节点的最短距离
	const dijkstra = (start, graph ) => {
	    // 图中节点的个数
	    // const adj = (s: number): any[] => graph[s]
	    let V = graph.length
	    // 记录最短路径的权重，你可以理解为 dp table
	    // 定义：distTo[i] 的值就是节点 start 到达节点 i 的最短路径权重
	    // 求最小值，所以 dp table 初始化为正无穷
	    let distToNextNode = new Array(graph.length).fill(Number.MAX_VALUE)
	    // base case，start 到 start 的最短距离就是 0
	    distTo[start] = 0

	    // 优先级队列，distFromStart 较小的排在前面
	    const basedArr = []
	    let pq = new HeapDS.PriorityQueue(basedArr, (a, b) => {
	        return a.distFromStart - b.distFromStart
	    })
	    // 从起点 start 开始进行 BFS
	    pq.push(new State(start, 0))

	    while (pq.size !== 0) {
	        let curState = pq.shift()
	        let curNodeID = curState.id
	        let curDistFromStart = curState.distFromStart
	        if (curDistFromStart > distTo[curNodeID]) {
	            // 已经有一条更短的路径到达 curNode 节点了
	            continue
	        }
	        // 将 curNode 的相邻节点装入队列
	        for (let neighbor of graph[curNodeID]) {
	            // 看看从 curNode 达到 nextNode 的距离是否会更短
	            let nextNodeID = neighbor[0]
	            let distToNextNode = distTo[curNodeID] + neighbor[1]
	            if (distTo[nextNodeID] > distToNextNode) {
	                // 更新 dp table
	                distTo[nextNodeID] = distToNextNode
	                // 将这个节点以及距离放入队列
	                pq.push(new State(nextNodeID, distToNextNode))
	            }
	        }
	    }
	    return distTo
	}

	class State {
	    // 记录 node 节点的深度
	    id
	    distFromStart

	    constructor(id, distFromStart) {
	        this.id = id
	        this.distFromStart = distFromStart
	    }
	}

/* 
T

*/



/* 
T1514 https://leetcode-cn.com/problems/path-with-maximum-probability/
*/


/* 
T1631 https://leetcode-cn.com/problems/path-with-minimum-effort/

*/