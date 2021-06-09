/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState } from '../framework';
import CoinsTable from './CoinsTable';

export default function App() {
  const [coinsDataUpd, setCoinsDataUpd] = useState([]);
  const [activeFiat, setActiveFiat] = useState('USD');
  const [availableCoins, setAvailableCoins] = useState([]);
  const [availableFiats, setAvailableFiats] = useState(['USD', 'EUR']);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeFilter = useState({
    attr: '',
    classes: [],
  });
  // availableCoins: [],
  // activeFiat: 'USD',
  // isDataLoading: false,
  // error: null,
  // activeFilter: {
  //   attr: '',
  //   classes: [],
  // }

  return <CoinsTable activeFiat={activeFiat} ava/>;
}
