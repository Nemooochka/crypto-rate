/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import styles from '../styles.css';

window.updateFiatCurrency = selectedFiat => {
  window.dataStorage['activeFiat'] = selectedFiat;
  window.renderApp();
};

export default function SelectFiat() {
  // let view = `<select class="${styles.coinToFiatSelect}" onchange="window.updateFiatCurrency(this)">`;
  const { activeFiat, availableFiats } = window.dataStorage;

  return (
    <select class={styles.coinToFiatSelect} onchange={e => updateFiatCurrency(e.target.value)}>
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
