import moment from 'moment';

const dateFormatter = (formatDate, date) => formatDate(moment(date).toDate(), { year: 'numeric', month: 'long', day: '2-digit' });

export default dateFormatter;
