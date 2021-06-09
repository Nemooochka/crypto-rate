// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = void 0;

var isFunction = function isFunction(func) {
  return typeof func === 'function';
};

exports.isFunction = isFunction;
},{}],"framework/hooks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFunctionElement = createFunctionElement;
exports.useState = useState;
exports.useEffect = useEffect;
exports.useContext = exports.current = void 0;

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var current = {
  shouldReRender: true,
  wipComponent: null,
  hookIndex: null
};
exports.current = current;

function createFunctionElement(tag, props, children) {
  current.wipComponent = tag;
  current.hookIndex = 0;
  current.wipComponent.hooks = current.wipComponent.hooks || [];
  return tag(_objectSpread(_objectSpread({}, props), {}, {
    children: children
  }), children);
}

function useState(initial) {
  var wipComponent = current.wipComponent,
      hookIndex = current.hookIndex;
  var oldHook = wipComponent.hooks[hookIndex];
  var hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };
  var actions = oldHook ? oldHook.queue : [];
  actions.forEach(function (action) {
    hook.state = (0, _utils.isFunction)(action) ? action(hook.state) : action;
  });

  var setState = function setState(action) {
    current.shouldReRender = true;
    hook.queue.push(action);
  };

  wipComponent.hooks[hookIndex] = hook;
  current.hookIndex++;
  return [hook.state, setState];
}

function useEffect(effect, deps) {
  var wipComponent = current.wipComponent,
      hookIndex = current.hookIndex;
  var oldHook = wipComponent.hooks[hookIndex];
  var oldDeps = oldHook ? oldHook.deps : undefined;
  var hasChanged = hasDepsChanged(oldDeps, deps);
  current.hookIndex++;
  if (!hasChanged) return;

  if (oldHook && oldHook.unmount) {
    window.removeEventListener('beforeunload', oldHook.unmount);
  }

  wipComponent.hooks[hookIndex] = {
    unmount: effect(),
    deps: deps
  };
  window.addEventListener('beforeunload', wipComponent.hooks[hookIndex].unmount);
}

var hasDepsChanged = function hasDepsChanged(prevDeps, nextDeps) {
  return !prevDeps || !nextDeps || prevDeps.length !== nextDeps.length || prevDeps.some(function (dep, index) {
    return dep !== nextDeps[index];
  });
};

var useContext = function useContext(Context) {
  return Context.value;
};

exports.useContext = useContext;
},{"../utils":"utils.js"}],"framework/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFragment = exports.createElement = void 0;

var _hooks = require("./hooks");

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createElement = function createElement(tag, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if ((0, _utils.isFunction)(tag)) {
    /*
      Passing children as the 2nd argument is required as jsx transformer puts component functions
      and regular tags in wrapper functions that expect children as the 2nd param
     */
    return (0, _hooks.createFunctionElement)(tag, props, children);
  }

  var element = tag === '' ? new DocumentFragment() : document.createElement(tag);
  Object.entries(props || {}).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    if (name.startsWith('on') && name.toLowerCase() in window) {
      element.addEventListener(name.toLowerCase().substr(2),
      /** @type {Function} */
      value);
    } else {
      try {
        if (!(element instanceof DocumentFragment)) {
          // Boolean attributes are considered to be true if they're present on the element at all, regardless of their actual value
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute#example
          if (['disabled', 'checked'].includes(name) && !value) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, value);
          }
        }
      } catch (e) {
        console.error('createElement caught', e, 'on', element);
      }
    }
  });
  children.forEach(function (child) {
    return appendChild(element, child);
  });
  return element;
};
/**
 * Appends child elements from an unbound array of children, recursively
 * @param {Node} parent
 * @param {Node|[Node]} child
 */


exports.createElement = createElement;

var appendChild = function appendChild(parent, child) {
  if (Array.isArray(child)) {
    child.forEach(function (subChild) {
      return appendChild(parent, subChild);
    });
  } else {
    // Skip null and undefined
    if (child != null) {
      parent.appendChild(child.nodeType ? child : document.createTextNode(child.toString()));
    }
  }
};
/**
 * Creates Fragment. Implements jsx-parser's createFragment API
 * @param {object} props - effectively a placeholder, fragment never has any properties
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment}
 */


var createFragment = function createFragment(props) {
  for (var _len2 = arguments.length, children = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    children[_key2 - 1] = arguments[_key2];
  }

  return createElement.apply(void 0, ['', props].concat(children));
};

