import styles from '../styles.css';

import updateFiatCurrency from './data/coinsData'

export default function selectFiat() {
  let view = `<select class="${styles.coinToFiatSelect}" onchange="window.updateFiatCurrency(this)">`;
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
}
