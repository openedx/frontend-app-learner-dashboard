import moment from 'moment';

// Force GMT+7 (Asia/Jakarta) display regardless of the viewer's browser/OS timezone.
export const dateFormatter = (formatDate, date) => formatDate(moment(date).toDate(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Jakarta',
});

export default dateFormatter;
