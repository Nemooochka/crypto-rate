import getCoinsUrl from './coinsAPI';
import render from '../framework';

const url = getCoinsUrl();

const rearengeData = coinsDataDisplay => {
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

export const loadData = ()) => {
  window.dataStorage.isDataLoading = true;
  render();
  window.dataStorage.error = null;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      window.dataStorage.isDataLoading = false;
      window.dataStorage.coinsDataDisplay = data['DISPLAY'];
      window.dataStorage.coinsDataRaw = data['RAW'];
      rearengeData(window.dataStorage.coinsDataDisplay);
    })
    .catch(error => {
      window.dataStore.error = error;
      return Promise.resolve({});
    });
};

const getAvailablePairs = () => {
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

export default function startApp() {
  const url = getCoinsUrl();
  loadData(url).then(() => {
    getAvailablePairs();
    render();
  });
}
