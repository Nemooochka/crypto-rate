import React from 'react';
import { render } from 'react-dom';

import styles from '../styles.css';

const updateFiatCurrency = (selectedFiat, updateActiveFiat) => {
  updateActiveFiat(selectedFiat);
  render();
};

export default function SelectFiat({ availableFiats, activeFiat, updateActiveFiat }) {
  return (
    <select
      className={styles.coinToFiatSelect}
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
