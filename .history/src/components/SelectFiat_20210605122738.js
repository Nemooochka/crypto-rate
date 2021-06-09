/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import styles from '../styles.css';

window.updateFiatCurrency = event => {
  // let selectedFiat = event.options[event.selectedIndex].value;
  console.log(event, event.target, event.target.value);
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

  return (
    <select class={styles.coinToFiatSelect} onchange={e => updateFiatCurrency(e)}>
      {availableFiats.map(fiat => {
        if (fiat === activeFiat) {
          return (
            <option value={fiat} selected>
              {fiat}
            </option>
          );
        } else {
          return <option value={fiat}>{fiat}</option>;
        }
      })}
    </select>
  );
}
