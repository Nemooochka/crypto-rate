/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect, render } from '../framework';
import CoinsTable from './CoinsTable';
import { loadData, getAvailablePairs } from '../data/coinsData';

export default function App() {
  let coinsDataUpd = [];
  let isDataLoading = false;
  let availableCoins = [];
  let availableFiats = [];

  // const [coinsDataUpd, setCoinsDataUpd] = useState([]);
  // const [availableCoins, setAvailableCoins] = useState(0);
  // const [availableFiats, setAvailableFiats] = useState(['USD', 'EUR']);
  // let [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState({
    attr: '',
    classes: [],
  });

  useEffect(() => {
    isDataLoading = true;
    loadData()
      .then(data => {
        const { message, code } = data;

        if (code !== '200' && message) throw Error(message);

        setError(null);
        console.log(isDataLoading);
        setCoinsDataUpd(data);
        let a = getAvailablePairs()['coin'];
        console.log(setAvailableCoins);
        setAvailableCoins(prevState => prevState + 1);
        console.log(availableCoins);
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
