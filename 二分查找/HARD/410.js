/* 
使…… 最大值尽可能小」 是二分搜索题目常见的问法
将数组分割为 mm 段， 求……」 是动态规划题目常见的问法。
https://leetcode-cn.com/problems/split-array-largest-sum/
T410 HARD 分割数组最大值

其实  如果算法中存在有序的线性查找 比如

// func(i) 是 i 的单调函数（递增递减都可以）
int func(int i);

// 形如这种 for 循环可以用二分查找技巧优化效率
for (int i = 0; i < n; i++) {
    if (func(i) == target)
        return i;
}

就可以使用二分查找优化
这题逆向思维

判断 当最大值最小的时候 分成的子数组是否满足题意
*/

var splitArray = function (nums, m) {
    const calcN = (mid, nums) => {
        let sum = 0,
            n = 1;
        for (let num of nums) {
            sum += num;
            if (sum > mid) {
                n++;
                sum = num;
            }
        }
        return n;
    }
    let left = Math.max(...nums),
        right = nums.reduce((prev, num) => prev += num, 0);
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (calcN(mid, nums) <= m) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return left;
};