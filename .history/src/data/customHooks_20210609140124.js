/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect } from '../framework';
import { loadData, getAvailablePairs } from '../data/coinsData';

export default function useCoins() {
  const [coinsDataUpd, setCoinsDataUpd] = useState([]);
  const [availableCoins, setAvailableCoins] = useState([]);
  const [availableFiats, setAvailableFiats] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData()
      .then(data => {
        const { message, code } = data;

        if (code !== '200' && message) throw Error(message);

        setError(null);
        setCoinsDataUpd(data);
        setAvailableFiats(getAvailablePairs()['fiat']);
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
