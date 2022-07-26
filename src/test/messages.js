import CourseCardDetails from 'containers/CourseCard/components/CourseCardDetails/messages';

const mapMessages = (messages) => Object.keys(messages).reduce(
  (acc, key) => ({ ...acc, [key]: messages[key].defaultMessage }),
  {},
);

const mapMessagesWithValues = (messages) => Object.keys(messages).reduce(
  (acc, key) => ({
    ...acc,
    [key]: (values) => {
      let message = messages[key].defaultMessage;
      if (values) {
        Object.keys(values).forEach(valueKey => {
          message = message.replaceAll(`{${valueKey}}`, values[valueKey]);
        });
      }
      return message;
    },
  }),
  {},
);

export default {
  CourseCardDetails: mapMessages(CourseCardDetails),
  withValues: {
    CourseCardDetails: mapMessagesWithValues(CourseCardDetails),
  },
};
