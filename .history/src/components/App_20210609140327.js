/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect, render } from '../framework';
import CoinsTable from './CoinsTable';
import { loadData, getAvailablePairs } from '../data/coinsData';
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
