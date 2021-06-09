import getCoinsUrl from './coinsAPI';

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
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      coinsDataDisplay = data['DISPLAY'];
      coinsDataRaw = data['RAW'];
      return rearengeData(coinsDataDisplay);
    })
    .catch(error => {
      return error;
    });
};

export const getAvailablePairs = () => {
  let findFirst = 0;
  let result = {
    coin: [],
    fiat: [],
  };
  for (let coin in coinsDataDisplay) {
    result['coin'].push(coin);
    for (let fiat in coinsDataDisplay[coin]) {
      if (!findFirst) {
        result['fiat'].push(fiat);
      }
    }
    findFirst = 1;
  }

  return result;
};

// export const getAvailablePairs = () => {
//   let findFirst = 0;
//   console.log(setAvailableFiats, setAvailableCoins);
//   for (let coin in coinsDataDisplay) {
//     setAvailableCoins(prevState => {
//       console.log(prevState, coin);
//     });
//     availableCoins.push(coin);
//     for (let fiat in coinsDataDisplay[coin]) {
//       if (!findFirst) {
//         availableFiats.push(fiat);
//       }
//     }
//     findFirst = 1;
//   }
// };

// export default function startApp() {
//   const url = getCoinsUrl();
//   loadData(url).then(() => {
//     getAvailablePairs();
//     render();
//   });
// }
