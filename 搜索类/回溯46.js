// https://leetcode-cn.com/problems/permutations/
// 排列
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

// 第79题 一个二维回溯 类似于八皇后了都 写不动了

// 51 N皇后问题 漂亮 先不看了

