/* 
岛屿问题的核心考点就是 用DFS / BFS 遍历二维数组
可以看框架
// 方向数组，分别代表上、下、左、右
int[][] dirs = new int[][]{{-1,0}, {1,0}, {0,-1}, {0,1}};
void dfs(int[][] grid, int i, int j, boolean[] visited) {
    int m = grid.length, n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n) {
        // 超出索引边界
        return;
    }
    if (visited[i][j]) {
        // 已遍历过 (i, j)
        return;
    }

    // 进入节点 (i, j)
    visited[i][j] = true;
    // 递归遍历上下左右的节点
    for (int[] d : dirs) {
        int next_i = i + d[0];
        int next_j = j + d[1];
        dfs(grid, next_i, next_j, visited);
    }
    // 离开节点 (i, j)
}
*/


// T200 MID https://leetcode.cn/problems/number-of-islands/

const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const numIsLands = (grid) => {
    let res = 0;
    let m = grid.length, n = grid[0].length;

    const dfs = (grid, i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n) return
        if (grid[i][j] == '0') return

        grid[i][j] = '0';
        for (let dir of dirs) {
            dfs(grid, i + dir[0], j + dir[1])
        }
    }

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] == '1') {
                res++
                dfs(grid, i, j)
            }
        }
    }
    return res
}



// T1254 MID https://leetcode.cn/problems/number-of-closed-islands/
var closedIsland = function (grid) {
    let res = 0;
    let m = grid.length,
        n = grid[0].length;
    const dfs = (grid, i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n) return
        if (grid[i][j] == 1) return

        grid[i][j] = 1;
        for (let dir of dirs) {
            dfs(grid, i + dir[0], j + dir[1])
        }
    }
    // 提前把靠边的岛屿淹没
    for (let j = 0; j < n; ++j) {
        dfs(grid, 0, j)
        dfs(grid, m - 1, j)
    }
    for (let i = 0; i < m; ++i) {
        dfs(grid, i, 0)
        dfs(grid, i, n - 1)
    }

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] == 0) {
                res++
                dfs(grid, i, j)
            }
        }
    }
    return res
};

// T1020 MID https://leetcode.cn/problems/number-of-enclaves/

var numEnclaves = function (grid) {
    let res = 0;
    let m = grid.length,
        n = grid[0].length;
    const dfs = (grid, i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n) return
        if (grid[i][j] == 0) return

        grid[i][j] = 0;
        for (let dir of dirs) {
            dfs(grid, i + dir[0], j + dir[1])
        }
    }
    // 提前把靠边的岛屿淹没
    for (let j = 0; j < n; ++j) {
        dfs(grid, 0, j)
        dfs(grid, m - 1, j)
    }
    for (let i = 0; i < m; ++i) {
        dfs(grid, i, 0)
        dfs(grid, i, n - 1)
    }

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] == 1) {
                res += 1
            }
        }
    }
    return res
};

// T695 MID https://leetcode.cn/problems/max-area-of-island/

var maxAreaOfIsland = function (grid) {
    let res = 0;
    let m = grid.length,
        n = grid[0].length;

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] == 1) {
                res = Math.max(res, dfs(grid, i, j))
            }
        }
    }

    function dfs(grid, i, j) {
        if (i < 0 || j < 0 || i >= m || j >= n) return 0
        if (grid[i][j] == 0) return 0

        grid[i][j] = 0;

        return dfs(grid, i + 1, j) +
            dfs(grid, i, j + 1) +
            dfs(grid, i - 1, j) +
            dfs(grid, i, j - 1) + 1;
    }
    return res
}


// T1905 MID https://leetcode.cn/problems/count-sub-islands/   思路和封闭岛屿差不多 先排除不是 再dfs
var countSubIslands = function (grid1, grid2) {
    let m = grid1.length,
        n = grid1[0].length;
    // 淹掉不是子岛的岛屿
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid1[i][j] == 0 && grid2[i][j] == 1) {
                // 不是子岛屿 直接淹
                dfs(grid2, i, j)
            }
        }
    }
    let res = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid2[i][j] == 1) {
                res++;
                dfs(grid2, i, j);
            }
        }
    }

    function dfs(grid, i, j) {
        if (i < 0 || j < 0 || i >= m || j >= n) {
            return;
        }
        if (grid[i][j] == 0) {
            return;
        }

        grid[i][j] = 0;
        dfs(grid, i + 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i - 1, j);
        dfs(grid, i, j - 1);
    }
    return res
};

// T694