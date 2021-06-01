import getCoinsUrl from './coinsAPI';

const loadData = url => {
  window.dataStorage.isDataLoading = true;
  window.renderApp();
  window.dataStorage.error = null;
  return fetch(url)
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

const startApp = () => {
  window.loadData(getCoinsUrl()).then(() => {
    window.getAvailablePairs();
    window.renderApp();
  });

  window.updateFiatCurrency = event => {
    let selectedFiat = event.options[event.selectedIndex].value;
    window.dataStorage['activeFiat'] = selectedFiat;
    window.renderApp();
  };
};
