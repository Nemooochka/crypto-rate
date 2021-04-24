// Start from here

import { cryptoData } from './data';
import styles from './styles.css';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = {
  coinsData: cryptoData['DISPLAY'],
  availableFiats: [],
  availableCoins: [],
  activeFiat: 'USD',
};

const startApp = () => {
  window.getAvailablePairs = () => {
    const { coinsData, availableFiats, availableCoins } = window.dataStorage;
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
  const { coinsData, availableFiats } = window.dataStorage;

  for (let coin in coinsData) {
    view += `<div class="${styles.coinContainer}" id="${coin}">
        ${generateCoinTitle(coin)}
        <div class="${styles.coinInfo}">
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
  <div class="${styles.coinHeader}">
    <h2 class="${styles.coinName}">${coinName}<span>${coin}</span></h2>
  </div>    
    `;
};

const generateCoinInfo = coinData => {
  let coinInfoBlock = '';
  const { activeFiat } = window.dataStorage;
  const { PRICE, CHANGEPCTDAY, VOLUMEDAYTO, MKTCAP } = coinData[activeFiat];

  let changePctDay_HTML;
  if (CHANGEPCTDAY >= 0) {
    changePctDay_HTML = `<span class="${styles.green}">+${CHANGEPCTDAY}%</span>`;
  } else {
    changePctDay_HTML = `<span class="${styles.red}">-${CHANGEPCTDAY}%</span>`;
  }

  coinInfoBlock += `<div class="${styles.coinInfoBlock}">
                          <div class="${styles.title}">Price</div>
                          <b class="${styles.price}">${PRICE}</b>
                      </div>
                      <div class="${styles.coinInfoBlock}">
                          <div class="${styles.title}">24 HOUR % CHANGE</div>
                          <b>${changePctDay_HTML}</b>
                      </div>
                      <div class="${styles.coinInfoBlock}">
                          <div class="${styles.title}">MARKET CAP</div>
                          <b>${MKTCAP}</b>
                      </div>
                      <div class="${styles.coinInfoBlock}">
                          <div class="${styles.title}">VOLUME (24H)</div>
                          <b>${VOLUMEDAYTO}</b>
                      </div>
                      `;

  return coinInfoBlock;
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
    ${renderCoins()}
  </div>`;
};

const renderApp = () => {
  document.getElementById('app-root').innerHTML = `
          ${App()}
      `;
};

startApp();
