export function getCoinsUrl(coins) {
    return `'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,ADA&tsyms=USD,EUR' ${}`
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
