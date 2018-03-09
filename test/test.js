const JSLock = require('../lib/index.js');
const util = require('util');

const waitTimeout = util.promisify(setTimeout);

let count = 0;

async function lockTime(interval) {
    const index = ++count;
    console.log(`Start ${index} Time: `, new Date());
    const lock = JSLock.load('roomId'); 

    try {
        await lock.lock();
        await waitTimeout(interval);

        console.log(`${index} End: `, new Date());
    } finally {
        lock.unlock();
    }

    /**
     * 
     case2: 
       
     lock.lock()
        .then(() => waitTimeout(interval))
        .then(() => {
            
            console.log(new Date());
            lock.unlock();
            
        }).catch(err => {
            throw err;
            lock.unlock();
        });
     */
}

(() => {
    lockTime(1 * 1000).then();
    lockTime(2 * 1000).then();
})();

