// T171 26进制转换 https://leetcode.cn/problems/excel-sheet-column-number/ 

var titleToNumber = function (columnTitle) {
    let res = 0
    for (let i = columnTitle.length - 1; i >= 0; --i) {
        let num = columnTitle.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
        if (i === columnTitle.length - 1) {
            res += num
            continue
        }
        num = Math.pow(26, ((columnTitle.length - 1) - i)) * num
        res += num
    }
    return res
};

// T168 https://leetcode.cn/problems/excel-sheet-column-title/ 上一题的逆序

var convertToTitle = function (columnNumber) {
    let ans = [];
    while (columnNumber > 0) {
        const a0 = (columnNumber - 1) % 26 + 1;
        ans.unshift(String.fromCharCode(a0 - 1 + 'A'.charCodeAt()));
        columnNumber = Math.floor((columnNumber - a0) / 26);
    }
    return ans.join('');
};


var intersection = function (nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    const res = []
    set1.forEach(s => {
        console.log(s)
        if (set2.has(s)) {
            console.log(s)
            res.push(s)
        }
    })
    console.log(res)
    return res
};


let a = [1, 2, 3, 4, 5];


 
// 二进制求和 T67 https://leetcode.cn/problems/add-binary/description/

var addBinary = function(a, b) {
    let ans = "";
    let ca = 0;
    for(let i = a.length - 1, j = b.length - 1;i >= 0 || j >= 0; i--, j--) {
        let sum = ca;
        sum += i >= 0 ? parseInt(a[i]) : 0;
        sum += j >= 0 ? parseInt(b[j]) : 0;
        ans += sum % 2;
        ca = Math.floor(sum / 2);
    }
    ans += ca == 1 ? ca : "";
    return ans.split('').reverse().join('');
};
