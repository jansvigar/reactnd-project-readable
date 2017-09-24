import moment from 'moment';

export const capitalize = str =>
  str.split(' ')
    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1));

export const convertUnixTimestampToDate = timestamp =>
  moment(timestamp).format('LLLL');

/* eslint-disable no-param-reassign, no-nested-ternary */
const compare = (a, b) => {
  const isNumber = typeof (a) === 'number' && typeof (b) === 'number';
  const isString = typeof (a) === 'string' && typeof (b) === 'string';

  if (isNumber) {
    return a - b;
  }

  if (isString) {
    a = a.toUpperCase();
    b = b.toUpperCase();
    return a < b
      ? -1
      : a > b
        ? 1 : 0;
  }

  return 0;
};

export const sort = (items = []) => (sortBy) => {
  const sortedItems = [].concat(items);
  sortedItems.sort((a, b) => {
    a = a[sortBy] || 0;
    b = b[sortBy] || 0;
    return compare(a, b);
  });

  return sortedItems;
};

/* eslint-enable no-param-reassign, no-nested-ternary */

export const redirectToReferrerOrHome = (locationState, history) => {
  if (locationState && locationState.prevPath) {
    history.push(locationState.prevPath.pathname);
  } else { history.push('/'); }
};
