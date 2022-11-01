// reduce
//语法 array.reduce(function(prev, currentValue, currentIndex, arr), initialValue)
Array.prototype.MyReduce = function (fn, initialValue) {
    //浅拷贝数组  
    var arr = Array.prototype.slice.call(this);
    //注意: reduce() 对于空数组是不会执行回调函数的。
    if (!arr.length) {
        return
    }
    var res; //res(是上面的prev) 
    //默认初始值  
    res = initialValue ? initialValue : arr[0];
    //遍历数组的每一个值  
    for (var i = 0; i < arr.length; i++) {
        //每一个值都会在该方法中被（加工处理），  
        res = fn.call(null, res, arr[i], i, this);
    }
    //最后的返回值
    return res
}


// filter
Array.prototype._filter = function (fn) {
    if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        fn(this[i]) && res.push(this[i]);
    }
    return res;
}

// map
Array.prototype._map = function (fn) {
    if (typeof fn !== "function") {
        throw Error('参数必须是一个函数');
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
        res.push(fn(this[i]));
    }
    return res;
}


// flat
// 递归实现
function _flat(arr, depth) {
    if (!Array.isArray(arr) || depth <= 0) {
        return arr;
    }
    return arr.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
            return prev.concat(_flat(cur, depth - 1))
        } else {
            return prev.concat(cur);
        }
    }, []);
}

// reduce实现
function flatten(arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}
// 。。。实现
function flatten(arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

// toString
function flatten(arr) {
    return arr.toString().split(',');
}

//求数组深度
const arrayDepth = function (arr) {
    let count = 0;
    let res = [];

    const help = function (arr, dep) {
        for (let val of arr) {
            if (val instanceof Array) {
                help(val, dep + 1);
            } else {
                res.push(val);
                count = Math.max(count, dep)
            }
        }
    }

    help(arr, 1);
    return count;
}