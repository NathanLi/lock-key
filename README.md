# JS-Lock

Javascript lock function

## Usage Example

```javascript
const waitTimeout = util.promisify(setTimeout);
const lock = JSLock.load('lockKey');
try {
    await lock.lock();
    await waitTimeout(1 * 1000);
} finally {
    lock.unlock();
}
```