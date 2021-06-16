import { useState, useEffect } from 'react';
import { loadData, getAvailablePairs } from './data/coinsData';

export default function useCoins() {
  const [coinsDataUpd, setCoinsDataUpd] = useState([]);
  const [availableFiats, setAvailableFiats] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState(null);

  const TEN_SEC_MS = 10000;

  function getData() {
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
  }

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, TEN_SEC_MS);

    return () => clearInterval(interval);
  }, []);

  return {
    coinsDataUpd,
    error,
    isDataLoading,
    availableFiats,
  };
}