exports.createFragment = createFragment;
},{"./hooks":"framework/hooks.js","../utils":"utils.js"}],"framework/context.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;

var _framework = require("../framework");

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @typedef {Object} Context
 * @property {*} Provider - Provider
 * @property {*} Consumer - Consumer
 */

/**
 * Creates Context object with Provider and Consumer
 * @param {*} defaultValue - defaultValue of created context
 * @returns {Context} context object
 */
function createContext(defaultValue) {
  var context = {
    value: defaultValue,
    Provider: null,
    Consumer: null
  };
  var hasWarnedAboutUsingUseContext = false;

  context.Provider = function (_ref) {
    var _ref$value = _ref.value,
        value = _ref$value === void 0 ? defaultValue : _ref$value,
        children = _ref.children;

    if (!Object.is(context.value, value)) {
      _framework.current.shouldReRender = true;
      context.value = value;
    }

    return children;
  };

  context.Consumer = function (_ref2) {
    var children = _ref2.children;

    var _children = _slicedToArray(children, 1),
        renderFunction = _children[0];

    if (!(0, _utils.isFunction)(renderFunction)) {
      !hasWarnedAboutUsingUseContext && console.warn('Requires a function as a child.', '\n', 'The function receives the current context value and returns a node.', '\n', 'Or use useContext(Context) inside your component.');
      hasWarnedAboutUsingUseContext = true;
      return children;
    }

    return renderFunction(context.value);
  };

  return context;
}
},{"../framework":"framework/index.js","../utils":"utils.js"}],"framework/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.default = void 0;

var _element = require("./element");

var _hooks = require("./hooks");

// /** @jsx createElement */
// /** @jsxFrag createFragment */
// import { createElement } from './element';
// let Component, Target;
// export function render(componentFunction = null, targetElement = null) {
//   if (componentFunction) Component = componentFunction;
//   if (targetElement) Target = targetElement;
//   // if (firstLoad) {
//   //   firstLoad = false;
//   //   startApp();
//   // }
//   // Target.innerHTML = '';
//   // Target.appendChild(<Component />);
//   Target.replaceChildren(<Component />);
// }

/** @jsx createElement */

/*** @jsxFrag createFragment */

/**
 * Renders a component and attaches it to the target DOM element
 * @param Component - function
 * @param target - DOM element to attach component to
 */
var timer;

function render(Component, target) {
  function workLoop() {
    if (_hooks.current.shouldReRender) {
      _hooks.current.shouldReRender = false;
      target.replaceChildren((0, _element.createElement)(Component, null));
    }

    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(workLoop);
  }

  timer = requestAnimationFrame(workLoop);
}

var _default = render;
exports.default = _default;
},{"./element":"framework/element.js","./hooks":"framework/hooks.js"}],"framework/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _element = require("./element");

Object.keys(_element).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _element[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _element[key];
    }
  });
});

var _context = require("./context");

Object.keys(_context).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _context[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _context[key];
    }
  });
});

var _hooks = require("./hooks");

Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hooks[key];
    }
  });
});

var _render = require("./render");

Object.keys(_render).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _render[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _render[key];
    }
  });
});
},{"./element":"framework/element.js","./context":"framework/context.js","./hooks":"framework/hooks.js","./render":"framework/render.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "green": "_green_4e88b",
  "red": "_red_4e88b",
  "loading": "_loading_4e88b",
  "coins": "_coins_4e88b",
  "coinContainer": "_coinContainer_4e88b",
  "coinHeader": "_coinHeader_4e88b",
  "coinToFiatSelect": "_coinToFiatSelect_4e88b",
  "coinName": "_coinName_4e88b",
  "coinInfo": "_coinInfo_4e88b",
  "coinInfoBlock": "_coinInfoBlock_4e88b",
  "title": "_title_4e88b",
  "price": "_price_4e88b",
  "coinsTable": "_coinsTable_4e88b",
  "thead": "_thead_4e88b",
  "th": "_th_4e88b",
  "td": "_td_4e88b",
  "tr": "_tr_4e88b",
  "sortingIcon": "_sortingIcon_4e88b"
};
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/SelectFiat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectFiat;

var _framework = require("../framework");

