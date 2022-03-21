/* 
https://leetcode-cn.com/problems/koko-eating-bananas/
*/

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function (piles, H) {
    // 找到最大值，确认速度区间
    let max = -Infinity;
    for (let i = 0; i < piles.length; i++) {
        max = Math.max(max, piles[i]);
    }

    // 左闭右开，[left, right)
    let left = 0;
    let right = max;

    // 二分法收敛区间
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        const midHour = costHour(piles, mid);
        if (midHour === H) {
            right = mid; // 收敛右侧边界
        } else if (midHour > H) {
            left = mid + 1;
        } else if (midHour < H) {
            right = mid;
        }
    }
    return right; // 循环终止条件为left===right， 所以这里返回left也是可以的
};

const costHour = (piles, k) => {
    let h = 0;
    for (let i = 0; i < piles.length; i++) {
        h += Math.ceil(piles[i] / k);
    }
    return h;
}
