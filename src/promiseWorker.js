/* jshint esnext: true */
export function promiseWorker(url) {
  var self = this;
  var w = new Worker(url);
  var callId = 0;
  var promises = {};
  var api = {};

  function registerRPC(method) {
    api[method] = function(...args) {
      var cId = ++callId;
      w.postMessage({
        type: 'rpc',
        method: method,
        args: args,
        callId: cId
      });
      return new Promise(function (resolve, reject) {
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

  return new Promise(function (resolve, reject) {
    w.addEventListener('message', function (e) {
      var msg = e.data;
      if (msg && msg.type === 'rpcRegister' && msg.methods instanceof Array) {
        msg.methods.forEach(registerRPC);
        resolve(api);
      }
    });
  });
}
