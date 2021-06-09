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
    function a() {
      setIsDataLoading(true);
      console.log(isDataLoading);
    }
    a();
    loadData()
      .then(data => {
        const { message, code } = data;

        if (code !== '200' && message) throw Error(message);

        setError(1);
        
        console.log(isDataLoading);
        // coinsDataUpd.push(data);
        // availableCoins.push(getAvailablePairs()['coin']);
        // availableFiats.push(getAvailablePairs()['fiat']);
        console.log(availableCoins, availableFiats);
      })
      .catch(setError)
      .finally(() => {
        setIsDataLoading(false);
        render();
      });
  }, [coinsDataUpd]);

  // availableCoins: [],
  // activeFiat: 'USD',
  // isDataLoading: false,
  // error: null,
  // activeFilter: {
  //   attr: '',
  //   classes: [],
  // }
  return <CoinsTable availableFiats={availableFiats} />;
}
