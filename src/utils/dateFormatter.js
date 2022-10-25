import moment from 'moment';

export const dateFormatter = (formatDate, date) => formatDate(moment(date).toDate(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default dateFormatter;
