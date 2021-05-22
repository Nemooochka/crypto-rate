// Start from here

import styles from './styles.css';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = {
  availableFiats: [],
  availableCoins: [],
  activeFiat: 'USD',
  isLoading: false,
  error: null,
  activeFilter: {
    attr: '',
    classes: [],
  },
};

window.loadData = url => {
  window.dataStorage.isLoading = true;
  window.renderApp();
  window.dataStorage.error = null;
  return fetch(url + `&api_key={${process.env.CRYPTO_API_KEY}}`)
    .then(response => response.json())
    .then(data => {
      window.dataStorage.isLoad
      window.dataStorage.coinsDataDisplay = data['DISPLAY'];
      window.dataStorage.coinsDataRaw = data['RAW'];
      window.rearengeData(window.dataStorage.coinsDataDisplay);
    })
    .catch(error => {
      window.dataStore.error = error;
      return Promise.resolve({});
    });
};

window.getAvailablePairs = () => {
  const { coinsDataDisplay, availableFiats, availableCoins } = window.dataStorage;
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

window.rearengeData = coinsDataDisplay => {
  let coinsDataUpd = [];
  for (let coin in coinsDataDisplay) {
    for (let fiat in coinsDataDisplay[coin]) {
      coinsDataDisplay[coin][fiat]['coinName'] =
        window.dataStorage.coinsDataRaw[coin][fiat]['FROMSYMBOL'];
      coinsDataDisplay[coin][fiat]['coinPrice'] =
        window.dataStorage.coinsDataRaw[coin][fiat]['PRICE'];
      coinsDataDisplay[coin][fiat]['coinChange'] =
        window.dataStorage.coinsDataRaw[coin][fiat]['CHANGEPCTDAY'];
      coinsDataDisplay[coin][fiat]['coinCap'] =
        window.dataStorage.coinsDataRaw[coin][fiat]['MKTCAP'];
      coinsDataDisplay[coin][fiat]['coinVolume'] =
        window.dataStorage.coinsDataRaw[coin][fiat]['VOLUMEDAYTO'];
    }
    coinsDataUpd.push(coinsDataDisplay[coin]);
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
};

window.filter = event => {
  const filters = [
    {
      filterName: 'asset',
      value: 'coinName',
    },
    {
      filterName: 'price',
      value: 'coinPrice',
    },
    {
      filterName: 'returns',
      value: 'coinChange',
    },
    {
      filterName: 'cap',
      value: 'coinCap',
    },
    {
      filterName: 'volume',
      value: 'coinVolume',
    },
  ];

  let filteredArr = [];
  let activeFilterName;
  const { coinsDataDisplay, coinsDataUpd, activeFiat } = window.dataStorage;

  const activeElement = event;
  const activeElementFilter = activeElement.getAttribute('data-filter');
  filters.map(elem => {
    if (elem['filterName'] === activeElementFilter) activeFilterName = elem['value'];
  });

  if (!activeElement.classList.contains('active')) {
    document
      .querySelectorAll('div[data-filter]')
      .forEach(elem => elem.classList.remove('active', 'up', 'down'));
    activeElement.classList.add('active');
  }

  const formatNumberValue = number => {
    let numberValue = number.replace(/^\D+/g, '');
    numberValue = numberValue.replace(/,/g, '');

    return numberValue;
  };

  for (let data in coinsDataUpd) {
    if (activeFilterName === 'coinName') {
      filteredArr = coinsDataUpd.sort((a, b) =>
        a[activeFiat][activeFilterName].localeCompare(b[activeFiat][activeFilterName]),
      );
    } else {
      filteredArr = coinsDataUpd.sort(
        (a, b) => a[activeFiat][activeFilterName] - b[activeFiat][activeFilterName],
      );
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
    classes: classes,
  };

  window.dataStorage.filteredArr = filteredArr;

  window.renderApp();
};

const renderCoinsTable = () => {
  let view = `<div class="${styles.coinsTable}"> ${generateCoinsTableHeader()} <div class="${
    styles.tbody
  }">`;
  const {
    coinsDataDisplay,
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
            ${
              elem.filter === window.dataStorage.activeFilter['attr']
                ? window.dataStorage.activeFilter['classes'][0]
                : ''
            }
            ${
              elem.filter === window.dataStorage.activeFilter['attr']
                ? window.dataStorage.activeFilter['classes'][1]
                : ''
            }" onclick="window.filter(this)" data-filter="${elem.filter}">
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

const loading = () => {
  if(window.dataStorage.isLoading) {
    document.getElementById('app-root').classList.add('loading');
    return `<div class="loading">Data is loading</div>`;
  } else {
    document.getElementById('app-root').classList.remove('loading');
  }
};

const App = () => {
  return `<div class="${styles.coins}">
    ${loading()}
    ${selectFiat()}
    ${renderCoinsTable()}
  </div>`;
};

window.renderApp = () => {
  document.getElementById('app-root').innerHTML = `
          ${App()}
      `;
};

startApp();

// const renderCoins = () => {
//   let view = '';
//   const { coinsDataDisplay, availableFiats } = window.dataStorage;

//   for (let coin in coinsDataDisplay) {
//     view += `<div class="${styles.coinContainer}" id="${coin}">
//         ${generateCoinTitle(coin)}
//         <div class="${styles.coinInfo}">
//           ${generateCoinInfo(coinsDataDisplay[coin])}
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
