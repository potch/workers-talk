/* jshint esnext:true */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _promiseWorkerJs = require('./promiseWorker.js');

function app() {
  var api, time, n, i, st;
  return _regeneratorRuntime.async(function app$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _promiseWorkerJs.promiseWorker)('worker.js?' + Math.random()));

      case 2:
        api = context$1$0.sent;
        time = 0;
        n = 0;
        i = 0;

      case 6:
        if (!(i < 10000)) {
          context$1$0.next = 15;
          break;
        }

        st = performance.now();
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(api.inc(n));

      case 10:
        n = context$1$0.sent;

        time += performance.now() - st;
        // if (i%1000===0) console.log(i);

      case 12:
        i++;
        context$1$0.next = 6;
        break;

      case 15:
        console.log(time / 100 + ' ms', n);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

console.log(navigator);
console.log(performance);

app();