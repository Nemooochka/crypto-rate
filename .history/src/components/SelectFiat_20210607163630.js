/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, setState, render } from '../framework';

import styles from '../styles.css';

const updateFiatCurrency = selectedFiat => {
  // window.dataStorage['activeFiat'] = selectedFiat;
  render();
};

export default function SelectFiat({ activeFiat, availableFiats }) {
  // const availableFiats = ['USD', 'EUR'];
  // const { availableFiats } = window.dataStorage;

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
