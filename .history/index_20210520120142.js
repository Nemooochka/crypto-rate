// Start from here

import styles from './styles.css';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = {
  availableFiats: [],
  availableCoins: [],
  activeFiat: 'USD',
  newData: [],
  activeFilter: {
    attr: '',
    classes: [],
  },
};

window.loadData = url => {
  let a = url + `&api_key={${process.env.CRYPTO_API_KEY}}`;
  return fetch(url + `&api_key={${process.env.CRYPTO_API_KEY}}`)
    .then(response => response.json())
    .then(data => {
      window.dataStorage.coinsDataRaw = data['DISPLAY'];
      window.dataStorage.coinsDataFull = data['RAW'];
      window.rearengeData(window.dataStorage.coinsDataRaw);
    });
};

window.getAvailablePairs = () => {
  const { coinsDataRaw, availableFiats, availableCoins } = window.dataStorage;
  let findFirst = 0;
  for (let coin in coinsDataRaw) {
    availableCoins.push(coin);
    for (let fiat in coinsDataRaw[coin]) {
      if (!findFirst) {
        availableFiats.push(fiat);
      }
    }
    findFirst = 1;
  }
};

window.rearengeData = coinsDataRaw => {
  let coinsDataUpd = [];
  for (let coin in coinsDataRaw) {
    coinsDataUpd.push(coinsDataRaw[coin]);
    for (let fiat in coinsDataRaw[coin]) {
      console.log('0', fiat, coinsDataUpd, coinsDataRaw[coin]);
      // coinsDataUpd[fiat]['coinName'] = window.dataStorage.coinsDataFull[coin][fiat]['FROMSYMBOL'];
      // coinsDataUpd[fiat]['coinPrice'] = window.dataStorage.coinsDataFull[coin][fiat]['PRICE'];
      // coinsDataUpd[fiat]['coinChange'] = window.dataStorage.coinsDataFull[coin][fiat]['CHANGEPCTDAY'];
      // coinsDataUpd[fiat]['coinCap'] = window.dataStorage.coinsDataFull[coin][fiat]['MKTCAP'];
      // coinsDataUpd[fiat]['coinVolume'] = window.dataStorage.coinsDataFull[coin][fiat]['VOLUMEDAYTO'];
    }
    for (let fiat in coinsDataUpd) {
      console.log('1', fiat, coinsDataUpd);
      // coinsDataUpd[fiat]['coinName'] = window.dataStorage.coinsDataFull[coin][fiat]['FROMSYMBOL'];
      // coinsDataUpd[fiat]['coinPrice'] = window.dataStorage.coinsDataFull[coin][fiat]['PRICE'];
      // coinsDataUpd[fiat]['coinChange'] = window.dataStorage.coinsDataFull[coin][fiat]['CHANGEPCTDAY'];
      // coinsDataUpd[fiat]['coinCap'] = window.dataStorage.coinsDataFull[coin][fiat]['MKTCAP'];
      // coinsDataUpd[fiat]['coinVolume'] = window.dataStorage.coinsDataFull[coin][fiat]['VOLUMEDAYTO'];
    }
  }

  window.dataStorage.coinsDataUpd = coinsDataUpd;
};

const startApp = () => {
  window
    .loadData(
      'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,ADA&tsyms=USD,EUR',
    )
    .then(() => {
      window.getAvailablePairs();
      window.renderApp();
    });

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
};

