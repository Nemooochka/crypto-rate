/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect, render } from '../framework';
import CoinsTable from './CoinsTable';
import { loadData, getAvailablePairs } from '../data/coinsData';

export default function useCoins() {
  const [coinsDataUpd, setCoinsDataUpd] = useState([]);
  const [availableCoins, setAvailableCoins] = useState(0);
  const [availableFiats, setAvailableFiats] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData()
      .then(data => {
        const { message, code } = data;

        if (code !== '200' && message) throw Error(message);

        setError(true);
        setCoinsDataUpd(data);
        setAvailableFiats(getAvailablePairs['fiats']);
      })
      .catch(setError)
      .finally(() => {
        setIsDataLoading(false);
      });
  }, []);

  return {
    coinsDataUpd,
    error,
    isDataLoading,
    availableFiats,
  };
}
