/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import styles from '../styles.css';
import selectFiat from './SelectFiat';

import SelectFiat from './SelectFiat';

export default function CoinsTable() {
  const renderCoinsTable = () => {
    if (window.dataStorage.isDataLoading) {
      return <div class="${styles.loading}">Data is loading</div>;
    }
    let view = (
      // <div class="${styles.coins}"> <SelectFiat /><div class="${styles.coinsTable}"> <generateCoinsTableHeader /> <div class="${styles.tbody}"></div>
      // );
      <div> <SelectFiat /><div> <generateCoinsTableHeader /> <div></div>
      );


    const {
      coinsDataDisplay,
      coinsDataUpd,
      availableFiats,
      filteredArr,
      activeFiat,
    } = window.dataStorage;

    let actualData = coinsDataUpd;
    if (filteredArr) actualData = filteredArr;

    for (let coin in actualData) {
      view += `<div class="${styles.tr}" id="${actualData[coin][activeFiat]['coinName']}">
                    ${generateCoinsTable(actualData[coin])}
                  </div>`;
    }

    view += '</div></div>';
    return view;


    return (
      <div>
        
      </div>
      <selectFiat/>
    )
  };

  const generateCoinsTableHeader = () => {
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

    let view = `<div class="${styles.thead} thead">
                    <div class="${styles.tr}">`;

    headers.map(elem => {
      view += `<div class="
                ${styles.th}
                ${
                  elem.filter === window.dataStorage.activeFilter['attr']
                    ? window.dataStorage.activeFilter['classes'][0]
                    : ''
                }
                ${
                  elem.filter === window.dataStorage.activeFilter['attr']
                    ? window.dataStorage.activeFilter['classes'][1]
                    : ''
                }" onclick="window.Filters(this)" data-filter="${elem.filter}">
                <i class="${styles.sortingIcon}"></i>
                <span>${elem.title}</span>
            </div>`;
    });

    view += `</div></div>`;
    return view;
  };

  const generateCoinsTable = coinData => {
    let coinsTableBlock = '';
    const { activeFiat } = window.dataStorage;
    const { PRICE, CHANGEPCTDAY, VOLUMEDAYTO, MKTCAP, coinName } = coinData[activeFiat];

    let changePctDay_HTML;
    if (CHANGEPCTDAY >= 0) {
      changePctDay_HTML = `<span class="${styles.green}">+${CHANGEPCTDAY}%</span>`;
    } else {
      changePctDay_HTML = `<span class="${styles.red}">-${CHANGEPCTDAY}%</span>`;
    }

    coinsTableBlock += `
                          <div class="${styles.td}">
                              <b>${coinName}</b>
                          </div>
                          <div class="${styles.td}">
                              <b>${PRICE}</b>
                          </div>
                          <div class="${styles.td}">
                              <b>${changePctDay_HTML}</b>
                          </div>
                          <div class="${styles.td}">
                              <b>${MKTCAP}</b>
                          </div>
                          <div class="${styles.td}">
                              <b>${VOLUMEDAYTO}</b>
                          </div>
                          `;

    return coinsTableBlock;
  };

  // return renderCoinsTable();
  return renderCoinsTable();
}
