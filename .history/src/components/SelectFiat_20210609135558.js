/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, render } from '../framework';

import styles from '../styles.css';

const updateFiatCurrency = (selectedFiat, updateActiveFiat) => {
  updateActiveFiat(selectedFiat);
  render();
};

export default function SelectFiat({ activeFiat, updateActiveFiat }) {
  const availableFiats = ['USD', 'EUR'];

  return (
    <select
      class={styles.coinToFiatSelect}
      onchange={e => updateFiatCurrency(e.target.value, updateActiveFiat)}
    >
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
