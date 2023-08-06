class Scheduler {
    constructor(limit) {
        this.limit = limit;
        this.count = 0;
        this.waiting = [];
    }

    async addAsyncTask(task) {
        if (this.count >= this.limit) await new Promise((resolve) => this.waiting.push(resolve));

        // 执行一个
        this.count++;
        let res = await task();
        this.count--;

        if (this.waiting.length) {
            this.waiting.shift()();
        }
        return res;
    }
}

const scheduler = new Scheduler(1);

const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const addTask = (time,order) => {
    scheduler.addAsyncTask(() => timeout(time)).then(()=>console.log(order))
    //scheduler.add(() => timeout(time)) 参数是一个promise,返回一个promise
}