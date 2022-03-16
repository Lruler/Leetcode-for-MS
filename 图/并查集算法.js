// https://labuladong.gitee.io/algo/2/20/40/


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
T323 MID
无向图中连通分量的数目 要VIP
*/

const countComponents = (n, edges) => {
    const uf = new UF(n)

    for (let e of edges) {
        uf.union(e[0], e[1])
    }

    return uf.count
}

countComponents(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4]
])


/* 

T130 MID https://leetcode-cn.com/problems/surrounded-regions/
两种思路
1. DFS 把所有和边界相邻的o先用#代替，然后遍历把剩下的o变成X，再把#恢复成o
2. 所有的边界o设置一个共同祖先dummy 则所有边界o包括与他们相邻的o就是一个连通图 把不与他们连通的全都变成x即可

注意 二维坐标(x, y)转成一维  使用 (x * n) + y, n 是列数
*/

const solve = (board) => {
    if (board.length === 0) return;

    let m = board.length;
    let n = board[0].length;
    // +1 是留给dummy
    const uf = new UF(m * n + 1);
    let dummy = m * n;
    // 将首列和末列的 O 与 dummy 连通
    for (let i = 0; i < m; i++) {
        if (board[i][0] == 'O')
            uf.union(i * n, dummy);
        if (board[i][n - 1] == 'O')
            uf.union(i * n + n - 1, dummy);
    }
    // 将首行和末行的 O 与 dummy 连通
    for (let j = 0; j < n; j++) {
        if (board[0][j] == 'O')
            uf.union(j, dummy);
        if (board[m - 1][j] == 'O')
            uf.union(n * (m - 1) + j, dummy);
    }
    // 二维中常考虑的边界
    let d = [[1, 0], [0, 1], [0, -1], [-1, 0]]
        for (let i = 1; i < m - 1; i++)
            for (let j = 1; j < n - 1; j++)
                if (board[i][j] == 'O')
                    // 将此 O 与上下左右的 O 连通
                    for (let k = 0; k < 4; k++) {
                        let x = i + d[k][0];
                        let y = j + d[k][1];
                        if (board[x][y] == 'O')
                            uf.union(x * n + y, i * n + j);
                    }
        // 所有不和 dummy 连通的 O，都要被替换
        for (let i = 1; i < m - 1; i++)
            for (let j = 1; j < n - 1; j++)
                if (!uf.connected(dummy, i * n + j))
                    board[i][j] = 'X';
    
    return board
}

/* 
T990 MID https://leetcode-cn.com/problems/satisfiability-of-equality-equations/
*/

var equationsPossible = function (equations) {
    let uf = new UF(26);
    for (let i = 0; i < equations.length; i++) {
        if (equations[i][1] == '=') {
            uf.union(equations[i].charCodeAt(0) - 97, equations[i].charCodeAt(3) - 97);
            //console.log(equations[1],UF.count);
        }
    }
    for (let i = 0; i < equations.length; i++) {
        if (equations[i][1] == '!') {
            if (uf.connected(equations[i].charCodeAt(0) - 97, equations[i].charCodeAt(3) - 97)) {
                return false;
            }
        }
    }
    return true;
};
