/* 
dfs 和 回溯 思路很像  选择某一个方向往深度遍历 到底部之后 回到“根节点” 再选择其他方向
所以 解决回溯问题 实际上就是决策树的遍历过程
回溯要注意 3 个问题

1. 路径: 就是做出的选择 2. 选择列表: 当前可以做的选择 3. 结束条件 到达决策树的底层 

代码框架

result = [];
const backtrack = (path(路径), choice(选择列表)) => {
    if 满足结束条件 result.push(路径) return

    for 选择 in 选择列表
        做选择
        backtrack(路径， 选择列表)
        撤销选择
}   
*/

// https://leetcode-cn.com/problems/permutations/
//T46 排列
var permute = function (nums) {
    const res = []
    const backtrack = (path) => {
        if (path.length === nums.length) {
            res.push(path)
            return
        }
        nums.forEach(n => {
            if (path.includes(n)) return;
            backtrack(path.concat(n))
        })
    }
    backtrack([])
    return res
};

// https://leetcode-cn.com/problems/combinations/
// 组合
const combine = (n, k) => {
    let comb = new Array(k)
    let ans = []
    let count = 0;
    const back = (ans, comb, count, pos) => {
        if (count === k) {
            ans.push([...comb])
            return
        }
        for (let i = pos; i <= n; ++i) {
            comb[count++] = i
            back(ans, comb, count, i + 1);
            --count;
        }
    }
    back(ans, comb, count, 1)
    return ans
}

// https://leetcode-cn.com/problems/word-search/
// T79 单词搜索 一个二维回溯 比较复杂 要考虑边界问题
var exist = function (board, word) {
    const h = board.length,
        w = board[0].length;
    // 规范边界
    const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];
    // 构造路径
    const visited = new Array(h);
    for (let i = 0; i < visited.length; ++i) {
        visited[i] = new Array(w).fill(false);
    }
    const check = (i, j, s, k) => {
        // 种植条件
        if (board[i][j] != s.charAt(k)) {
            return false;
        } else if (k == s.length - 1) {
            return true;
        }
        visited[i][j] = true;
        let result = false;
        for (const [dx, dy] of directions) {
            let newi = i + dx,
                newj = j + dy;
            if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
                if (!visited[newi][newj]) {
                    const flag = check(newi, newj, s, k + 1);
                    if (flag) {
                        result = true;
                        break;
                    }
                }
            }
        }
        visited[i][j] = false;
        return result;
    }

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const flag = check(i, j, word, 0);
            if (flag) {
                return true;
            }
        }
    }
    return false;
};

// 51 N皇后问题
var solveNQueens = function (n) {
    function isValid(row, col, chessBoard, n) {
        //不用判断同一行的因为回溯就是在同一行不同列放置皇后
        for (let i = 0; i < row; i++) {
            // 同一列的判断
            if (chessBoard[i][col] === 'Q') {
                return false
            }
        }
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            // 135度斜角判断 左上斜线 不需要判断下面的
            if (chessBoard[i][j] === 'Q') {
                return false
            }
        }
        // 45度斜角判断 右上斜线 不需要判断下面的
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (chessBoard[i][j] === 'Q') {
                return false
            }
        }
        return true
    }

    function transformChessBoard(chessBoard) {
        // 转换一下输出
        let chessBoardBack = []
        chessBoard.forEach(row => {
            let rowStr = ''
            row.forEach(value => {
                rowStr += value
            })
            chessBoardBack.push(rowStr)
        })

        return chessBoardBack
    }

    let result = []

    function backtracing(row, chessBoard) {
        if (row === n) {
            // 最后一行 能放下了就已经算成功了
            result.push(transformChessBoard(chessBoard))
            return
        }
        for (let col = 0; col < n; col++) {
            // 遍历列 回溯行
            if (isValid(row, col, chessBoard, n)) {
                chessBoard[row][col] = 'Q'
                backtracing(row + 1, chessBoard)
                chessBoard[row][col] = '.'
            }
        }
    }
    let chessBoard = Array.from(new Array(n), () => new Array(n).fill('.'))
    backtracing(0, chessBoard)
    return result
};


/* 
T47 mid https://leetcode-cn.com/problems/permutations-ii/submissions/
全排列II 存在相同数字进行全排
*/
var permuteUnique = function (nums) {
    const ans = [];
    const vis = new Array(nums.length).fill(false);
    const backtrack = (idx, perm) => {
        if (idx === nums.length) {
            ans.push(perm.slice());
            return;
        }
        for (let i = 0; i < nums.length; ++i) {
            if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
                continue;
            }
            perm.push(nums[i]);
            vis[i] = true;
            backtrack(idx + 1, perm);
            vis[i] = false;
            perm.pop();
        }
    }
    nums.sort((x, y) => x - y);
    backtrack(0, []);
    return ans;
};


