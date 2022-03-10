var twoSum = function (nums, target) {
    let diff = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (diff.has(target - nums[i])) {
            return [diff.get(target - nums[i]), i];
        }
        diff.set(nums[i], i);
    }
    return null;
};