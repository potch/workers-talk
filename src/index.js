/* jshint esnext:true */

import {promiseWorker} from './promiseWorker.js';

async function app() {
  var api = await promiseWorker('worker.js?' + Math.random());
  var time = 0;
  var n = 0;
  for (var i = 0; i < 10000; i++) {
    var st = performance.now();
    n = await api.inc(n);
    time += performance.now() - st;
    // if (i%1000===0) console.log(i);
  }
  console.log((time / 100) + ' ms', n);
}

console.log(navigator);
console.log(performance);

app();
