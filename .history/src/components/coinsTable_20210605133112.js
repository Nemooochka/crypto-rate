/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import styles from '../styles.css';

import SelectFiat from './SelectFiat';
import Filters from './Filters';

export default function CoinsTable() {
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
      <div class={`thead ${styles.thead}`}>
        <div class={styles.tr}>
          {headers.map(elem => {
            return (
              <div
                class={`${styles.th} ${
                  elem.filter === window.dataStorage.activeFilter['attr']
                    ? window.dataStorage.activeFilter['classes'][0]
                    : ''
                } ${
                  elem.filter === window.dataStorage.activeFilter['attr']
                    ? window.dataStorage.activeFilter['classes'][1]
                    : ''
                }`}
                onclick={e => Filters(e.currentTarget)}
                data-filter={elem.filter}
              >
                <i class={styles.sortingIcon}></i>
                <span>{elem.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const GenerateCoinsTable = ({ coinData }) => {
    const { activeFiat } = window.dataStorage;
    const { PRICE, CHANGEPCTDAY, VOLUMEDAYTO, MKTCAP, coinName } = coinData[activeFiat];

    let changePctDay_HTML;
    if (CHANGEPCTDAY >= 0) {
      changePctDay_HTML = <span class={styles.green}>+{CHANGEPCTDAY}%</span>;
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

  const renderCoinsTable = () => {
    if (window.dataStorage.isDataLoading) {
      return <div class={styles.loading}">Data is loading</div>;
    }

    const {
      coinsDataDisplay,
      coinsDataUpd,
      availableFiats,
      filteredArr,
      activeFiat,
    } = window.dataStorage;

    let actualData = coinsDataUpd;
    if (filteredArr) actualData = filteredArr;

    // for (let coin in actualData) {
    //   view += `<div class="${styles.tr}" id="${actualData[coin][activeFiat]['coinName']}">
    //                 ${generateCoinsTable(actualData[coin])}
    //               </div>`;
    // }

    // view += '</div></div>';
    // return view;

    return (
      <div class={styles.coins}>
        <SelectFiat />
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
      </div>
    );
  };

  return renderCoinsTable();
}
