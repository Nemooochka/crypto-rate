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
})({"framework/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFragment = exports.createElement = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Creates DOM Node. Implements jsx-parser's createElement API
 * @param {string|Function} tag - HTML tag as string or Component function
 * @param {object} props - element properties as parsed by jsx-parser
 * @param {Node[]} children - child elements
 * @returns {DocumentFragment|Element}
 */
const createElement = (tag, props, ...children) => {
  if (typeof tag === 'function') {
    /*
        Passing children as the 2nd argument is required as jsx transformer puts component functions
        and regular tags in wrapper functions that expect children as the 2nd param
       */
    return tag(_objectSpread(_objectSpread({}, props), {}, {
      children
    }), children);
  }

  const element = tag === '' ? new DocumentFragment() : document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
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
          } else if (name.toLowerCase() === 'classname') {
            // We want to treat both strings and arrays in a similar manner
            const classList = typeof value === 'string' ? value.split(' ').filter(Boolean) : value;
            element.classList.add(...classList);
          } else {
            element.setAttribute(name,
            /** @type {string} */
            value);
          }
        }
      } catch (e) {
        console.error('createElement caught', e, 'on', element);
      }
    }
  });
  children.forEach(child => appendChild(element, child));
  return element;
};
/**
 * Appends child elements from an unbound array of children, recursively
 * @param {Node} parent
 * @param {Node|[Node]} child
 */


exports.createElement = createElement;

const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(subChild => appendChild(parent, subChild));
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


const createFragment = (props, ...children) => createElement('', props, ...children);

exports.createFragment = createFragment;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"data/coinsAPI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCoinsUrl;

function getCoinsUrl() {
  return `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,ADA&tsyms=USD,EUR&api_key={${"58dad23bc03ae4827e7993c03cf6888bc092a3b5f70ed744adea2dbfcbc60dfd"}}`;
}
},{}],"data/coinsData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startApp;

var _coinsAPI = _interopRequireDefault(require("./coinsAPI"));

var _render = _interopRequireDefault(require("../framework/render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rearengeData = coinsDataDisplay => {
  let coinsDataUpd = [];

  for (let coin in coinsDataDisplay) {
    for (let fiat in coinsDataDisplay[coin]) {
      coinsDataDisplay[coin][fiat]['coinName'] = window.dataStorage.coinsDataRaw[coin][fiat]['FROMSYMBOL'];
      coinsDataDisplay[coin][fiat]['coinPrice'] = window.dataStorage.coinsDataRaw[coin][fiat]['PRICE'];
      coinsDataDisplay[coin][fiat]['coinChange'] = window.dataStorage.coinsDataRaw[coin][fiat]['CHANGEPCTDAY'];
      coinsDataDisplay[coin][fiat]['coinCap'] = window.dataStorage.coinsDataRaw[coin][fiat]['MKTCAP'];
      coinsDataDisplay[coin][fiat]['coinVolume'] = window.dataStorage.coinsDataRaw[coin][fiat]['VOLUMEDAYTO'];
    }

    coinsDataUpd.push(coinsDataDisplay[coin]);
  }

  window.dataStorage.coinsDataUpd = coinsDataUpd;
};

const loadData = url => {
  window.dataStorage.isDataLoading = true;
  (0, _render.default)();
  window.dataStorage.error = null;
  return fetch(url).then(response => response.json()).then(data => {
    window.dataStorage.isDataLoading = false;
    window.dataStorage.coinsDataDisplay = data['DISPLAY'];
    window.dataStorage.coinsDataRaw = data['RAW'];
    rearengeData(window.dataStorage.coinsDataDisplay);
  }).catch(error => {
    window.dataStore.error = error;
    return Promise.resolve({});
  });
};

const getAvailablePairs = () => {
  const {
    coinsDataDisplay,
    availableFiats,
    availableCoins
  } = window.dataStorage;
  let findFirst = 0;

  for (let coin in coinsDataDisplay) {
    availableCoins.push(coin);

    for (let fiat in coinsDataDisplay[coin]) {
      if (!findFirst) {
        availableFiats.push(fiat);
      }
    }

    findFirst = 1;
  }
};

function startApp() {
  const url = (0, _coinsAPI.default)();
  loadData(url).then(() => {
    getAvailablePairs();
    (0, _render.default)();
  });
}
},{"./coinsAPI":"data/coinsAPI.js","../framework/render":"framework/render.js"}],"framework/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderApp;

