/* jshint esnext:true */

import {promiseWorker} from './promiseWorker.js';

var logo = document.querySelector('#logo');
var inCtx = document.querySelector('#input').getContext('2d');
var outCtx = document.querySelector('#output').getContext('2d');

window.onload = function () {
  inCtx.drawImage(logo, 0, 0);
  document.querySelector('#go').addEventListener('click', resize);
};

async function resize() {
  var api = await promiseWorker('../src/resizeworker.js?' + Math.random());
  var embiggened = await api.resize(inCtx.getImageData(0, 0, 32, 32), 4096, 4096);
  outCtx.putImageData(embiggened, 0, 0);
}
