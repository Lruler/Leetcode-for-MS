var checkInclusion = function (s1, s2) {
    const window = new Map();
    let l = 0,
        r = 0;

    for (let i in s1) {
        window.set(s1[i], window.has(s1[i]) ? window.get(s1[i]) + 1 : 1)
    }

    let needType = window.size;

    while (r < s2.length) {
        let c = s2[r];
        r++;
        if (window.has(c)) {
            window.set(c, window.get(c) - 1)
            if (window.get(c) == 0) needType -= 1
        }
        while (needType === 0) {
            let d = s2[l]
            if (window.has(d)) {
                let s = s2.slice(l, r)
                console.log(window, d, c, s)
                if (s.length === s1.length) return true
                else {
                    l++
                    window.set(d, window.get(d) + 1)
                    if (window.get(d) === 1) needType += 1
                }
            }
            else {
                l++
            }
        }
    }
    return false
};