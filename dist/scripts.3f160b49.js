// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules\\parcel-bundler\\src\\builtins\\css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules\\parcel-bundler\\src\\builtins\\bundle-url.js"}],"src\\styles\\button.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules\\parcel-bundler\\src\\builtins\\css-loader.js"}],"src\\styles\\main.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./button.css":"src\\styles\\button.css","./..\\images\\grass.png":[["grass.6e0c3df2.png","src\\images\\grass.png"],"src\\images\\grass.png"],"_css_loader":"node_modules\\parcel-bundler\\src\\builtins\\css-loader.js"}],"src\\images\\mole.png":[function(require,module,exports) {
module.exports = "/mole.5cbe5579.png";
},{}],"src\\scripts\\utils.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var curry = function curry(fn) {
  return function () {
    for (var _len = arguments.length, xs = Array(_len), _key = 0; _key < _len; _key++) {
      xs[_key] = arguments[_key];
    }

    if (xs.length === 0) {
      throw Error('EMPTY INVOCATION');
    }
    if (xs.length >= fn.length) {
      return fn.apply(undefined, xs);
    }
    return curry(fn.bind.apply(fn, [null].concat(xs)));
  };
};
var pipe = exports.pipe = function pipe() {
  for (var _len2 = arguments.length, ops = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    ops[_key2] = arguments[_key2];
  }

  return ops.reduce(function (a, b) {
    return function (arg) {
      return b(a(arg));
    };
  });
};
var rand = exports.rand = function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};
var $ = exports.$ = function $(query) {
  return document.querySelector(query);
};
var $$ = exports.$$ = function $$(query) {
  return document.querySelectorAll(query);
};
var html = exports.html = curry(function (el, data) {
  el.innerHTML = data;
  return el;
});
var getById = exports.getById = function getById(query) {
  return document.getElementById(query);
};
var createEl = exports.createEl = curry(function (tag, content, classes, id) {
  var el = document.createElement(tag);
  html(el, content);
  classes.map(function (cl) {
    return el.classList.add(cl);
  });
  if (id) el.id = id;
  return el;
});
var append = exports.append = curry(function (to, el) {
  to.appendChild(el);
  return el;
});
var prepend = exports.prepend = curry(function (to, el) {
  to.prepend(el);
  return el;
});
var unload = exports.unload = function unload(el) {
  return html(el, '');
};
var addEvent = exports.addEvent = curry(function (name, fn, el) {
  el.addEventListener(name, fn);
  return el;
});
var getByPlacement = exports.getByPlacement = function getByPlacement(num) {
  return $('.grid__item[data-placement="' + num + '"]');
};
var between = exports.between = curry(function (min, max, num) {
  return num >= min && num <= max;
});
var when = exports.when = curry(function (pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});
var subtract = exports.subtract = curry(function (a, b) {
  return b - a;
});
},{}],"src\\scripts\\state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  moles: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  score: 0,
  plays: 0,
  time: 0,
  settings: {
    timing: {
      timer: 30000,
      max: 2000,
      min: 1000
    }
  },
  gameTimer: null,
  gameLoop: null
};
},{}],"src\\scripts\\index.js":[function(require,module,exports) {
'use strict';

require('../styles/main.css');

var _mole = require('../images/mole.png');

var _mole2 = _interopRequireDefault(_mole);

var _utils = require('./utils');

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render() {
  _state2.default.moles.map(function (moleState, idx) {
    var el = (0, _utils.getByPlacement)(idx);
    if (moleState === 1) el.classList.add('is-active');else el.classList.remove('is-active');
  });

  (0, _utils.html)((0, _utils.getById)('score'), 'Score: ' + _state2.default.score);
  (0, _utils.html)((0, _utils.getById)('time'), 'Time: ' + _state2.default.time / 1000);
};

var updateMole = function updateMole(moles, idx, state) {
  moles[idx] = state;
  render();
};

var gameLoop = function gameLoop() {
  _state2.default.moles.map(function (moleState, idx) {
    var newMoleState = (0, _utils.rand)(0, 1);
    updateMole(_state2.default.moles, idx, newMoleState);

    if (newMoleState === 1) {
      setTimeout(function () {
        updateMole(_state2.default.moles, idx, 0);
      }, (0, _utils.rand)(_state2.default.settings.timing.min, _state2.default.settings.timing.max));
    }
  });

  render();
};

var start = function start() {
  var interval = 1000;

  gameLoop();
  _state2.default.gameTimer = setInterval(function () {
    if (_state2.default.time <= interval) {
      _state2.default.moles = _state2.default.moles.map(function () {
        return 0;
      });
      _state2.default.time = 0;
      clearInterval(_state2.default.gameTimer);
    } else {
      _state2.default.time -= interval;
    }
    render();
  }, interval);

  _state2.default.gameInterval = setInterval(function () {
    if (_state2.default.time <= 0) {
      clearInterval(_state2.default.gameInterval);
      return;
    }

    gameLoop();
  }, _state2.default.settings.timing.max);
};

var stop = function stop() {
  clearInterval(_state2.default.gameTimer);
  clearInterval(_state2.default.gameInterval);
  render();
};

var reset = function reset() {
  stop();
  _state2.default.time = _state2.default.settings.timing.timer;
  _state2.default.score = 0;
  render();
};

var createButtons = function createButtons() {
  var app = (0, _utils.$)('.top');

  var resetBtn = (0, _utils.createEl)('button', 'Reset', ['button', 'button--reset'], 'reset');
  (0, _utils.addEvent)('click', reset, resetBtn);
  (0, _utils.prepend)(app, resetBtn);

  var stopBtn = (0, _utils.createEl)('button', 'Stop', ['button', 'button--stop'], 'stop');
  (0, _utils.addEvent)('click', stop, stopBtn);
  (0, _utils.prepend)(app, stopBtn);

  var startBtn = (0, _utils.createEl)('button', 'Start', ['button'], 'start');
  (0, _utils.addEvent)('click', start, startBtn);
  (0, _utils.prepend)(app, startBtn);
};

var whack = function whack(el) {
  var isClickable = el.classList.contains('grid__item');
  if (!isClickable) return;

  var placement = parseInt(el.dataset.placement);
  var moleState = _state2.default.moles[placement];

  if (moleState === 1) {
    var sfx = (0, _utils.$)('#whack');
    sfx.currentTime = 0;
    sfx.play();
    _state2.default.score++;
    updateMole(_state2.default.moles, placement, 0);
  }
};

var setupEvents = function setupEvents() {
  (0, _utils.$)('.grid').addEventListener('mousedown', function (e) {
    whack(e.target);
    e.stopPropagation();
  });
};

var numPadToGridPlacement = function numPadToGridPlacement(num) {
  if (num <= 3) return num + 6;else if (num > 6) return num - 6;
  return num;
};

var numpadInput = function numpadInput() {
  var numWhack = (0, _utils.pipe)(parseInt, numPadToGridPlacement, (0, _utils.subtract)(1), _utils.getByPlacement, whack);
  var tryWhack = (0, _utils.when)((0, _utils.between)(1, 9), numWhack);
  document.addEventListener('keypress', function (e) {
    return tryWhack(e.key);
  });
};

var init = function init() {
  createButtons();
  setupEvents();
  numpadInput();

  var grid = (0, _utils.$)('.grid');
  (0, _utils.unload)(grid);

  _state2.default.time = _state2.default.settings.timing.timer;

  _state2.default.moles.map(function (el, idx) {
    var img = document.createElement('img');
    img.classList.add('img-responsive');
    img.setAttribute('src', _mole2.default);

    var item = document.createElement('div');
    item.classList.add('grid__item');
    item.dataset.placement = idx;
    item.appendChild(img);

    grid.appendChild(item);
  });

  render();
};

(0, _utils.addEvent)('DOMContentLoaded', init, document);
},{"../styles/main.css":"src\\styles\\main.css","../images/mole.png":"src\\images\\mole.png","./utils":"src\\scripts\\utils.js","./state":"src\\scripts\\state.js"}],"node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '51621' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules\\parcel-bundler\\src\\builtins\\hmr-runtime.js","src\\scripts\\index.js"], null)
//# sourceMappingURL=/scripts.3f160b49.map