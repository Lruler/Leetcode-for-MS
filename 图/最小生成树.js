
/* 
Kruskal 算法 基于 UF并查集算法

最想生成树 就是图中若干边的集合 我们要保证这些边
1. 包含图中所有节点
2. 形成的结构是树结构
3. 权重和最小
*/

class UF {
    constructor(n) {
        this.count = n;
        this.parent = new Array(n);
        for (let i = 0; i < n; ++i) {
            this.parent[i] = i
        }
    }

    // 将p 与 q两个节点连通
    union(p, q) {
        let rootP = this.find(p)
        let rootQ = this.find(q)

        if (rootP === rootQ) return

        this.parent[rootQ] = rootP
        // 两个连通分量合并成一个连通分量
        this.count--
    }

    // 判断 p 和 q是否连通
    connected(p, q) {
        let rootP = this.find(p)
        let rootQ = this.find(q)
        return rootP === rootQ
    }

    // 返回节点x的连通分量根节点
    find(x) {
        while (this.parent[x] !== x) {
            // 路径压缩
            this.parent[x] = this.parent[this.parent[x]]
            x = this.parent[x]
        }
        return x
    }
}

/* 
T261 以图判树
*/
const validTree = (n, edges) => {
    const uf = new UF(n);
    for (let edge of edges) {
        let u = edge[0];
        let v = edge[1];
        if (uf.connected(u, v)) return false
        uf.union(u, v)
    }
    return uf.count === 1
}

/* 
T1135 最低成本连通所有城市
*/
const minimumCost = (n, connections) => {
    const uf = new UF(n + 1);
    connections.sort((a, b) => a[2] - b[2]);
    let mst = 0;
    for (let edge of connections) {
        let u = edge[0];
        let v = edge[1];
        let weight = edge[2];
        if (uf.connected(u, v)) continue;
        mst += weight
    }
    return uf.count == 2 ? mst : -1
}

/* 
T1584 MID https://leetcode.cn/problems/min-cost-to-connect-all-points/
连接所有点的最小费用
*/

function minCostConnectPoints(points) {
    let n = points.length
    // 生成所有边及权重
    let edges = []
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let xi = points[i][0],
                yi = points[i][1],
                xj = points[j][0],
                yj = points[j][1]
            // 用坐标点在 points 中的索引表示坐标点
            edges.push([i, j, Math.abs(xi - xj) + Math.abs(yi - yj)])
        }
    }

    // 将边按照权重从小到大排序
    edges.sort((a, b) => a[2] - b[2])
    // 执行 Kruskal 算法
    let mst = 0
    let unionFind = new UF(n)
    for (let edge of edges) {
        let u = edge[0],
            v = edge[1],
            weight = edge[2]
        // 若这条边会产生环，则不能加入 mst
        if (unionFind.connected(u, v)) {
            continue
        }
        // 若这条边不会产生环，则属于最小生成树
        mst += weight
        unionFind.union(u, v)
    }
    return mst
}


/* 
Prim 算法

*/