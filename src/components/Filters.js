import React from 'react';

export default function filters(
  coinsDataUpd,
  activeFiat,
  setActiveFilter,
  setFilteredArr,
  clickedFilter,
) {
  const filters = [
    {
      filterName: 'asset',
      value: 'coinName',
    },
    {
      filterName: 'price',
      value: 'coinPrice',
    },
    {
      filterName: 'returns',
      value: 'coinChange',
    },
    {
      filterName: 'cap',
      value: 'coinCap',
    },
    {
      filterName: 'volume',
      value: 'coinVolume',
    },
  ];

  let filteredArr = [];
  let classes = [];
  let activeElement = clickedFilter.current;

  const getActiveFilter = () => {
    const activeElementFilter = activeElement.getAttribute('data-filter');

    return filters.find(elem => {
      return elem.filterName === activeElementFilter;
    }).value;
  };

  const updateActiveElement = () => {
    if (!activeElement.classList.contains('active')) {
      document
        .querySelectorAll('div[data-filter]')
        .forEach(elem => elem.classList.remove('active', 'up', 'down'));
      activeElement.classList.add('active');
    }
  };

  const sortData = dataArray => {
    const activeFilterName = getActiveFilter();

    for (let data in dataArray) {
      if (activeFilterName === 'coinName') {
        filteredArr = dataArray.sort((a, b) =>
          a[activeFiat][activeFilterName].localeCompare(b[activeFiat][activeFilterName]),
        );
      } else {
        filteredArr = dataArray.sort(
          (a, b) => a[activeFiat][activeFilterName] - b[activeFiat][activeFilterName],
        );
      }
    }
  };

  const updateClasses = () => {
    if (activeElement.classList.contains('up')) {
      activeElement.classList.remove('up');
      activeElement.classList.add('down');
      classes = [];
      classes.push('active', 'down');
      filteredArr.reverse();
    } else {
      activeElement.classList.remove('down');
      activeElement.classList.add('up');
      classes = [];
      classes.push('active', 'up');
    }
  };

  sortData(coinsDataUpd);
  updateClasses();
  updateActiveElement();
  setActiveFilter({
    attr: activeElement.getAttribute('data-filter'),
    classes: classes,
  });
  setFilteredArr(filteredArr);
}
