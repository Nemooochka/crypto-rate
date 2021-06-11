import React, { useState } from 'react';

import styles from '../styles.css';

import SelectFiat from './SelectFiat';
import Filters from './Filters';

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

  const GenerateCoinsTableHeader = () => {
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
          {headers.map(elem => {
            return (
              <div
                className={`${styles.th} ${
                  elem.filter === activeFilter['attr'] ? activeFilter['classes'][0] : ''
                } ${elem.filter === activeFilter['attr'] ? activeFilter['classes'][1] : ''}`}
                onclick={e =>
                  Filters(
                    e.currentTarget,
                    coinsDataUpd,
                    activeFiat,
                    setActiveFilter,
                    setFilteredArr,
                  )
                }
                data-filter={elem.filter}
              >
                <i className={styles.sortingIcon}></i>
                <span>{elem.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const GenerateCoinsTable = ({ coinData }) => {
    const { PRICE, CHANGEPCTDAY, VOLUMEDAYTO, MKTCAP, coinName } = coinData[activeFiat];

    let changePctDay_HTML;
    if (CHANGEPCTDAY >= 0) {
      changePctDay_HTML = <span className={styles.green}>+{CHANGEPCTDAY}%</span>;
    } else {
      changePctDay_HTML = <span class={styles.red}>-{CHANGEPCTDAY}%</span>;
    }

    return (
      <>
        <div class={styles.td}>
          <b>{coinName}</b>
        </div>
        <div class={styles.td}>
          <b>{PRICE}</b>
        </div>
        <div class={styles.td}>
          <b>{changePctDay_HTML}</b>
        </div>
        <div class={styles.td}>
          <b>{MKTCAP}</b>
        </div>
        <div class={styles.td}>
          <b>{VOLUMEDAYTO}</b>
        </div>
      </>
    );
  };

  const RenderCoinsTable = () => {
    let actualData = coinsDataUpd;
    if (filteredArr) actualData = filteredArr;

    return (
      <div class={styles.coinsTable}>
        <GenerateCoinsTableHeader />
        <div class={styles.tbody}>
          {actualData.map(coin => {
            return (
              <div class={styles.tr} id={coin[activeFiat]['coinName']}>
                <GenerateCoinsTable coinData={coin} />
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
    <div class={styles.coins}>
      <SelectFiat
        availableFiats={availableFiats}
        activeFiat={activeFiat}
        updateActiveFiat={updateActiveFiat}
      />
      <RenderCoinsTable />
    </div>
  );
}
