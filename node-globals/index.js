// console.log(window);
// console.log(window.innerWidth);
// console.log(window.innerHeight);

console.log(global.setTimeout(() => {
    console.log('Testing setTimeout in node-globals/index.js');
}, 0));

global.queueMicrotask(() => {
    console.log('Running inside a microtask');
});


let count = 0;
const intervalId = global.setInterval(() => {
    console.log('Running inside a timed interval');
    count++;
    if (count === 5) {
        global.clearInterval(intervalId);
        console.log('Interval cleared after 5 executions');
    }
}, 1000);

global.myGlobalVariable = 'This is a global variable';
console.log(global);

console.log('Running after setTimeout')