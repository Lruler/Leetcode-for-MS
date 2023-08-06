// 两数之和 II - 输入有序数组
var twoSum = function (numbers, target) {
    let l = 0;
    let r = numbers.length - 1;
    let sum
    while (l < r) {
        sum = numbers[r] + numbers[l];
        if (sum == target) break
        if (sum < target) ++l
        else --r
    }
    return [l + 1, r + 1]
};