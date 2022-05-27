
const EventEmitter = require('events');

// const emitter = new EventEmitter();

class Logger extends EventEmitter{
    logger(msg){
        console.log(msg);
    
        this.emit('msg', {nane: 'alex',surname: 'casado',age: 31});
    }
};


module.exports = Logger;