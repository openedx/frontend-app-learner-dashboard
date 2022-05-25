import InfoPopover from 'components/InfoPopover/messages';
import ResponseDisplay from 'containers/ResponseDisplay/messages';
import ResponseDisplayComponents from 'containers/ResponseDisplay/components/messages';
import CriterionContainer from 'containers/CriterionContainer/messages';
import ListView from 'containers/ListView/messages';
import ReviewActions from 'containers/ReviewActions/messages';
import ReviewActionsComponents from 'containers/ReviewActions/components/messages';
import Rubric from 'containers/Rubric/messages';
import ReviewModal from 'containers/ReviewModal/messages';
import ReviewErrors from 'containers/ReviewModal/ReviewErrors/messages';
import lms from 'data/services/lms/messages';

const mapMessages = (messages) => Object.keys(messages).reduce(
  (acc, key) => ({ ...acc, [key]: messages[key].defaultMessage }),
  {},
);

export default {
  InfoPopover: mapMessages(InfoPopover),
  ResponseDisplay: mapMessages(ResponseDisplay),
  ResponseDisplayComponents: mapMessages(ResponseDisplayComponents),
  CriterionContainer: mapMessages(CriterionContainer),
  ListView: mapMessages(ListView),
  ReviewActions: mapMessages(ReviewActions),
  ReviewActionsComponents: mapMessages(ReviewActionsComponents),
  Rubric: mapMessages(Rubric),
  ReviewModal: mapMessages(ReviewModal),
  ReviewErrors: mapMessages(ReviewErrors),
  lms: mapMessages(lms),
};
