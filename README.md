# lock-key

Javascript lock function

## Install lock-key

``` javascript
npm install lock-key
```

## Usage Example

```javascript
const Lock = require('lock-key');

const waitTimeout = util.promisify(setTimeout);
const lock = Lock.load('youkey');
try {
    await lock.lock();
    await waitTimeout(1 * 1000);
} finally {
    lock.unlock();
}
```