var _element = require("./element");

var _coinsData = _interopRequireDefault(require("../data/coinsData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
let Component, Target;
let firstLoad = true;

function renderApp(componentFunction = null, targetElement = null) {
  if (componentFunction) Component = componentFunction;
  if (targetElement) Target = targetElement;

  if (firstLoad) {
    firstLoad = false;
    (0, _coinsData.default)();
  }

  Target.innerHTML = '';
  Target.appendChild((0, _element.createElement)(Component, null));
}
},{"./element":"framework/element.js","../data/coinsData":"data/coinsData.js"}],"components/SelectFiat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectFiat;

var _element = require("../framework/element");

var _render = _interopRequireDefault(require("../framework/render"));

var _styles = _interopRequireDefault(require("../styles.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
const updateFiatCurrency = selectedFiat => {
  window.dataStorage['activeFiat'] = selectedFiat;
  (0, _render.default)();
};

function SelectFiat() {
  const {
    activeFiat,
    availableFiats
  } = window.dataStorage;
  return (0, _element.createElement)("select", {
    class: _styles.default.coinToFiatSelect,
    onchange: e => updateFiatCurrency(e.target.value)
  }, availableFiats.map(fiat => {
    if (fiat === activeFiat) {
      return (0, _element.createElement)("option", {
        value: fiat,
        selected: true
      }, fiat);
    } else {
      return (0, _element.createElement)("option", {
        value: fiat
      }, fiat);
    }
  }));
}
},{"../framework/element":"framework/element.js","../framework/render":"framework/render.js","../styles.css":"styles.css"}],"components/Filters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Filters;

