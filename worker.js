/* jshint esnext:true */

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

function increment(n) {
  return n + 1;
}

setup({
  inc: increment
});
