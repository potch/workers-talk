/* jshint esnext:true */
'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

importScripts('canvascopy.js');

function setup(api) {
  postMessage({
    type: 'rpcRegister',
    methods: _Object$keys(api)
  });
  addEventListener('message', function (e) {
    var _e$data = e.data;
    var type = _e$data.type;
    var method = _e$data.method;
    var args = _e$data.args;
    var callId = _e$data.callId;

    var error, response;
    if (type === 'rpc') {
      if (method in api) {
        try {
          response = api[method].apply(api, _toConsumableArray(args));
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