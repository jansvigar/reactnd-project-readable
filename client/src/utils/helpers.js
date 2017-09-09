import moment from 'moment';

export const capitalize = str =>
  str.split(' ')
    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1));

export const convertUnixTimestampToDate = timestamp =>
  moment(timestamp).format('MMMM Do, YYYY');
