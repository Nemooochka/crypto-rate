/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, render } from '../framework';

import styles from '../styles.css';

const updateFiatCurrency = (selectedFiat, updateActiveFiat) => {
  window.dataStorage['activeFiat'] = selectedFiat;
  updateActiveFiat()
  render();
};

export default function SelectFiat({ activeFiat, updateActiveFiat }) {
  const availableFiats = ['USD', 'EUR'];
  // const { availableFiats } = window.dataStorage;
  console.log(activeFiat, updateActiveFiat);

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