var _styles = _interopRequireDefault(require("../styles.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
var updateFiatCurrency = function updateFiatCurrency(selectedFiat, updateActiveFiat) {
  updateActiveFiat(selectedFiat);
  (0, _framework.render)();
};

function SelectFiat(_ref) {
  var availableFiats = _ref.availableFiats,
      activeFiat = _ref.activeFiat,
      updateActiveFiat = _ref.updateActiveFiat;
  return (0, _framework.createElement)("select", {
    class: _styles.default.coinToFiatSelect,
    onchange: function onchange(e) {
      return updateFiatCurrency(e.target.value, updateActiveFiat);
    }
  }, availableFiats.map(function (fiat) {
    if (fiat === activeFiat) {
      return (0, _framework.createElement)("option", {
        value: fiat,
        selected: true
      }, fiat);
    } else {
      return (0, _framework.createElement)("option", {
        value: fiat
      }, fiat);
    }
  }));
}
},{"../framework":"framework/index.js","../styles.css":"styles.css"}],"components/Filters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Filters;

var _framework = require("../framework");

function Filters(activeElement, coinsDataUpd, activeFiat, setActiveFilter, setFilteredArr) {
  var filters = [{
    filterName: 'asset',
    value: 'coinName'
  }, {
    filterName: 'price',
    value: 'coinPrice'
  }, {
    filterName: 'returns',
    value: 'coinChange'
  }, {
    filterName: 'cap',
    value: 'coinCap'
  }, {
    filterName: 'volume',
    value: 'coinVolume'
  }];
  var filteredArr = [];
  var activeFilterName;
  var activeElementFilter = activeElement.getAttribute('data-filter');
  filters.map(function (elem) {
    if (elem['filterName'] === activeElementFilter) activeFilterName = elem['value'];
  });

  if (!activeElement.classList.contains('active')) {
    document.querySelectorAll('div[data-filter]').forEach(function (elem) {
      return elem.classList.remove('active', 'up', 'down');
    });
    activeElement.classList.add('active');
  }

  var formatNumberValue = function formatNumberValue(number) {
    var numberValue = number.replace(/^\D+/g, '');
    numberValue = numberValue.replace(/,/g, '');
    return numberValue;
  };

  for (var data in coinsDataUpd) {
    if (activeFilterName === 'coinName') {
      filteredArr = coinsDataUpd.sort(function (a, b) {
        return a[activeFiat][activeFilterName].localeCompare(b[activeFiat][activeFilterName]);
      });
    } else {
      filteredArr = coinsDataUpd.sort(function (a, b) {
        return a[activeFiat][activeFilterName] - b[activeFiat][activeFilterName];
      });
    }
  }

  var classes = [];

  if (activeElement.classList.contains('up')) {
    activeElement.classList.remove('up');
    activeElement.classList.add('down');
    classes = [];
    classes.push('active', 'down');
    filteredArr.reverse();
  } else {
    activeElement.classList.remove('down');
    activeElement.classList.add('up');
    classes = [];
    classes.push('active', 'up');
  }

  setActiveFilter({
    attr: activeElement.getAttribute('data-filter'),
    classes: classes
  });
  setFilteredArr(filteredArr);
  (0, _framework.render)();
}
},{"../framework":"framework/index.js"}],"components/CoinsTable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CoinsTable;

var _framework = require("../framework");

var _styles = _interopRequireDefault(require("../styles.css"));

var _SelectFiat = _interopRequireDefault(require("./SelectFiat"));

