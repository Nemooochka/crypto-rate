/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import CoinsTable from './CoinsTable';

export default function App() {
  const [activeFiat, setActiveFiat] = useState('USD');
  const [availableCoins, setAvailableCoins] = useState([]);
  
  // availableCoins: [],
  // activeFiat: 'USD',
  // isDataLoading: false,
  // error: null,
  // activeFilter: {
  //   attr: '',
  //   classes: [],
  // }

  return <CoinsTable activeFiat={activeFiat} />;
}
