import moment from 'moment';
export const parseDateOnly = (value) => {
  if (!value) {
    return null;
  }
  const [datePart] = String(value).split('T');
  const parts = datePart.split('-').map(Number);
  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return new Date(value);
  }
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
};

export const dateFormatter = (formatDate, date) => formatDate(moment(date).toDate(), {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const shortDateFormatter = (formatDate, date) => formatDate(moment(date).toDate(), {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export default dateFormatter;
