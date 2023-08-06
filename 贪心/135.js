// 分发糖果
var candy = function (ratings) {
    const len = ratings.length
    let candies = Array(len).fill(1);
    for (let i = 1; i < len; ++i) {
        if (ratings[i - 1] < ratings[i]) candies[i] = candies[i - 1] + 1
    }
    for (let i = len - 1; i > 0; --i) {
        if (ratings[i] < ratings[i - 1]) candies[i - 1] = Math.max(candies[i - 1], candies[i] + 1)
    }
    return candies.reduce(((a, b) => a + b))
};