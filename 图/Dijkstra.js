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

//  HeapDS {
// 	class Heap  {
// 		array[]
// 		comparator: (a, b) => number
// 		constructor(comparator = (a, b) => a - b) {
// 			this.array = []
// 			this.comparator = (a, b) => comparator(this.array[a], this.array[b])
// 		}

// 		add(value) {
// 			this.array.push(value)
// 			this.bubbleUp()
// 		}

// 		peek = () => this.array[0]

// 		remove(index = 0) {
// 			if (!this.size) return null
// 			this.swap(index, this.size - 1) // swap with last
// 			const value = this.array.pop() // remove element
// 			this.bubbleDown(index)
// 			return value
// 		}

// 		get size() {
// 			return this.array.length
// 		}

// 		bubbleUp() {
// 			let index = this.size - 1
// 			const parent = (i) => Math.ceil(i / 2 - 1)
// 			while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
// 				this.swap(parent(index), index)
// 				index = parent(index)
// 			}
// 		}

// 		bubbleDown(index = 0) {
// 			let curr = index
// 			const left = (i) => 2 * i + 1
// 			const right = (i) => 2 * i + 2
// 			const getTopChild = (i) =>
// 				right(i) < this.size && this.comparator(left(i), right(i)) > 0 ? right(i) : left(i)

// 			while (left(curr) < this.size && this.comparator(curr, getTopChild(curr)) > 0) {
// 				const next = getTopChild(curr)
// 				this.swap(curr, next)
// 				curr = next
// 			}
// 		}

// 		swap(i1, i2) {
// 			;
// 			[this.array[i1], this.array[i2]] = [this.array[i2], this.array[i1]]
// 		}
// 	}
// 	export class MaxHeap extends Heap  {
// 		constructor() {
// 			super((a, b) => b - a)
// 		}
// 	}
// 	export class MinHeap extends Heap  {
// 		constructor() {
// 			super((a, b) => a - b)
// 		}
// 	}
// 	export class PriorityQueue  extends Heap  {
// 		constructor(iterable[] = [], comparator = (a, b) => a - b) {
// 			super(comparator)
// 			Array.from(iterable).forEach((el) => this.add(el))
// 		}

// 		push = (value) => super.add(value)
// 		shift = () => super.remove()
// 	}
// }


// 二维矩阵抽象成图，我们先实现一下图的adj方法，之后的主要逻辑会清晰一些
// 方向数组，上下左右的坐标偏移量
const dirs = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
]

// 返回坐标 (x, y) 的上下左右相邻坐标
const adj = (matrix, x, y) => {
	let m = matrix.length,
		n = matrix[0].length
	// 存储相邻节点
	const neighbors = []
	for (let dir of dirs) {
		let nx = x + dir[0]
		let ny = y + dir[1]
		if (nx < 0 || ny < 0 || ny >= n || nx >= m) {
			continue // 索引越界
		}
		neighbors.push([nx, ny])
	}
	return neighbors
}
// 我们现在认为一个二维坐标(x, y)是图中的一个节点，所以这个State类也需要修改一下
class State {
	x // 矩阵中的一个位置
	y
	effortFromStart // 从起点 (0, 0) 到当前位置的最小体力消耗（距离）
	constructor(x, y, effortFromStart) {
		this.x = x
		this.y = y
		this.effortFromStart = effortFromStart
	}
}

// Dijkstra 算法，计算 (0, 0) 到 (m - 1, n - 1) 的最小体力消耗
const minimumEffortPath = (heights) => {
	return dijkstra(heights)
}

function dijkstra(heights) {
	let m = heights.length,
		n = heights[0].length
	// 定义：从 (0, 0) 到 (i, j) 的最小体力消耗是 effortTo[i][j]
	// dp table 初始化为正无穷
	let effortTo = new Array(m)
		.fill(0)
		.map((v) => new Array(n).fill(Number.MAX_VALUE))
	// base case，起点到起点的最小消耗就是 0
	effortTo[0][0] = 0

	// 优先级队列，effortFromStart 较小的排在前面
	const basedArr = []
	let pq = new HeapDS.PriorityQueue(basedArr, (a, b) => a.effortFromStart - b.effortFromStart)
	// 从起点 (0, 0) 开始进行 BFS
	pq.push(new State(0, 0, 0))

	while (pq.size !== 0) {
		let curState = pq.shift()
		let curX = curState.x
		let curY = curState.y
		let curEffortFromStart = curState.effortFromStart

		if (curX == m - 1 && curY == n - 1) {
			// 到达终点提前结束
			return curEffortFromStart
		}

		if (curEffortFromStart > effortTo[curX][curY]) {
			// 已经有一条更短的路径到达 curNode 节点了
			continue
		}
		// 将 (curX, curY) 的相邻坐标装入队列
		for (let neighbor of adj(heights, curX, curY)) {
			let nextX = neighbor[0]
			let nextY = neighbor[1]
			// 计算从 (curX, curY) 达到 (nextX, nextY) 的消耗
			let effortToNextNode = Math.max(
				effortTo[curX][curY],
				Math.abs(heights[curX][curY] - heights[nextX][nextY])
			)
			// 更新 dp table
			if (effortTo[nextX][nextY] > effortToNextNode) {
				effortTo[nextX][nextY] = effortToNextNode
				pq.push(new State(nextX, nextY, effortToNextNode))
			}
		}
	}
	// 正常情况不会达到这个 return
	return -1
}



