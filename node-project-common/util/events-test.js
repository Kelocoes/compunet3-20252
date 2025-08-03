const EventEmitter = require('events');
const emitterObj = new EventEmitter();

emitterObj.on('event1', (message) => {
    console.log(`Event 1 triggered with message: ${message}`);
    });

// Making a noise when an event is emitted - signalling
emitterObj.emit('event1', 'Hello World!');