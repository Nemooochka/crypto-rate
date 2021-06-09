/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import CoinsTable from './CoinsTable';

export default function App() {
  const [availableFiats, setAvailableFiats] [],
  availableCoins: [],
  activeFiat: 'USD',
  isDataLoading: false,
  error: null,
  activeFilter: {
    attr: '',
    classes: [],
  }

  return <CoinsTable />;
}