/* 
T1514 https://leetcode-cn.com/problems/path-with-maximum-probability/
*/

	function maxProbability(
		n,
		edges,
		succProb,
		start,
		end
	) {
		let graph = new Array(n).fill(0).map((v) => [])
		// 构造邻接表结构表示图
		for (let i = 0; i < edges.length; i++) {
			let from = edges[i][0]
			let to = edges[i][1]
			let weight = succProb[i]
			// 无向图就是双向图；先把 int 统一转成 double，待会再转回来
			graph[from].push([to, weight])
			graph[to].push([from, weight])
		}

		return dijkstra(start, end, graph)
	}

	class State {
		// 图节点的 id
		id
		// 从 start 节点到达当前节点的概率
		probFromStart

		constructor(id, probFromStart) {
			this.id = id
			this.probFromStart = probFromStart
		}
	}

	function dijkstra(start, end, graph) {
		// 定义：probTo[i] 的值就是节点 start 到达节点 i 的最大概率
		let probTo = new Array(graph.length).fill(-1)
		// dp table 初始化为一个取不到的最小值
		// base case，start 到 start 的概率就是 1
		probTo[start] = 1

		// 优先级队列，probFromStart 较大的排在前面
		const basedArr = []
		let pq = new HeapDS.PriorityQueue(basedArr, (a, b) => b.probFromStart - a.probFromStart)
		// 从起点 start 开始进行 BFS
		pq.push(new State(start, 1))

		while (pq.size !== 0) {
			let curState = pq.shift()
			let curNodeID = curState.id
			let curProbFromStart = curState.probFromStart

			// 遇到终点提前返回
			if (curNodeID == end) {
				return curProbFromStart
			}

			if (curProbFromStart < probTo[curNodeID]) {
				// 已经有一条概率更大的路径到达 curNode 节点了
				continue
			}
			// 将 curNode 的相邻节点装入队列
			for (let neighbor of graph[curNodeID]) {
				let nextNodeID = neighbor[0]
				// 看看从 curNode 达到 nextNode 的概率是否会更大
				let probToNextNode = probTo[curNodeID] * neighbor[1]
				if (probTo[nextNodeID] < probToNextNode) {
					probTo[nextNodeID] = probToNextNode
					pq.push(new State(nextNodeID, probToNextNode))
				}
			}
		}
		// 如果到达这里，说明从 start 开始无法到达 end，返回 0
		return 0
	}


class Heap  {
	array
	comparator
	constructor(comparator = (a, b) => a - b) {
		this.array = []
		this.comparator = (a, b) => comparator(this.array[a], this.array[b])
	}

	add(value) {
		this.array.push(value)
		this.bubbleUp()
	}

	peek = () => this.array[0]

	remove(index = 0) {
		if (!this.size) return null
		this.swap(index, this.size - 1) // swap with last
		const value = this.array.pop() // remove element
		this.bubbleDown(index)
		return value
	}

	get size() {
		return this.array.length
	}

	bubbleUp() {
		let index = this.size - 1
		const parent = (i) => Math.ceil(i / 2 - 1)
		while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
			this.swap(parent(index), index)
			index = parent(index)
		}
	}

	bubbleDown(index = 0) {
		let curr = index
		const left = (i) => 2 * i + 1
		const right = (i) => 2 * i + 2
		const getTopChild = (i) =>
			right(i) < this.size && this.comparator(left(i), right(i)) > 0 ? right(i) : left(i)

		while (left(curr) < this.size && this.comparator(curr, getTopChild(curr)) > 0) {
			const next = getTopChild(curr)
			this.swap(curr, next)
			curr = next
		}
	}

	swap(i1, i2) {
		[this.array[i1], this.array[i2]] = [this.array[i2], this.array[i1]]
	}
}
export class MaxHeap extends Heap  {
	constructor() {
		super((a, b) => b - a)
	}
}
export class MinHeap extends Heap  {
	constructor() {
		super((a, b) => a - b)
	}
}
export class PriorityQueue  extends Heap  {
	constructor(iterable = [], comparator = (a, b) => a - b) {
		super(comparator)
		Array.from(iterable).forEach((el) => this.add(el))
	}

	push = (value) => super.add(value)
	shift = () => super.remove()
}

