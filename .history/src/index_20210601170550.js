// Start from here

import App from './components/App';
import dataStore from './data/dataStore';
import startApp from './data/coinsData';

if (module.hot) {
  module.hot.accept();
}

window.dataStorage = dataStore;

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