window.filter = event => {
  const filters = [
    {
      filterName: 'asset',
      value: 'coinName'
    },
    {
      filterName: 'price',
      value: 'PRICE'
    },
    {
      filterName: 'returns',
      value: 'CHANGEPCTDAY'
    },
    {
      filterName: 'cap',
      value: 'MKTCAP'
    },
    {
      filterName: 'volume',
      value: 'VOLUMEDAYTO'
    }
  ]

  let filteredArr = [];
  let prevValue = 0;
  let activeFilterName;
  const { coinsDataRaw, coinsDataUpd, activeFiat } = window.dataStorage;

  const activeElement = event;
  const activeElementFilter = activeElement.getAttribute('data-filter');
  filters.map(elem => {
    if(elem['filterName'] === activeElementFilter) activeFilterName = elem['value'];
  });

  if (!activeElement.classList.contains('active')) {
    document
      .querySelectorAll('div[data-filter]')
      .forEach(elem => elem.classList.remove('active', 'up', 'down'));
    activeElement.classList.add('active');
  }

  const formatNumberValue = (number) => {
    let numberValue = number.replace(/^\D+/g, '');
    numberValue = numberValue.replace(/,/g, '');

    return numberValue;
  }

  for (let data in coinsDataUpd) {
    let numberValue = coinsDataUpd[data][activeFiat][activeFilterName].replace(/^\D+/g, '');
    numberValue = numberValue.replace(/,/g, '');

    console.log(coinsDataUpd, numberValue);
    filteredArr = coinsDataUpd.sort(function(a,b) {
      console.log(a,b);
    });
    // if (numberValue > prevValue) {
    //   filteredArr.unshift(coinsDataUpd[data]);
    //   prevValue = numberValue;
    // } else {
    //   filteredArr.push(coinsDataUpd[data]);
    // }
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
    classes: classes,
  };

  console.log(filteredArr);
  window.dataStorage.filteredArr = filteredArr;

  window.renderApp();
};

const renderCoinsTable = () => {
  let view = `<div class="${styles.coinsTable}"> ${generateCoinsTableHeader()} <div class="${
    styles.tbody
  }">`;
  const {
    coinsDataRaw,
    coinsDataUpd,
    availableFiats,
    filteredArr,
    activeFiat,
  } = window.dataStorage;

  let actualData = coinsDataUpd;
  if (filteredArr) actualData = filteredArr;

  for (let coin in actualData) {
    view += `<div class="${styles.tr}" id="${actualData[coin][activeFiat]['coinName']}">
        ${generateCoinsTable(actualData[coin])}
      </div>`;
  }

  view += '</div></div>';
  return view;
};

const generateCoinsTableHeader = () => {
  const headers = [
    {
      title: 'Asset',
      filter: 'asset',
    },
    {
      title: 'Price',
      filter: 'price',
    },
    {
      title: 'Returns (24h)',
      filter: 'returns',
    },
    {
      title: 'Market Cap',
      filter: 'cap',
    },
    {
      title: 'Total Exchange Volume',
      filter: 'volume',
    },
  ];

  let view = `<div class="${styles.thead} thead">
                <div class="${styles.tr}">`;

  headers.map(elem => {
      view += `<div class="
            ${styles.th}
            ${elem.filter === window.dataStorage.activeFilter['attr'] ? window.dataStorage.activeFilter['classes'][0] : ''}
            ${elem.filter === window.dataStorage.activeFilter['attr'] ? window.dataStorage.activeFilter['classes'][1] : ''}" onclick="(${window.filter})(this)" data-filter="${elem.filter}">
            <i class="${styles.sortingIcon}"></i>
            <span>${elem.title}</span>
        </div>`;
  });

  view += `</div></div>`;
  return view;

  // return `
  // <div class="${styles.thead} thead">
  // <div class="${styles.tr}">
  //   <div class="${styles.th}" onclick="(${window.filter})(this)" data-filter="asset">
  //     <span>Asset</span>
  //   </div>
  //   <div class="${styles.th}" onclick="(${window.filter})(this)" data-filter="price">
  //     <i class="${styles.sortingIcon}"></i>
  //     <span>Price</span>
  //   </div>
  //   <div class="${styles.th}" onclick="(${window.filter})(this)" data-filter="returns">
  //     <i class="${styles.sortingIcon}"></i>
  //     <span>Returns (24h)</span>
  //   </div>
  //   <div class="${styles.th}" onclick="(${window.filter})(this)" data-filter="cap">
  //     <i class="${styles.sortingIcon}"></i>
  //     <span>Market Cap</span>
  //   </div>
  //   <div class="${styles.th}" onclick="(${window.filter})(this)" data-filter="volume">
  //     <i class="${styles.sortingIcon}"></i>
  //     <span>Total Exchange Volume</span>
  //   </div>
  //   </div>
  // </div>
  //   `;
};