var _render = _interopRequireDefault(require("../framework/render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Filters(activeElement) {
  const filters = [{
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
  let filteredArr = [];
  let activeFilterName;
  const {
    coinsDataDisplay,
    coinsDataUpd,
    activeFiat
  } = window.dataStorage;
  const activeElementFilter = activeElement.getAttribute('data-filter');
  filters.map(elem => {
    if (elem['filterName'] === activeElementFilter) activeFilterName = elem['value'];
  });

  if (!activeElement.classList.contains('active')) {
    document.querySelectorAll('div[data-filter]').forEach(elem => elem.classList.remove('active', 'up', 'down'));
    activeElement.classList.add('active');
  }

  const formatNumberValue = number => {
    let numberValue = number.replace(/^\D+/g, '');
    numberValue = numberValue.replace(/,/g, '');
    return numberValue;
  };

  for (let data in coinsDataUpd) {
    if (activeFilterName === 'coinName') {
      filteredArr = coinsDataUpd.sort((a, b) => a[activeFiat][activeFilterName].localeCompare(b[activeFiat][activeFilterName]));
    } else {
      filteredArr = coinsDataUpd.sort((a, b) => a[activeFiat][activeFilterName] - b[activeFiat][activeFilterName]);
    }
  }

  let classes = [];

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

  window.dataStorage.activeFilter = {
    attr: activeElement.getAttribute('data-filter'),
    classes: classes
  };
  window.dataStorage.filteredArr = filteredArr;
  (0, _render.default)();
}
},{"../framework/render":"framework/render.js"}],"components/CoinsTable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CoinsTable;

var _element = require("../framework/element");

var _styles = _interopRequireDefault(require("../styles.css"));

var _SelectFiat = _interopRequireDefault(require("./SelectFiat"));

var _Filters = _interopRequireDefault(require("./Filters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function CoinsTable() {
  const GenerateCoinsTableHeader = () => {
    const headers = [{
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
    return (0, _element.createElement)("div", {
      class: `thead ${_styles.default.thead}`
    }, (0, _element.createElement)("div", {
      class: _styles.default.tr
    }, headers.map(elem => {
      return (0, _element.createElement)("div", {
        class: `${_styles.default.th} ${elem.filter === window.dataStorage.activeFilter['attr'] ? window.dataStorage.activeFilter['classes'][0] : ''} ${elem.filter === window.dataStorage.activeFilter['attr'] ? window.dataStorage.activeFilter['classes'][1] : ''}`,
        onclick: e => (0, _Filters.default)(e.currentTarget),
        "data-filter": elem.filter
      }, (0, _element.createElement)("i", {
        class: _styles.default.sortingIcon
      }), (0, _element.createElement)("span", null, elem.title));
    })));
  };

  const GenerateCoinsTable = ({
    coinData
  }) => {
    const {
      activeFiat
    } = window.dataStorage;
    const {
      PRICE,
      CHANGEPCTDAY,
      VOLUMEDAYTO,
      MKTCAP,
      coinName
    } = coinData[activeFiat];
    let changePctDay_HTML;

    if (CHANGEPCTDAY >= 0) {
      changePctDay_HTML = (0, _element.createElement)("span", {
        class: _styles.default.green
      }, "+", CHANGEPCTDAY, "%");
    } else {
      changePctDay_HTML = (0, _element.createElement)("span", {
        class: _styles.default.red
      }, "-", CHANGEPCTDAY, "%");
    }

    return (0, _element.createElement)(_element.createFragment, null, (0, _element.createElement)("div", {
      class: _styles.default.td
    }, (0, _element.createElement)("b", null, coinName)), (0, _element.createElement)("div", {
      class: _styles.default.td
    }, (0, _element.createElement)("b", null, PRICE)), (0, _element.createElement)("div", {
      class: _styles.default.td
    }, (0, _element.createElement)("b", null, changePctDay_HTML)), (0, _element.createElement)("div", {
      class: _styles.default.td
    }, (0, _element.createElement)("b", null, MKTCAP)), (0, _element.createElement)("div", {
      class: _styles.default.td
    }, (0, _element.createElement)("b", null, VOLUMEDAYTO)));
  };

  const renderCoinsTable = () => {
    if (window.dataStorage.isDataLoading) {
      return (0, _element.createElement)("div", {
        class: _styles.default.loading
      }, "Data is loading");
    }

    const {
      coinsDataDisplay,
      coinsDataUpd,
      availableFiats,
      filteredArr,
      activeFiat
    } = window.dataStorage;
    let actualData = coinsDataUpd;
    if (filteredArr) actualData = filteredArr;
    return (0, _element.createElement)("div", {
      class: _styles.default.coins
    }, (0, _element.createElement)(_SelectFiat.default, null), (0, _element.createElement)("div", {
      class: _styles.default.coinsTable
    }, (0, _element.createElement)(GenerateCoinsTableHeader, null), (0, _element.createElement)("div", {
      class: _styles.default.tbody
    }, actualData.map(coin => {
      return (0, _element.createElement)("div", {
        class: _styles.default.tr,
        id: coin[activeFiat]['coinName']
      }, (0, _element.createElement)(GenerateCoinsTable, {
        coinData: coin
      }));
    }))));
  };

  return renderCoinsTable();
}
},{"../framework/element":"framework/element.js","../styles.css":"styles.css","./SelectFiat":"components/SelectFiat.js","./Filters":"components/Filters.js"}],"components/App.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _element = require("../framework/element");

var _CoinsTable = _interopRequireDefault(require("./CoinsTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx createElement */

/** @jsxFrag createFragment */
function App() {
  return (0, _element.createElement)(_CoinsTable.default, null);
}
},{"../framework/element":"framework/element.js","./CoinsTable":"components/CoinsTable.js"}],"data/dataStore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const dataStore = {
  availableFiats: [],
  availableCoins: [],
  activeFiat: 'USD',
  isDataLoading: false,
  error: null,
  activeFilter: {
    attr: '',
    classes: []
  }
};
var _default = dataStore;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _App = _interopRequireDefault(require("./components/App"));

var _render = _interopRequireDefault(require("./framework/render"));

var _dataStore = _interopRequireDefault(require("./data/dataStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start from here
if (module.hot) {
  module.hot.accept();
}

window.dataStorage = _dataStore.default;
(0, _render.default)(_App.default, document.getElementById('app-root'));
},{"./components/App":"components/App.js","./framework/render":"framework/render.js","./data/dataStore":"data/dataStore.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62963" + '/');

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