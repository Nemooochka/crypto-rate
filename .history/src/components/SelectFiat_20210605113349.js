/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import styles from '../styles.css';

window.updateFiatCurrency = event => {
  let selectedFiat = event.options[event.selectedIndex].value;
  window.dataStorage['activeFiat'] = selectedFiat;
  window.renderApp();
};

export default function SelectFiat() {
  let view = `<select class="${styles.coinToFiatSelect}" onchange="window.updateFiatCurrency(this)">`;
  const { activeFiat, availableFiats } = window.dataStorage;

  // availableFiats.map(fiat => {
  //   if (fiat === activeFiat) {
  //     view += `<option value='${fiat}' selected>${fiat}</option>`;
  //   } else {
  //     view += `<option value='${fiat}'>${fiat}</option>`;
  //   }
  // });

  // view += '</select>';
  // return view;

  console.log(activeFiat, availableFiats);
  return (
    <div class="${styles.coinToFiatSelect}">
      {availableFiats.map(fiat => {
        console.log(fiat);
        if (fiat === activeFiat) {
          <span value="${fiat}" selected>{fiat}</span>;
        } else {
          <option value="${fiat}">{fiat}</option>;
        }
      })}
    </div>
  );
}
