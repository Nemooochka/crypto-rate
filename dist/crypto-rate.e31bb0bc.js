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
})({"data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cryptoData = void 0;
const cryptoData = {
  RAW: {
    BTC: {
      USD: {
        TYPE: '5',
        MARKET: 'CCCAGG',
        FROMSYMBOL: 'BTC',
        TOSYMBOL: 'USD',
        FLAGS: '2052',
        PRICE: 54221.4,
        LASTUPDATE: 1619069657,
        MEDIAN: 54225.2,
        LASTVOLUME: 0.00589271,
        LASTVOLUMETO: 319.4209453852,
        LASTTRADEID: '159214069',
        VOLUMEDAY: 19181.753307485502,
        VOLUMEDAYTO: 1026580307.0393715,
        VOLUME24HOUR: 51144.66296493999,
        VOLUME24HOURTO: 2789487248.2062926,
        OPENDAY: 53803.36,
        HIGHDAY: 54662.26,
        LOWDAY: 52166.37,
        OPEN24HOUR: 55443.48,
        HIGH24HOUR: 56299.47,
        LOW24HOUR: 52073.06,
        LASTMARKET: 'Coinbase',
        VOLUMEHOUR: 797.9540859499994,
        VOLUMEHOURTO: 43284684.59972252,
        OPENHOUR: 54281.71,
        HIGHHOUR: 54411.54,
        LOWHOUR: 54062.94,
        TOPTIERVOLUME24HOUR: 51144.66296493999,
        TOPTIERVOLUME24HOURTO: 2789487248.2062926,
        CHANGE24HOUR: -1222.0800000000017,
        CHANGEPCT24HOUR: -2.2041906460417016,
        CHANGEDAY: 418.0400000000009,
        CHANGEPCTDAY: 0.7769774973161544,
        CHANGEHOUR: -60.30999999999767,
        CHANGEPCTHOUR: -0.11110556391830263,
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 18688062,
        MKTCAP: 1013292884926.8,
        MKTCAPPENALTY: 0,
        TOTALVOLUME24H: 276654.9055975814,
        TOTALVOLUME24HTO: 15016968318.087797,
        TOTALTOPTIERVOLUME24H: 276302.016598176,
        TOTALTOPTIERVOLUME24HTO: 14997834182.495436,
        IMAGEURL: '/media/37746251/btc.png'
      },
      EUR: {
        TYPE: '5',
        MARKET: 'CCCAGG',
        FROMSYMBOL: 'BTC',
        TOSYMBOL: 'EUR',
        FLAGS: '1026',
        PRICE: 45113.8,
        LASTUPDATE: 1619069661,
        MEDIAN: 45108.27,
        LASTVOLUME: 0.0096553,
        LASTVOLUMETO: 435.502596159,
        LASTTRADEID: '166301467',
        VOLUMEDAY: 3017.494390460714,
        VOLUMEDAYTO: 135344755.42276007,
        VOLUME24HOUR: 10972.74357318,
        VOLUME24HOURTO: 501375280.25199336,
        OPENDAY: 44767.76,
        HIGHDAY: 45432.67,
        LOWDAY: 43772.39,
        OPEN24HOUR: 46163.5,
        HIGH24HOUR: 46939.12,
        LOW24HOUR: 43697.24,
        LASTMARKET: 'Bitstamp',
        VOLUMEHOUR: 214.84637439999307,
        VOLUMEHOURTO: 9798724.36294554,
        OPENHOUR: 45152.96,
        HIGHHOUR: 45255.12,
        LOWHOUR: 44995.27,
        TOPTIERVOLUME24HOUR: 10972.74357318,
        TOPTIERVOLUME24HOURTO: 501375280.25199336,
        CHANGE24HOUR: -1049.699999999997,
        CHANGEPCT24HOUR: -2.2738743812752436,
        CHANGEDAY: 346.0400000000009,
        CHANGEPCTDAY: 0.7729669744476848,
        CHANGEHOUR: -39.15999999999622,
        CHANGEPCTHOUR: -0.08672742606463943,
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 18688062,
        MKTCAP: 843089491455.6001,
        MKTCAPPENALTY: 0,
        TOTALVOLUME24H: 276654.9055975814,
        TOTALVOLUME24HTO: 12487307201.388435,
        TOTALTOPTIERVOLUME24H: 276302.016598176,
        TOTALTOPTIERVOLUME24HTO: 12471387037.647058,
        IMAGEURL: '/media/37746251/btc.png'
      }
    },
    ETH: {
      USD: {
        TYPE: '5',
        MARKET: 'CCCAGG',
        FROMSYMBOL: 'ETH',
        TOSYMBOL: 'USD',
        FLAGS: '2050',
        PRICE: 2438.49,
        LASTUPDATE: 1619069656,
        MEDIAN: 2437.57,
        LASTVOLUME: 0.06316634,
        LASTVOLUMETO: 153.9767970376,
        LASTTRADEID: '101217804',
        VOLUMEDAY: 260665.96092023526,
        VOLUMEDAYTO: 624435417.8098613,
        VOLUME24HOUR: 939673.3832933999,
        VOLUME24HOURTO: 2236767657.4528484,
        OPENDAY: 2357.58,
        HIGHDAY: 2453.18,
        LOWDAY: 2316.21,
        OPEN24HOUR: 2305.34,
        HIGH24HOUR: 2469.99,
        LOW24HOUR: 2237.25,
        LASTMARKET: 'Coinbase',
        VOLUMEHOUR: 14607.523492609924,
        VOLUMEHOURTO: 35696026.83257449,
        OPENHOUR: 2446.69,
        HIGHHOUR: 2453.18,
        LOWHOUR: 2426.24,
        TOPTIERVOLUME24HOUR: 939673.3832933999,
        TOPTIERVOLUME24HOURTO: 2236767657.4528484,
        CHANGE24HOUR: 133.14999999999964,
        CHANGEPCT24HOUR: 5.775720717985183,
        CHANGEDAY: 80.90999999999985,
        CHANGEPCTDAY: 3.4319089914234024,
        CHANGEHOUR: -8.200000000000273,
        CHANGEPCTHOUR: -0.3351466675386041,
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 115569329.874,
        MKTCAP: 281814655204.45026,
        MKTCAPPENALTY: 0,
        TOTALVOLUME24H: 6299810.1368930945,
        TOTALVOLUME24HTO: 15307407529.738167,
        TOTALTOPTIERVOLUME24H: 6239426.9936583815,
        TOTALTOPTIERVOLUME24HTO: 15160163838.791752,
        IMAGEURL: '/media/37746238/eth.png'
      },
      EUR: {
        TYPE: '5',
        MARKET: 'CCCAGG',
        FROMSYMBOL: 'ETH',
        TOSYMBOL: 'EUR',
        FLAGS: '2050',
        PRICE: 2029.06,
        LASTUPDATE: 1619069660,
        MEDIAN: 2026.71,
        LASTVOLUME: 0.14316085,
        LASTVOLUMETO: 290.427553178,
        LASTTRADEID: '1619069660.2362',
        VOLUMEDAY: 48120.76257292041,
        VOLUMEDAYTO: 94854629.99802433,
        VOLUME24HOUR: 187309.58631538998,
        VOLUME24HOURTO: 369998381.3272407,
        OPENDAY: 1962,
        HIGHDAY: 2041.79,
        LOWDAY: 1927.51,
        OPEN24HOUR: 1919.38,
        HIGH24HOUR: 2053.72,
        LOW24HOUR: 1866.75,
        LASTMARKET: 'Kraken',
        VOLUMEHOUR: 4709.722297840008,
        VOLUMEHOURTO: 9450290.301499633,
        OPENHOUR: 2035.5,
        HIGHHOUR: 2041.79,
        LOWHOUR: 2020.12,
        TOPTIERVOLUME24HOUR: 187309.58631538998,
        TOPTIERVOLUME24HOURTO: 369998381.3272407,
        CHANGE24HOUR: 109.67999999999984,
        CHANGEPCT24HOUR: 5.714345257322669,
        CHANGEDAY: 67.05999999999995,
        CHANGEPCTDAY: 3.4179408766564703,
        CHANGEHOUR: -6.440000000000055,
        CHANGEPCTHOUR: -0.31638418079096314,
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 115569329.874,
        MKTCAP: 234497104474.13843,
        MKTCAPPENALTY: 0,
        TOTALVOLUME24H: 6299810.1368930945,
        TOTALVOLUME24HTO: 12772628748.482437,
        TOTALTOPTIERVOLUME24H: 6239426.9936583815,
        TOTALTOPTIERVOLUME24HTO: 12650107727.870611,
        IMAGEURL: '/media/37746238/eth.png'
      }
    }
  },
  DISPLAY: {
    BTC: {
      USD: {
        FROMSYMBOL: 'Ƀ',
        TOSYMBOL: '$',
        MARKET: 'CryptoCompare Index',
        PRICE: '$ 54,221.4',
        LASTUPDATE: 'Just now',
        LASTVOLUME: 'Ƀ 0.005893',
        LASTVOLUMETO: '$ 319.42',
        LASTTRADEID: '159214069',
        VOLUMEDAY: 'Ƀ 19,181.8',
        VOLUMEDAYTO: '$ 1,026,580,307.0',
        VOLUME24HOUR: 'Ƀ 51,144.7',
        VOLUME24HOURTO: '$ 2,789,487,248.2',
        OPENDAY: '$ 53,803.4',
        HIGHDAY: '$ 54,662.3',
        LOWDAY: '$ 52,166.4',
        OPEN24HOUR: '$ 55,443.5',
        HIGH24HOUR: '$ 56,299.5',
        LOW24HOUR: '$ 52,073.1',
        LASTMARKET: 'Coinbase',
        VOLUMEHOUR: 'Ƀ 797.95',
        VOLUMEHOURTO: '$ 43,284,684.6',
        OPENHOUR: '$ 54,281.7',
        HIGHHOUR: '$ 54,411.5',
        LOWHOUR: '$ 54,062.9',
        TOPTIERVOLUME24HOUR: 'Ƀ 51,144.7',
        TOPTIERVOLUME24HOURTO: '$ 2,789,487,248.2',
        CHANGE24HOUR: '$ -1,222.08',
        CHANGEPCT24HOUR: '-2.20',
        CHANGEDAY: '$ 418.04',
        CHANGEPCTDAY: '0.78',
        CHANGEHOUR: '$ -60.31',
        CHANGEPCTHOUR: '-0.11',
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 'Ƀ 18,688,062.0',
        MKTCAP: '$ 1,013.29 B',
        MKTCAPPENALTY: '0 %',
        TOTALVOLUME24H: 'Ƀ 276.65 K',
        TOTALVOLUME24HTO: '$ 15.02 B',
        TOTALTOPTIERVOLUME24H: 'Ƀ 276.30 K',
        TOTALTOPTIERVOLUME24HTO: '$ 15.00 B',
        IMAGEURL: '/media/37746251/btc.png'
      },
      EUR: {
        FROMSYMBOL: 'Ƀ',
        TOSYMBOL: '€',
        MARKET: 'CryptoCompare Index',
        PRICE: '€ 45,113.8',
        LASTUPDATE: 'Just now',
        LASTVOLUME: 'Ƀ 0.009655',
        LASTVOLUMETO: '€ 435.50',
        LASTTRADEID: '166301467',
        VOLUMEDAY: 'Ƀ 3,017.49',
        VOLUMEDAYTO: '€ 135,344,755.4',
        VOLUME24HOUR: 'Ƀ 10,972.7',
        VOLUME24HOURTO: '€ 501,375,280.3',
        OPENDAY: '€ 44,767.8',
        HIGHDAY: '€ 45,432.7',
        LOWDAY: '€ 43,772.4',
        OPEN24HOUR: '€ 46,163.5',
        HIGH24HOUR: '€ 46,939.1',
        LOW24HOUR: '€ 43,697.2',
        LASTMARKET: 'Bitstamp',
        VOLUMEHOUR: 'Ƀ 214.85',
        VOLUMEHOURTO: '€ 9,798,724.4',
        OPENHOUR: '€ 45,153.0',
        HIGHHOUR: '€ 45,255.1',
        LOWHOUR: '€ 44,995.3',
        TOPTIERVOLUME24HOUR: 'Ƀ 10,972.7',
        TOPTIERVOLUME24HOURTO: '€ 501,375,280.3',
        CHANGE24HOUR: '€ -1,049.70',
        CHANGEPCT24HOUR: '-2.27',
        CHANGEDAY: '€ 346.04',
        CHANGEPCTDAY: '0.77',
        CHANGEHOUR: '€ -39.16',
        CHANGEPCTHOUR: '-0.09',
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 'Ƀ 18,688,062.0',
        MKTCAP: '€ 843.09 B',
        MKTCAPPENALTY: '0 %',
        TOTALVOLUME24H: 'Ƀ 276.65 K',
        TOTALVOLUME24HTO: '€ 12.49 B',
        TOTALTOPTIERVOLUME24H: 'Ƀ 276.30 K',
        TOTALTOPTIERVOLUME24HTO: '€ 12.47 B',
        IMAGEURL: '/media/37746251/btc.png'
      }
    },
    ETH: {
      USD: {
        FROMSYMBOL: 'Ξ',
        TOSYMBOL: '$',
        MARKET: 'CryptoCompare Index',
        PRICE: '$ 2,438.49',
        LASTUPDATE: 'Just now',
        LASTVOLUME: 'Ξ 0.06317',
        LASTVOLUMETO: '$ 153.98',
        LASTTRADEID: '101217804',
        VOLUMEDAY: 'Ξ 260,666.0',
        VOLUMEDAYTO: '$ 624,435,417.8',
        VOLUME24HOUR: 'Ξ 939,673.4',
        VOLUME24HOURTO: '$ 2,236,767,657.5',
        OPENDAY: '$ 2,357.58',
        HIGHDAY: '$ 2,453.18',
        LOWDAY: '$ 2,316.21',
        OPEN24HOUR: '$ 2,305.34',
        HIGH24HOUR: '$ 2,469.99',
        LOW24HOUR: '$ 2,237.25',
        LASTMARKET: 'Coinbase',
        VOLUMEHOUR: 'Ξ 14,607.5',
        VOLUMEHOURTO: '$ 35,696,026.8',
        OPENHOUR: '$ 2,446.69',
        HIGHHOUR: '$ 2,453.18',
        LOWHOUR: '$ 2,426.24',
        TOPTIERVOLUME24HOUR: 'Ξ 939,673.4',
        TOPTIERVOLUME24HOURTO: '$ 2,236,767,657.5',
        CHANGE24HOUR: '$ 133.15',
        CHANGEPCT24HOUR: '5.78',
        CHANGEDAY: '$ 80.91',
        CHANGEPCTDAY: '3.43',
        CHANGEHOUR: '$ -8.20',
        CHANGEPCTHOUR: '-0.34',
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 'Ξ 115,569,329.9',
        MKTCAP: '$ 281.81 B',
        MKTCAPPENALTY: '0 %',
        TOTALVOLUME24H: 'Ξ 6.30 M',
        TOTALVOLUME24HTO: '$ 15.31 B',
        TOTALTOPTIERVOLUME24H: 'Ξ 6.24 M',
        TOTALTOPTIERVOLUME24HTO: '$ 15.16 B',
        IMAGEURL: '/media/37746238/eth.png'
      },
      EUR: {
        FROMSYMBOL: 'Ξ',
        TOSYMBOL: '€',
        MARKET: 'CryptoCompare Index',
        PRICE: '€ 2,029.06',
        LASTUPDATE: 'Just now',
        LASTVOLUME: 'Ξ 0.1432',
        LASTVOLUMETO: '€ 290.43',
        LASTTRADEID: '1619069660.2362',
        VOLUMEDAY: 'Ξ 48,120.8',
        VOLUMEDAYTO: '€ 94,854,630.0',
        VOLUME24HOUR: 'Ξ 187,309.6',
        VOLUME24HOURTO: '€ 369,998,381.3',
        OPENDAY: '€ 1,962.00',
        HIGHDAY: '€ 2,041.79',
        LOWDAY: '€ 1,927.51',
        OPEN24HOUR: '€ 1,919.38',
        HIGH24HOUR: '€ 2,053.72',
        LOW24HOUR: '€ 1,866.75',
        LASTMARKET: 'Kraken',
        VOLUMEHOUR: 'Ξ 4,709.72',
        VOLUMEHOURTO: '€ 9,450,290.3',
        OPENHOUR: '€ 2,035.50',
        HIGHHOUR: '€ 2,041.79',
        LOWHOUR: '€ 2,020.12',
        TOPTIERVOLUME24HOUR: 'Ξ 187,309.6',
        TOPTIERVOLUME24HOURTO: '€ 369,998,381.3',
        CHANGE24HOUR: '€ 109.68',
        CHANGEPCT24HOUR: '5.71',
        CHANGEDAY: '€ 67.06',
        CHANGEPCTDAY: '3.42',
        CHANGEHOUR: '€ -6.44',
        CHANGEPCTHOUR: '-0.32',
        CONVERSIONTYPE: 'direct',
        CONVERSIONSYMBOL: '',
        SUPPLY: 'Ξ 115,569,329.9',
        MKTCAP: '€ 234.50 B',
        MKTCAPPENALTY: '0 %',
        TOTALVOLUME24H: 'Ξ 6.30 M',
        TOTALVOLUME24HTO: '€ 12.77 B',
        TOTALTOPTIERVOLUME24H: 'Ξ 6.24 M',
        TOTALTOPTIERVOLUME24HTO: '€ 12.65 B',
        IMAGEURL: '/media/37746238/eth.png'
      }
    }
  }
};
exports.cryptoData = cryptoData;
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "green": "_green_a83d8",
  "red": "_red_a83d8",
  "coins": "_coins_a83d8",
  "coinContainer": "_coinContainer_a83d8",
  "coinHeader": "_coinHeader_a83d8",
  "coinToFiatSelect": "_coinToFiatSelect_a83d8",
  "coinName": "_coinName_a83d8",
  "coinInfo": "_coinInfo_a83d8",
  "coinInfoBlock": "_coinInfoBlock_a83d8",
  "title": "_title_a83d8",
  "price": "_price_a83d8"
};
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _data = require("./data");

var _styles = _interopRequireDefault(require("./styles.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start from here
if (module.hot) {
  module.hot.accept();
}

window.dataStorage = {
  coinsData: _data.cryptoData['DISPLAY'],
  availableFiats: [],
  availableCoins: [],
  activeFiat: 'USD'
};

const startApp = () => {
  window.getAvailablePairs = () => {
    const {
      coinsData,
      availableFiats,
      availableCoins
    } = window.dataStorage;
    let findFirst = 0;

    for (let coin in coinsData) {
      availableCoins.push(coin);

      if (!findFirst) {
        for (let fiat in coinsData[coin]) {
          availableFiats.push(fiat);
        }
      }

      findFirst = 1;
    }
  };

  window.updateFiatCurrency = event => {
    let selectedFiat = event.options[event.selectedIndex].value;
    window.dataStorage['activeFiat'] = selectedFiat;
    window.renderApp();
  };

  window.renderApp = () => {
    document.getElementById('app-root').innerHTML = `
            ${App()}
        `;
  };

  window.getAvailablePairs();
  window.renderApp();
};

const renderCoins = () => {
  let view = '';
  const {
    coinsData,
    availableFiats
  } = window.dataStorage;

  for (let coin in coinsData) {
    view += `<div class="${_styles.default.coinContainer}" id="${coin}">
        ${generateCoinTitle(coin)}
        <div class="${_styles.default.coinInfo}">
          ${generateCoinInfo(coinsData[coin])}
        </div>
      </div>`;
  }

  return view;
};

const generateCoinTitle = coin => {
  let coinName;

  if (coin === 'BTC') {
    coinName = 'Bitcoin';
  } else {
    coinName = 'Ethereum';
  }

  return `
  <div class="${_styles.default.coinHeader}">
    <h2 class="${_styles.default.coinName}">${coinName}<span>${coin}</span></h2>
  </div>    
    `;
};

const generateCoinInfo = coinData => {
  let coinInfoBlock = '';
  const {
    activeFiat
  } = window.dataStorage;
  const {
    PRICE,
    CHANGEPCTDAY,
    VOLUMEDAYTO,
    MKTCAP
  } = coinData[activeFiat];
  let changePctDay_HTML;

  if (CHANGEPCTDAY >= 0) {
    changePctDay_HTML = `<span class="${_styles.default.green}">+${CHANGEPCTDAY}%</span>`;
  } else {
    changePctDay_HTML = `<span class="${_styles.default.red}">-${CHANGEPCTDAY}%</span>`;
  }

  coinInfoBlock += `<div class="${_styles.default.coinInfoBlock}">
                          <div class="${_styles.default.title}">Price</div>
                          <b class="${_styles.default.price}">${PRICE}</b>
                      </div>
                      <div class="${_styles.default.coinInfoBlock}">
                          <div class="${_styles.default.title}">24 HOUR % CHANGE</div>
                          <b>${changePctDay_HTML}</b>
                      </div>
                      <div class="${_styles.default.coinInfoBlock}">
                          <div class="${_styles.default.title}">MARKET CAP</div>
                          <b>${MKTCAP}</b>
                      </div>
                      <div class="${_styles.default.coinInfoBlock}">
                          <div class="${_styles.default.title}">VOLUME (24H)</div>
                          <b>${VOLUMEDAYTO}</b>
                      </div>
                      `;
  return coinInfoBlock;
};

const selectFiat = () => {
  let view = `<select class="${_styles.default.coinToFiatSelect}" onchange="(${window.updateFiatCurrency})(this)">`;
  const {
    activeFiat,
    availableFiats
  } = window.dataStorage;
  availableFiats.map(fiat => {
    if (fiat === activeFiat) {
      view += `<option value='${fiat}' selected>${fiat}</option>`;
    } else {
      view += `<option value='${fiat}'>${fiat}</option>`;
    }
  });
  view += '</select>';
  return view;
};

const App = () => {
  return `<div class="${_styles.default.coins}">
    ${selectFiat()}
    ${renderCoins()}
  </div>`;
};

const renderApp = () => {
  document.getElementById('app-root').innerHTML = `
          ${App()}
      `;
};

startApp();
},{"./data":"data.js","./styles.css":"styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64276" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/crypto-rate.e31bb0bc.js.map