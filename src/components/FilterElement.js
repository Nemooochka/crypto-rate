import React, { useRef } from 'react';

import filters from './filters';
import styles from '../styles.css';

export default function FilterElement({
  elem,
  index,
  coinsDataUpd,
  activeFiat,
  activeFilter,
  setActiveFilter,
  setFilteredArr,
}) {
  const clickedFilter = useRef();

  return (
    <a
      ref={clickedFilter}
      className={`${styles.th}
                      ${elem.filter === activeFilter.attr ? activeFilter.classes[0] : ''} ${
        elem.filter === activeFilter.attr ? activeFilter.classes[1] : ''
      }`}
      key={index}
      onClick={e =>
        filters(coinsDataUpd, activeFiat, setActiveFilter, setFilteredArr, clickedFilter)
      }
      data-filter={elem.filter}
    >
      <i className={styles.sortingIcon}></i>
      <span>{elem.title}</span>
    </a>
  );
}
