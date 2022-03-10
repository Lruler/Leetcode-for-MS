var minWindow = function (s, t) {
    let l = 0;
    let r = 0;
    let res = "";
    const m = new Map();
    for (let i = 0; i < t.length; i++) {
        const c = t[i];
        m.set(c, m.has(c) ? m.get(c) + 1 : 1);
    }
    let needType = m.size;
    while (r < s.length) {
        const c = s[r];
        if (m.has(c)) {
            // 更新字典表中的次数 - 1
            m.set(c, m.get(c) - 1);
            //  如果次数为0，证明这个字符种类在当前窗口已经集齐了，needType - 1
            if (m.get(c) === 0) needType -= 1;
        }
        // 当needType为0，证明所有需要匹配的字符都已经在当前滑动窗口中
        while (needType === 0) {
            const c2 = s[l];
            // 记录当前滑动窗口的字符
            let newRes = s.slice(l, r + 1);
            // 当新的窗口中的字符长度小于上次的字符长度时，更新结果
            // !res 是在结果值为空的时候需要更新一下第一次匹配的值
            if (!res || newRes.length < res.length) res = newRes;
            // 如果左指针移动过程中出现字典中的值,证明需要匹配的字符已经脱离了当前窗口
            if (m.has(c2)) {
                // 更新表中需要出现的次数
                m.set(c2, m.get(c2) + 1);
                // 更新needType
                if (m.get(c2) === 1) needType += 1;
            }
            l++;
        }
        r++;
    }
    return res;
};

console.log(minWindow("ADOBECODEBANC", "ABC"))