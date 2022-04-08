/* 
Promise 和 Promise实例要区分
Promise.resolve() 返回一个状态resolved的Promise实例，该方法是幂等的，也就是说 let p = Promise.resolve(); p = Promise.resolve(p)
其中 resolve只接受一个参数，他会把任何参数都封装成一个新的Promise，而如果传入的参数本身就是Promise实例，则空包装直接返回
Promise.reject() 逻辑和resolve大体相同，唯一不同的是，如果reject接受的参数是一个Promise，那不会空包装返回，会把这个Promise作为他返回
的新的rejected的Promise的值。

new Promise((resolve, reject) => {...})

Promise 的实例方法 是连接外部同步代码和Promise内部异步代码的桥梁
.then()方法返回一个新的Promise，通过Promise.resolve()来包装 then()中return语句的返回值创建新的Promise 
注: then中不传处理程序函数时，就会包装then()的上一个Promise resolve后的值，throw语句会返回一个rejected Promise
.catch()其实就是.then(null, onReject)的语法糖，也会返回一个resolve的Promise
.finally() 无论如何都会被执行，其中的onFinally函数不接受任何参数，返回一个新的Promise，他的值和状态值和他的父Promise有关
但如果return的是一个pending的Promise或者reject的Promise，那么就直接返回该Promise

Promise的异步 体现在 .then/catch/finally 会在Promise的状态落定后，把相应的处理函数推入任务队列
resolve和reject的参数就是他们对应的处理函数所能拿到的值
*/

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this.status = PENDING;

        this.value = undefined;

        this.reason = undefined;

        this.onResolvedCallbacks = [];

        this.onRejectedCallbacks = [];

        let resovle = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resovle, reject);
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        let promise2;
        if (this.status === FULFILLED) {
            return promise2 = new Promise((resovle, reject) => {
                setTimeout(() => {
                    try {
                        let result = onFulfilled(this.value);
                        resovle(result);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
        }

        if (this.status === REJECTED) {
            return promise2 = new Promise((resovle, reject) => {
                setTimeout(() => {
                    try {
                        let result = onRejected(this.reason)
                        resovle(result);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
        }

        if (this.status === PENDING) {
            return promise2 = new Promise((resovle, reject) => {
                setTimeout(() => {
                    this.onResolvedCallbacks.push(() => {
                        try {
                            let result = onFulfilled(this.value);
                            resovle(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    this.onRejectedCallbacks.push(() => {
                        try {
                            let result = onRejected(this.reason)
                            resovle(result);
                        } catch (error) {
                            reject(error);
                        }
                    });
                })
            })
        }
    }

    static resolve(data) {
        return new Promise((resolve, reject) => {
            resolve(data)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
}

Promise.prototype.catch = function (errCallback) {
    return this.then(null, errCallback)
}

Promise.prototype.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => value)
    }, (reason) => {
        return Promise.resolve(callback()).then(() => {
            throw reason
        })
    })
}

Promise.prototype.all = function (promises) {
    let results = [];
    let promiseCount = 0;
    let promisesLength = promises.length;
    return new Promise(function (resolve, reject) {
        for (let val of promises) {
            Promise.resolve(val).then(function (res) {
                promiseCount++;
                // results.push(res);
                results[i] = res;
                // 当所有函数都正确执行了，resolve输出所有返回结果。
                if (promiseCount === promisesLength) {
                    return resolve(results);
                }
            }, function (err) {
                return reject(err);
            });
        }
    });
};

Promise.race = (promiseArray) => {
    return new Promise((resolve, reject) => {
        promiseArray.forEach((item) => {
            Promise.resolve(item).then(
                (val) => {
                    resolve(val);
                },
                (reason) => {
                    reject(reason);
                }
            );
        });
    });
};





