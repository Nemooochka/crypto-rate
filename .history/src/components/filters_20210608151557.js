import render from '../framework';

export default function Filters({ activeElement, setActiveFilter }) {
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
  let activeFilterName;
  const { coinsDataUpd, activeFiat } = window.dataStorage;

  const activeElementFilter = activeElement.getAttribute('data-filter');
  filters.map(elem => {
    if (elem['filterName'] === activeElementFilter) activeFilterName = elem['value'];
  });

  if (!activeElement.classList.contains('active')) {
    document
      .querySelectorAll('div[data-filter]')
      .forEach(elem => elem.classList.remove('active', 'up', 'down'));
    activeElement.classList.add('active');
  }

  const formatNumberValue = number => {
    let numberValue = number.replace(/^\D+/g, '');
    numberValue = numberValue.replace(/,/g, '');

    return numberValue;
  };

  for (let data in coinsDataUpd) {
    if (activeFilterName === 'coinName') {
      filteredArr = coinsDataUpd.sort((a, b) =>
        a[activeFiat][activeFilterName].localeCompare(b[activeFiat][activeFilterName]),
      );
    } else {
      filteredArr = coinsDataUpd.sort(
        (a, b) => a[activeFiat][activeFilterName] - b[activeFiat][activeFilterName],
      );
    }
  }

  let classes = [];
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

  setActiveFilter({
    attr: activeElement.getAttribute('data-filter'),
    classes: classes,
  });
  // window.dataStorage.activeFilter = {
  //   attr: activeElement.getAttribute('data-filter'),
  //   classes: classes,
  // };

  window.dataStorage.filteredArr = filteredArr;

  render();
}
