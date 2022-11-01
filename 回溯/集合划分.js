/* 
经典回溯之 集合划分
T698 https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/
*/

var canPartitionKSubsets = function (nums, k) {

    function dfs(target, k, start) {
        // 找到满足的子集个数时候返回 true
        if (k == 0) return true;
        // 从start开始搜索nums数组
        for (let i = start; i < nums.length; i++) {
            // 剪枝：访问过的和相同元素
            if (visited[i] == 1) continue;
            if (i > 0 && nums[i] == nums[i - 1] && visited[i - 1] == 0) continue;
            // 标记为已搜索
            visited[i] = 1;
            // 找到一个子集 并 向下搜索
            if (target - nums[i] == 0 && dfs(divide, k - 1, 0)) return true
            // 减少搜索的值，并向下搜索，start = i + 1
            // 因为nums数组是排序过的，所以确保前面的值已经搜索过不需要重复搜索
            else if (target - nums[i] >= nums[i] && dfs(target - nums[i], k, i + 1)) return true;
            // 退出搜索
            visited[i] = 0;
        }
        return false;
    }
    // visited标记那些元素已经搜索过
    let visited = new Array(nums.length).fill(0),
        sum = nums.reduce((_, val) => _ + val, 0),
        divide = nums.reduce((_, val) => _ + val, 0) / k | 0;
    // 判断是否可以分成相等的 k 个子集必要条件
    if (sum % k != 0 || Math.max(...nums) > divide) return false;
    // 排序给剪枝做准备
    nums.sort((a, b) => a - b);
    // 只要能组合出 k - 1个子集即可
    return dfs(divide, k - 1, 0)
};

