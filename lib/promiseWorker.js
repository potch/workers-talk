/* jshint esnext: true */
'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.promiseWorker = promiseWorker;

function promiseWorker(url) {
  var self = this;
  var w = new Worker(url);
  var callId = 0;
  var promises = {};
  var api = {};

  function registerRPC(method) {
    api[method] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var cId = ++callId;
      w.postMessage({
        type: 'rpc',
        method: method,
        args: args,
        callId: cId
      });
      return new _Promise(function (resolve, reject) {
        promises[cId] = {
          resolve: resolve,
          reject: reject
        };
      });
    };
  }

  w.addEventListener('message', function (e) {
    var msg = e.data;
    if (msg.type === 'rpcResponse') {
      var p = promises[msg.callId];
      if (p) {
        if (msg.error) {
          p.reject(msg.error);
        } else {
          p.resolve(msg.response);
        }
      }
    }
  });

  return new _Promise(function (resolve, reject) {
    w.addEventListener('message', function (e) {
      var msg = e.data;
      if (msg && msg.type === 'rpcRegister' && msg.methods instanceof Array) {
        msg.methods.forEach(registerRPC);
        resolve(api);
      }
    });
  });
}