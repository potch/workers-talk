/* jshint esnext:true */

'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _promiseWorkerJs = require('./promiseWorker.js');

var logo = document.querySelector('#logo');
var inCtx = document.querySelector('#input').getContext('2d');
var outCtx = document.querySelector('#output').getContext('2d');

window.onload = function () {
  inCtx.drawImage(logo, 0, 0);
  document.querySelector('#go').addEventListener('click', resize);
};

function resize() {
  var api, embiggened;
  return _regeneratorRuntime.async(function resize$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _promiseWorkerJs.promiseWorker)('../src/resizeworker.js?' + Math.random()));

      case 2:
        api = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(api.resize(inCtx.getImageData(0, 0, 32, 32), 4096, 4096));

      case 5:
        embiggened = context$1$0.sent;

        outCtx.putImageData(embiggened, 0, 0);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}