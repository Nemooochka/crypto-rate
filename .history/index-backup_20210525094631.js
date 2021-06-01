// Start from here

import styles from './styles.css';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = {
  availableFiats: [],
  availableCoins: [],
  activeFiat: 'USD',
  isDataLoading: false,
  error: null,
  activeFilter: {
    attr: '',
    classes: [],
  },
};

window.loadData = url => {
  window.dataStorage.isDataLoading = true;
  window.renderApp();
  window.dataStorage.error = null;
  return fetch(url + `&api_key={${process.env.CRYPTO_API_KEY}}`)
    .then(response => response.json())
    .then(data => {
      window.dataStorage.isDataLoading = false;
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

const App = () => {
  return `<div class="${styles.coins}">
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
