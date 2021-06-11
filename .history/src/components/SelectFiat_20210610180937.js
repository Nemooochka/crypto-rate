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
      defaultValue={activeFiat}
      onChange={e => updateFiatCurrency(e.target.value, updateActiveFiat)}
    >
      {availableFiats.map((fiat, index) => (
        <option value={fiat}>{fiat}</option>
      ))}
    </select>
  );
}
