class PromiseCBS {
    constructor(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
};

class JSLock {
    /**
     * Load a Lock
     * @param  {String} key Lock name
     * @return {JSLock}
     */
    static load(key) {
        const map = JSLock._cacheLocks;
        const lock = map.get(key) || (new JSLock(key));

        if (!map.has(key)) {
            map.set(key, lock);
        }

        return lock;
    }

    constructor(key) {
        this.key = key;
        this.lockPromiseCBS = [];
        this.index = 0;
    }
    
    /**
     * Lock
     *  
     * You should unlock once always.
     * @return {Promise<void>}
     */
    lock() {
        this.index = this.index + 1;

        if (this.index == 1) {
            return Promise.resolve();
        }
        
        const promise = new Promise((resolve, reject) => {
            this.lockPromiseCBS.push(new PromiseCBS(resolve, reject));
        });
        return promise;
    }

    /**
     * unlock
     * @return {void}
     */
    unlock() {
        this.index = Math.max(this.index - 1, 0);

        if (this.lockPromiseCBS.length == 0) {
            return;
        }

        const cbs = this.lockPromiseCBS.shift();
        cbs.resolve();
    }
};

JSLock._cacheLocks = new Map();

module.exports = JSLock;