var _Filters = _interopRequireDefault(require("./Filters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CoinsTable(_ref) {
  var error = _ref.error,
      isDataLoading = _ref.isDataLoading,
      availableFiats = _ref.availableFiats,
      coinsDataUpd = _ref.coinsDataUpd;

  var _useState = (0, _framework.useState)('USD'),
      _useState2 = _slicedToArray(_useState, 2),
      activeFiat = _useState2[0],
      setActiveFiat = _useState2[1];

  var _useState3 = (0, _framework.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      filteredArr = _useState4[0],
      setFilteredArr = _useState4[1];

  var _useState5 = (0, _framework.useState)({
    attr: '',
    classes: []
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      activeFilter = _useState6[0],
      setActiveFilter = _useState6[1];

  var updateActiveFiat = function updateActiveFiat(fiat) {
    setActiveFiat(fiat);
  };

  var GenerateCoinsTableHeader = function GenerateCoinsTableHeader() {
    var headers = [{
      title: 'Asset',
      filter: 'asset'
    }, {
      title: 'Price',
      filter: 'price'
    }, {
      title: 'Returns (24h)',
      filter: 'returns'
    }, {
      title: 'Market Cap',
      filter: 'cap'
    }, {
      title: 'Total Exchange Volume',
      filter: 'volume'
    }];
    return (0, _framework.createElement)("div", {
      class: "thead ".concat(_styles.default.thead)
    }, (0, _framework.createElement)("div", {
      class: _styles.default.tr
    }, headers.map(function (elem) {
      return (0, _framework.createElement)("div", {
        class: "".concat(_styles.default.th, " ").concat(elem.filter === activeFilter['attr'] ? activeFilter['classes'][0] : '', " ").concat(elem.filter === activeFilter['attr'] ? activeFilter['classes'][1] : ''),
        onclick: function onclick(e) {
          return (0, _Filters.default)(e.currentTarget, coinsDataUpd, activeFiat, setActiveFilter, setFilteredArr);
        },
        "data-filter": elem.filter
      }, (0, _framework.createElement)("i", {
        class: _styles.default.sortingIcon
      }), (0, _framework.createElement)("span", null, elem.title));
    })));
  };

  var GenerateCoinsTable = function GenerateCoinsTable(_ref2) {
    var coinData = _ref2.coinData;
    var _coinData$activeFiat = coinData[activeFiat],
        PRICE = _coinData$activeFiat.PRICE,
        CHANGEPCTDAY = _coinData$activeFiat.CHANGEPCTDAY,
        VOLUMEDAYTO = _coinData$activeFiat.VOLUMEDAYTO,
        MKTCAP = _coinData$activeFiat.MKTCAP,
        coinName = _coinData$activeFiat.coinName;
    var changePctDay_HTML;

    if (CHANGEPCTDAY >= 0) {
      changePctDay_HTML = (0, _framework.createElement)("span", {
        class: _styles.default.green
      }, "+", CHANGEPCTDAY, "%");
    } else {
      changePctDay_HTML = (0, _framework.createElement)("span", {
        class: _styles.default.red
      }, "-", CHANGEPCTDAY, "%");
    }

    return (0, _framework.createElement)(_framework.createFragment, null, (0, _framework.createElement)("div", {
      class: _styles.default.td
    }, (0, _framework.createElement)("b", null, coinName)), (0, _framework.createElement)("div", {
      class: _styles.default.td
    }, (0, _framework.createElement)("b", null, PRICE)), (0, _framework.createElement)("div", {
      class: _styles.default.td
    }, (0, _framework.createElement)("b", null, changePctDay_HTML)), (0, _framework.createElement)("div", {
      class: _styles.default.td
    }, (0, _framework.createElement)("b", null, MKTCAP)), (0, _framework.createElement)("div", {
      class: _styles.default.td
    }, (0, _framework.createElement)("b", null, VOLUMEDAYTO)));
  };

  var RenderCoinsTable = function RenderCoinsTable() {
    var actualData = coinsDataUpd;
    if (filteredArr) actualData = filteredArr;
    return (0, _framework.createElement)("div", {
      class: _styles.default.coinsTable
    }, (0, _framework.createElement)(GenerateCoinsTableHeader, null), (0, _framework.createElement)("div", {
      class: _styles.default.tbody
    }, actualData.map(function (coin) {
      return (0, _framework.createElement)("div", {
        class: _styles.default.tr,
        id: coin[activeFiat]['coinName']
      }, (0, _framework.createElement)(GenerateCoinsTable, {
        coinData: coin
      }));
    })));
  };

  if (isDataLoading) {
    return (0, _framework.createElement)("div", null, "Loading...");
  }

  if (error) {
    return (0, _framework.createElement)("div", null, error);
  }

  return (0, _framework.createElement)("div", {
    class: _styles.default.coins
  }, (0, _framework.createElement)(_SelectFiat.default, {
    availableFiats: availableFiats,
    activeFiat: activeFiat,
    updateActiveFiat: updateActiveFiat
  }), (0, _framework.createElement)(RenderCoinsTable, null));
}
},{"../framework":"framework/index.js","../styles.css":"styles.css","./SelectFiat":"components/SelectFiat.js","./Filters":"components/Filters.js"}],"data/coinsAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCoinsUrl;

function getCoinsUrl() {
  return "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,ADA&tsyms=USD,EUR&api_key={".concat("58dad23bc03ae4827e7993c03cf6888bc092a3b5f70ed744adea2dbfcbc60dfd", "}");
}
},{}],"data/coinsData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailablePairs = exports.loadData = void 0;