/* 
注意！！！ 上一题和下一题 都设计到一个去重问题！ 回溯问题我们可以抽象成一个树，那就要考虑是树枝去重还是树层去重，题目都是最后返回的答案
不能有重复，那么很明显就是树层去重
解决方法就是声明一个bool used数组 来判断去重！ 这就是上面 i > 0 && nums[i] === nums[i - 1] && !vis[i - 1] 的意义！
*/


/* 
组合总和四部曲
I. https://leetcode-cn.com/problems/combination-sum/submissions/
II. https://leetcode-cn.com/problems/combination-sum-ii/solution/jshui-su-by-prefixa-l5xm/
III. https://leetcode-cn.com/problems/combination-sum-iii/
IV. https://leetcode-cn.com/problems/combination-sum-iv/
*/

// I 找出总和 可以无限取元素 不能有重复组合
let combinationSum = (nums, target) => {
    let res = [];
    let dfs = (idx, path, t) => {
        if (t <= 0) {
            if (t === 0) res.push([...path]);
            return;
        }
        for (let i = idx; i < nums.length; i++) {
            path.push(nums[i]);
            dfs(i, path, t - nums[i]);
            path.pop();
        }
    }
    dfs(0, [], target);
    return res;
}

// II 找出总和 每个元素只能一次 不能有重复组合 
let combinationSum2 = function (candidates, target) {
    let res = [];
    candidates.sort((a, b) => a - b);
    const vis = new Array(candidates.length).fill(false)
    const backtrack = (path, target, idx) => {
        if (target <= 0) {
            if (target == 0) res.push(path.slice());
            return
        }
        for (let i = idx; i < candidates.length; ++i) {
            if (vis[i] || (i > 0 && candidates[i] === candidates[i - 1] && !vis[i - 1])) {
                continue
            }
            vis[i] = true
            target = target - candidates[i]
            path.push(candidates[i])
            backtrack(path, target, i + 1)
             target = target + candidates[i]
            path.pop(candidates[i])
            vis[i] = false
        }
    }
    backtrack([], target, 0)

    return res;
};

// III 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：范围为 1 - 9，每个数字最多一次

var combinationSum3 = function (k, n) {
    let res = [];

    const backtark = (path, target, idx) => {
        if (path.length > k) return
        if (target < 0) return
        if (target === 0 && path.length === k) {
            res.push(path.slice());
            return
        }

        for (let i = idx; i < 10; i++) {
            target = target - i
            path.push(i)
            backtark(path, target, i + 1)
            target = target + i
            path.pop()
        }
    }
    backtark([], n, 1)
    return res
};

// IV DP ???
var combinationSum4 = function (nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (num <= i) {
                dp[i] += dp[i - num];
            }
        }
    }
    return dp[target];
};



/* 
T78 https://leetcode-cn.com/problems/subsets/
求子集
*/
var subsets = function (nums) {
    const res = []
    const backtrack = (path, l, start) => {
        if (path.length === l) {
            res.push(path)
            return
        }
        for (let i = start; i < nums.length; i++) {
            backtrack(path.concat(nums[i]), l, i + 1)
        }
    }
    for (let i = 0; i <= nums.length; i++) {
        backtrack([], i, 0)
    }
    return res
};

/* 
T90 https://leetcode-cn.com/problems/subsets-ii/
子集II 有重复元素
*/
var subsetsWithDup = function (nums) {

    nums.sort((a, b) => a - b);
    let res = [];
    let path = [];
    backtrack(nums, 0);

    function backtrack(nums, start) {
        res.push([...path])
        for (let i = start; i < nums.length; ++i) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            path.push(nums[i])
            backtrack(nums, i + 1)
            path.pop()
        }
    }
    return res;
};


/* 
T93  MID https://leetcode-cn.com/problems/restore-ip-addresses/
寻找合法I
*/

var restoreIpAddresses = function (s) {
    const SEG_COUNT = 4;
    const segments = new Array(SEG_COUNT);
    const ans = [];

    const dfs = (s, segId, segStart) => {
        // 如果找到了 4 段 IP 地址并且遍历完了字符串，那么就是一种答案
        if (segId === SEG_COUNT) {
            if (segStart === s.length) {
                ans.push(segments.join('.'));
            }
            return;
        }

        // 如果还没有找到 4 段 IP 地址就已经遍历完了字符串，那么提前回溯
        if (segStart === s.length) {
            return;
        }

        // 由于不能有前导零，如果当前数字为 0，那么这一段 IP 地址只能为 0
        if (s.charAt(segStart) === '0') {
            segments[segId] = 0;
            dfs(s, segId + 1, segStart + 1);
        }

        // 一般情况，枚举每一种可能性并递归
        let addr = 0;
        for (let segEnd = segStart; segEnd < s.length; ++segEnd) {
            addr = addr * 10 + (s.charAt(segEnd) - '0');
            if (addr > 0 && addr <= 0xFF) {
                segments[segId] = addr;
                dfs(s, segId + 1, segEnd + 1);
            } else {
                break;
            }
        }
    }

    dfs(s, 0, 0);
    return ans;
};