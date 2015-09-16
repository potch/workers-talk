/* jshint esnext:true */
importScripts('canvascopy.js');

function setup(api) {
  postMessage({
    type: 'rpcRegister',
    methods: Object.keys(api)
  });
  addEventListener('message', function (e) {
    var {type, method, args, callId} = e.data;
    var error, response;
    if (type === 'rpc') {
      if (method in api) {
        try {
          response = api[method](...args);
        } catch (err) {
          error = err;
        }
        postMessage({
          type: 'rpcResponse',
          callId: callId,
          response: response,
          error: error
        });
      }
    }
  });
}

setup({
  resize: copyBicubic
});
