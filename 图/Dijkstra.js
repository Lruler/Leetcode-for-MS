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
class State {
	constructor(id, distFromStart) {
		this.id = id
		this.distFromStart = distFromStart
	}
}
var networkDelayTime = function (times, n, k) {
	let graph = new Array(n + 1).fill(0).map(_ => {
		return []
	});

	// 构造图-----邻接表
	for (const time of times) {
		let form = time[0]
		console.log(form)
		let to = time[1]
		let weight = time[2]
		graph[form].push({
			to,
			weight
		})
	}
	let distTo = dijkstra(k, graph);
	// 找到最长的那一条最短路径
	let res = 0;
	for (let i = 1; i < distTo.length; i++) {
		if (distTo[i] == Number.MAX_SAFE_INTEGER) {
			// 有节点不可达，返回 -1
			return -1;
		}
		res = Math.max(res, distTo[i]);
	}
	return res;
};
var dijkstra = function (start, graph) {
	let distTo = new Array(graph.length)
	distTo.fill(Number.MAX_SAFE_INTEGER)

	// 队列
	const queue = []

	// start=>start 距离 是0
	distTo[start] = 0

	queue.push(new State(start, 0))
	while (queue.length) {
		let curState = queue.shift()
		let curNodeID = curState.id;
		let curDistFromStart = curState.distFromStart;
		if (curDistFromStart > distTo[curNodeID]) {
			continue;
		}
		// 将 curNode 的相邻节点装入队列
		for (const neighbor of graph[curNodeID] || []) {
			// console.log(neighbor)
			let nextNodeID = neighbor.to;
			let distToNextNode = distTo[curNodeID] + neighbor.weight;
			// 更新 dp table
			if (distTo[nextNodeID] > distToNextNode) {
				distTo[nextNodeID] = distToNextNode;
				queue.push(new State(nextNodeID, distToNextNode));
			}
		}
	}
	return distTo;
}
/* 
T1631 https://leetcode-cn.com/problems/path-with-minimum-effort/
MID
*/


/* 
T1514 https://leetcode-cn.com/problems/path-with-maximum-probability/
*/