const generateCoinsTable = coinData => {
  let coinsTableBlock = '';
  const { activeFiat } = window.dataStorage;
  const { PRICE, CHANGEPCTDAY, VOLUMEDAYTO, MKTCAP, coinName } = coinData[activeFiat];

  let changePctDay_HTML;
  if (CHANGEPCTDAY >= 0) {
    changePctDay_HTML = `<span class="${styles.green}">+${CHANGEPCTDAY}%</span>`;
  } else {
    changePctDay_HTML = `<span class="${styles.red}">-${CHANGEPCTDAY}%</span>`;
  }

  coinsTableBlock += `
                      <div class="${styles.td}">
                          <b>${coinName}</b>
                      </div>
                      <div class="${styles.td}">
                          <b>${PRICE}</b>
                      </div>
                      <div class="${styles.td}">
                          <b>${changePctDay_HTML}</b>
                      </div>
                      <div class="${styles.td}">
                          <b>${MKTCAP}</b>
                      </div>
                      <div class="${styles.td}">
                          <b>${VOLUMEDAYTO}</b>
                      </div>
                      `;

  return coinsTableBlock;
};

const selectFiat = () => {
  let view = `<select class="${styles.coinToFiatSelect}" onchange="(${window.updateFiatCurrency})(this)">`;
  const { activeFiat, availableFiats } = window.dataStorage;

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
  return `<div class="${styles.coins}">
    ${selectFiat()}
    ${renderCoinsTable()}
  </div>`;
};

const renderApp = () => {
  document.getElementById('app-root').innerHTML = `
          ${App()}
      `;
};

startApp();

// const renderCoins = () => {
//   let view = '';
//   const { coinsDataRaw, availableFiats } = window.dataStorage;

//   for (let coin in coinsDataRaw) {
//     view += `<div class="${styles.coinContainer}" id="${coin}">
//         ${generateCoinTitle(coin)}
//         <div class="${styles.coinInfo}">
//           ${generateCoinInfo(coinsDataRaw[coin])}
//         </div>
//       </div>`;
//   }

//   return view;
// };

// const generateCoinTitle = coin => {
//   let coinName;
//   if (coin === 'BTC') {
//     coinName = 'Bitcoin';
//   } else {
//     coinName = 'Ethereum';
//   }

//   return `
//   <div class="${styles.coinHeader}">
//     <h2 class="${styles.coinName}">${coinName}<span>${coin}</span></h2>
//   </div>
//     `;
// };

// const generateCoinInfo = coinData => {
//   let coinInfoBlock = '';
//   const { activeFiat } = window.dataStorage;
//   const { PRICE, CHANGEPCTDAY, VOLUMEDAYTO, MKTCAP } = coinData[activeFiat];

//   let changePctDay_HTML;
//   if (CHANGEPCTDAY >= 0) {
//     changePctDay_HTML = `<span class="${styles.green}">+${CHANGEPCTDAY}%</span>`;
//   } else {
//     changePctDay_HTML = `<span class="${styles.red}">-${CHANGEPCTDAY}%</span>`;
//   }

//   coinInfoBlock += `<div class="${styles.coinInfoBlock}">
//                           <div class="${styles.title}">Price</div>
//                           <b class="${styles.price}">${PRICE}</b>
//                       </div>
//                       <div class="${styles.coinInfoBlock}">
//                           <div class="${styles.title}">24 HOUR % CHANGE</div>
//                           <b>${changePctDay_HTML}</b>
//                       </div>
//                       <div class="${styles.coinInfoBlock}">
//                           <div class="${styles.title}">MARKET CAP</div>
//                           <b>${MKTCAP}</b>
//                       </div>
//                       <div class="${styles.coinInfoBlock}">
//                           <div class="${styles.title}">VOLUME (24H)</div>
//                           <b>${VOLUMEDAYTO}</b>
//                       </div>
//                       `;

//   return coinInfoBlock;
// };
