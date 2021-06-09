/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';

import render from '../framework';

import styles from '../styles.css';

const updateFiatCurrency = selectedFiat => {
  window.dataStorage['activeFiat'] = selectedFiat;
  renderApp();
};

export default function SelectFiat() {
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
