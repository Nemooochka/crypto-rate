import getCoinsUrl from './coinsAPI';
import render from '../framework';

const url = getCoinsUrl();
let coinsDataDisplay = [];
let coinsDataUpd = [];

const rearengeData = coinsDataDisplay => {
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
};

export const loadData = () => {
  // render();
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('a');
      coinsDataDisplay = data['DISPLAY'];
      window.dataStorage.coinsDataRaw = data['RAW'];
      rearengeData(coinsDataDisplay);
      console.log(coinsDataDisplay, coinsDataUpd);
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
