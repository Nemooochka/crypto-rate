/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment, useState, useEffect, render } from '../framework';
import CoinsTable from './CoinsTable';
import { loadData, getAvailablePairs } from '../data/coinsData';

export default function App() {
  const {
    coinsDataUpd,
    error,
    isDataLoading,
    availableFiats,
  } = 

  return (
    <CoinsTable
      error={error}
      isDataLoading={isDataLoading}
      availableFiats={availableFiats}
      coinsDataUpd={coinsDataUpd}
    />
  );
}
