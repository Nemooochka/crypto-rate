/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import CoinsTable from './CoinsTable';

export default function App() {
  const [activeFiat, setActiveFiat] = useState('USD');
  const [availableCoins, setAvailableCoins] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeFilter = useState({
    
  })
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