var _coinsAPI = _interopRequireDefault(require("./coinsAPI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = (0, _coinsAPI.default)();
var coinsDataDisplay = [];
var coinsDataUpd = [];
var coinsDataRaw = [];

var rearengeData = function rearengeData(coinsDataDisplay) {
  for (var coin in coinsDataDisplay) {
    for (var fiat in coinsDataDisplay[coin]) {
      coinsDataDisplay[coin][fiat]['coinName'] = coinsDataRaw[coin][fiat]['FROMSYMBOL'];
      coinsDataDisplay[coin][fiat]['coinPrice'] = coinsDataRaw[coin][fiat]['PRICE'];
      coinsDataDisplay[coin][fiat]['coinChange'] = coinsDataRaw[coin][fiat]['CHANGEPCTDAY'];
      coinsDataDisplay[coin][fiat]['coinCap'] = coinsDataRaw[coin][fiat]['MKTCAP'];
      coinsDataDisplay[coin][fiat]['coinVolume'] = coinsDataRaw[coin][fiat]['VOLUMEDAYTO'];
    }

    coinsDataUpd.push(coinsDataDisplay[coin]);
  }

  return coinsDataUpd;
};

var loadData = function loadData() {
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    coinsDataDisplay = data['DISPLAY'];
    coinsDataRaw = data['RAW'];
    return rearengeData(coinsDataDisplay);
  }).catch(function (error) {
    return error;
  });
};

exports.loadData = loadData;

var getAvailablePairs = function getAvailablePairs() {
  var findFirst = 0;
  var result = {
    coin: [],
    fiat: []
  };

  for (var coin in coinsDataDisplay) {
    result['coin'].push(coin);

    for (var fiat in coinsDataDisplay[coin]) {
      if (!findFirst) {
        result['fiat'].push(fiat);
      }
    }

    findFirst = 1;
  }

  return result;
};

exports.getAvailablePairs = getAvailablePairs;
},{"./coinsAPI":"data/coinsAPI.js"}],"data/customHooks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCoins;

var _framework = require("../framework");

var _coinsData = require("./coinsData");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useCoins() {
  var _useState = (0, _framework.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      coinsDataUpd = _useState2[0],
      setCoinsDataUpd = _useState2[1];

  var _useState3 = (0, _framework.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      availableCoins = _useState4[0],
      setAvailableCoins = _useState4[1];

  var _useState5 = (0, _framework.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      availableFiats = _useState6[0],
      setAvailableFiats = _useState6[1];

  var _useState7 = (0, _framework.useState)(true),
      _useState8 = _slicedToArray(_useState7, 2),
      isDataLoading = _useState8[0],
      setIsDataLoading = _useState8[1];

  var _useState9 = (0, _framework.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  (0, _framework.useEffect)(function () {
    (0, _coinsData.loadData)().then(function (data) {
      var message = data.message,
          code = data.code;
      if (code !== '200' && message) throw Error(message);
      setError(null);
      setCoinsDataUpd(data);
      setAvailableFiats((0, _coinsData.getAvailablePairs)()['fiat']);
    }).catch(setError).finally(function () {
      setIsDataLoading(false);
    });
  }, []);
  return {
    coinsDataUpd: coinsDataUpd,
    error: error,
    isDataLoading: isDataLoading,
    availableFiats: availableFiats
  };
}
},{"../framework":"framework/index.js","./coinsData":"data/coinsData.js"}],"components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _framework = require("../framework");

var _CoinsTable = _interopRequireDefault(require("./CoinsTable"));

var _customHooks = _interopRequireDefault(require("../data/customHooks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function App() {
  var _useCoins = (0, _customHooks.default)(),
      coinsDataUpd = _useCoins.coinsDataUpd,
      error = _useCoins.error,
      isDataLoading = _useCoins.isDataLoading,
      availableFiats = _useCoins.availableFiats;

  return (0, _framework.createElement)(_CoinsTable.default, {
    error: error,
    isDataLoading: isDataLoading,
    availableFiats: availableFiats,
    coinsDataUpd: coinsDataUpd
  });
}
},{"../framework":"framework/index.js","./CoinsTable":"components/CoinsTable.js","../data/customHooks":"data/customHooks.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _framework = require("./framework");

var _App = _interopRequireDefault(require("./components/App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (module.hot) {
  module.hot.accept();
} // pass a component function itself so that `render` could invoke it as needed


(0, _framework.render)(_App.default, document.getElementById('app-root'));
},{"./framework":"framework/index.js","./components/App":"components/App.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56720" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map