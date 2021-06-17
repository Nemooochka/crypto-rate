import React, { useState, useRef } from 'react';

import styles from '../styles.css';

import SelectFiat from './SelectFiat';
import FilterElement from './FilterElement';

export default function CoinsTable({ error, isDataLoading, availableFiats, coinsDataUpd }) {
  const [activeFiat, setActiveFiat] = useState('USD');
  const [filteredArr, setFilteredArr] = useState(null);
  const [activeFilter, setActiveFilter] = useState({
    attr: '',
    classes: [],
  });

  const updateActiveFiat = fiat => {
    setActiveFiat(fiat);
  };

  const CoinsTableHeader = () => {
    const headers = [
      {
        title: 'Asset',
        filter: 'asset',
      },
      {
        title: 'Price',
        filter: 'price',
      },
      {
        title: 'Returns (24h)',
        filter: 'returns',
      },
      {
        title: 'Market Cap',
        filter: 'cap',
      },
      {
        title: 'Total Exchange Volume',
        filter: 'volume',
      },
    ];

    return (
      <div className={`thead ${styles.thead}`}>
        <div className={styles.tr}>
          {headers.map((elem, index) => {
            return (
              <FilterElement
                elem={elem}
                index={index}
                coinsDataUpd={coinsDataUpd}
                activeFiat={activeFiat}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                setFilteredArr={setFilteredArr}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const CoinsTableBodyRow = ({ coinData }) => {
    const { PRICE, CHANGEPCTDAY, VOLUMEDAYTO, MKTCAP, coinName } = coinData[activeFiat];

    let percentChangeToday;
    if (CHANGEPCTDAY >= 0) {
      percentChangeToday = <span className={styles.green}>+{CHANGEPCTDAY}%</span>;
    } else {
      percentChangeToday = <span className={styles.red}>-{CHANGEPCTDAY}%</span>;
    }

    return (
      <>
        <div className={styles.td}>
          <b>{coinName}</b>
        </div>
        <div className={styles.td}>
          <b>{PRICE}</b>
        </div>
        <div className={styles.td}>
          <b>{percentChangeToday}</b>
        </div>
        <div className={styles.td}>
          <b>{MKTCAP}</b>
        </div>
        <div className={styles.td}>
          <b>{VOLUMEDAYTO}</b>
        </div>
      </>
    );
  };

  const RenderCoinsTable = () => {
    let actualData = coinsDataUpd;
    if (filteredArr) actualData = filteredArr;

    return (
      <div className={styles.coinsTable}>
        <CoinsTableHeader />
        <div className={styles.tbody}>
          {actualData.map((coin, index) => {
            return (
              <div className={styles.tr} key={index} id={coin[activeFiat].coinName}>
                <CoinsTableBodyRow coinData={coin} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.coins}>
      <SelectFiat
        availableFiats={availableFiats}
        activeFiat={activeFiat}
        updateActiveFiat={updateActiveFiat}
      />
      <RenderCoinsTable />
    </div>
  );
}
