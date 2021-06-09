/** @jsx createElement */
/** @jsxFrag createFragment */
import { loadData } from '../data/coinsData';
import { createElement, createFragment, useState, useEffect } from '../framework';
import CoinsTable from './CoinsTable';
import { startApp, loadData } from '../data/coinsData';

export default function App() {
  const [coinsDataUpd, setCoinsDataUpd] = useState([]);
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

  useEffect(() => {
    startApp();
  });

  return <CoinsTable availableFiats={availableFiats} />;
}
