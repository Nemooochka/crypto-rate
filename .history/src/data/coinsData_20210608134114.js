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

  return coinsDataUpd;
};

export const loadData = () => {
  // render();
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      coinsDataDisplay = data['DISPLAY'];
      coinsDataRaw = data['RAW'];
      return rearengeData(coinsDataDisplay);
    })
    .catch(error => {
      return Promise.resolve({});
    });
};

export const getAvailablePairs = ({setAvailableCoins, setAvailableFiats}) => {
  let findFirst = 0;
  let availableCoins, availableFiats;
  for (let coin in coinsDataDisplay) {
    setAvailableCoins(prevState => )
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
