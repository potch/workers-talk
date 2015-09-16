
function genJsonString() {
  var s = '';
  var depth = 0;
  var branchy = Math.random() / 3;

  function str() {
    s += '"' + (Math.random() * 0x10000000 | 0).toString(16) + '"';
  }

  function randomVal() {
    var i = Math.random() * 10;
    if (i < 2) {
      s += Math.random() > 0.5;
    } else if (i < 4) {
      s += Math.random() * 1e20;
    } else if (i < 6) {
      str();
    } else if (i < 8) {
      if (depth < 10) {
        obj();
      } else {
        randomVal();
      }
    } else {
      if (depth < 10) {
        arr();
      } else {
        randomVal();
      }
    }
  }

  function obj() {
    depth++;
    s += '{';
    var len = 0;
    while (true) {
      str();
      s += ':';
      randomVal();
      len++;
      if ((depth > 1 && Math.random() < branchy) || len > 1e5 || s.length > 1e6) {
        break;
      }
      s += ',';
    }
    s += '}';
    depth--;
  }

  function arr() {
    depth++;
    s += '[';
    var len = 0;
    while (true) {
      randomVal();
      len++;
      if (Math.random() < branchy || len > 1e5 || s.length > 1e6) {
        break;
      }
      s += ',';
    }
    s += ']';
    depth--;
  }

  obj();

  return s;
}

var trials = 100;
var n = 0;
var time = 0;
var length = 0;

function trial() {
  n++;
  var s = genJsonString();
  length += s.length;
  var start = Date.now();
  JSON.parse(s);
  var total = Date.now() - start;
  time += total;
  console.log(n, s.length, total);
  if (n >= trials) {
    done();
  } else {
    setTimeout(trial, 0);
  }
}

trial();

function done() {
  console.log(length + ' parsed in ' + time + 'ms (avg ' + ((time/(length/1000))*100|0)/100 + 'ms/k) (avg length ' + (length / trials |0) + ')');
}
