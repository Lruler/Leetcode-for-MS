// 函数防抖的实现
function debounce(fn, wait) {
    let timer = null;

    return function () {
        let context = this,
            args = arguments;
        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        // 设置定时器，使事件间隔指定事件后执行
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}

// 函数节流的实现; 时间戳版
function throttle(fn, delay) {
    let curTime = Date.now();

    return function () {
        let context = this,
            args = arguments,
            nowTime = Date.now();

        // 如果两次时间间隔超过了指定时间，则执行函数。
        if (nowTime - curTime >= delay) {
            curTime = Date.now();
            return fn.apply(context, args);
        }
    };
}
// 定时器版
function throttle(fn, await) {
    let timer;
    return function (...args) {
        if (timer) return;
        timer = setTimerout(() => {
                fn.apply(this, args)
                timer = null;
            },
            await)
    }
}