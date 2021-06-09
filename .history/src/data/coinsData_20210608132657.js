import getCoinsUrl from './coinsAPI';
import render from '../framework';

const url = getCoinsUrl();
let coinsDataDisplay = [];
let coinsDataUpd = [];
let coinsDataRaw = [];

const rearengeData = coinsDataDisplay => {
  for (let coin in coinsDataDisplay) {
    for (let fiat in coinsDataDisplay[coin]) {
      coinsDataDisplay[coin][fiat]['coinName'] = coinsDataRaw[coin][fiat]['FROMSYMBOL'];
      coinsDataDisplay[coin][fiat]['coinPrice'] = coinsDataRaw[coin][fiat]['PRICE'];
      coinsDataDisplay[coin][fiat]['coinChange'] = coinsDataRaw[coin][fiat]['CHANGEPCTDAY'];
      coinsDataDisplay[coin][fiat]['coinCap'] = coinsDataRaw[coin][fiat]['MKTCAP'];
      coinsDataDisplay[coin][fiat]['coinVolume'] = coinsDataRaw[coin][fiat]['VOLUMEDAYTO'];
    }
    coinsDataUpd.push(coinsDataDisplay[coin]);
  }
};

export const loadData = () => {
  // render();
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      coinsDataDisplay = data['DISPLAY'];
      coinsDataRaw = data['RAW'];
      rearengeData(coinsDataDisplay);
      return coinsDataUpd;
    })
    .catch(error => {
      return Promise.resolve({});
    });
};

export const getAvailablePairs = () => {
  // const { coinsDataDisplay, availableFiats, availableCoins } = window.dataStorage;
  // let findFirst = 0;
  // for (let coin in coinsDataDisplay) {
  //   availableCoins.push(coin);
  //   for (let fiat in coinsDataDisplay[coin]) {
  //     if (!findFirst) {
  //       availableFiats.push(fiat);
  //     }
  //   }
  //   findFirst = 1;
  // }
  console.log('a');
};

export default function startApp() {
  const url = getCoinsUrl();
  loadData(url).then(() => {
    getAvailablePairs();
    render();
  });
}
