import React from 'react';
import CoinsTable from './CoinsTable';
import useCoins from '../data/customHooks';

export default function App() {
  const { coinsDataUpd, error, isDataLoading, availableFiats } = useCoins();

  return (
    <CoinsTable
      error={error}
      isDataLoading={isDataLoading}
      availableFiats={availableFiats}
      coinsDataUpd={coinsDataUpd}
    />
  );
}
