/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect, render } from '../framework';
import CoinsTable from './CoinsTable';
import { loadData, getAvailablePairs } from '../data/coinsData';

export default function App() {
  const [coinsDataUpd, setCoinsDataUpd] = useState([]);
  const [availableCoins, setAvailableCoins] = useState(0);
  const [availableFiats, setAvailableFiats] = useState(['USD', 'EUR']);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState({
    attr: '',
    classes: [],
  });

  useEffect(() => {
    setIsDataLoading(true);
    loadData()
      .then(data => {
        const { message, code } = data;

        if (code !== '200' && message) throw Error(message);

        setError(1);
        setCoinsDataUpd(data);
        // coinsDataUpd = [...coinsDataUpd, data];
        console.log(coinsDataUpd);
        // availableCoins.push(getAvailablePairs()['coin']);
        // availableFiats.push(getAvailablePairs()['fiat']);
      })
      .catch(setError)
      .finally(() => {
        setIsDataLoading(false);
        render();
      });
  });

  // availableCoins: [],
  // activeFiat: 'USD',
  // isDataLoading: false,
  // error: null,
  // activeFilter: {
  //   attr: '',
  //   classes: [],
  // }

  console.log(coinsDataUpd);
  return (
    <CoinsTable
      availableFiats={availableFiats}
      coinsDataUpd={coinsDataUpd}
      activeFilter={activeFilter}
    />
  );
}
