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

export function updateFiatCurrency(event) {
  let selectedFiat = event.options[event.selectedIndex].value;
  window.dataStorage['activeFiat'] = selectedFiat;
  window.renderApp();
}

export default function startApp() {
    const a = getCoinsUrl();
    console.log(a);
  loadData(a).then(() => {
    getAvailablePairs();
    window.renderApp();
  });
}
