// T22 Mid https://leetcode-cn.com/problems/generate-parentheses/


var generateParenthesis = function (n) {
    if (n == 0) return [];
    let res = [];
    let track = '';
    back(n, n, track)

    function back(left, right, track) {
        // 若左括号剩下的多，说明不合法
        if (right < left) return;
        // 数量小于 0 肯定是不合法的
        if (left < 0 || right < 0) return;
        // 当所有括号都恰好用完时，得到一个合法的括号组合
        if (left == 0 && right == 0) {
            res.push(track);
            return;
        }
        track += "("
        back(left - 1, right, track)
        track = track.slice(0, track.length - 1)
        track += ")"
        back(left, right - 1, track)
        track = track.slice(0, track.length - 1)
    }
    return res
};