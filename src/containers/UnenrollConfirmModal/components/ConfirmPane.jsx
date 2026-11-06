import React from 'react';
import PropTypes from 'prop-types';
import { useCourseData } from '@src/hooks';
import { useCoursePathways } from '@src/hooks/usePathwayData';

import { FormattedMessage, useIntl } from '@openedx/frontend-base';
import {
  ActionRow,
  Button,
} from '@openedx/paragon';

import messages from './messages';

export const ConfirmPane = ({
  cardId,
  handleClose,
  handleConfirm,
}) => {
  const { formatList } = useIntl();
  const courseData = useCourseData(cardId);
  const pathways = useCoursePathways(cardId);
  // A course can be part of several pathways of the same category, so each category is listed once
  const categoryLabels = [...new Set(
    pathways.map(({ pathway }) => pathway.categoryLabelPlural).filter(Boolean),
  )];
  const courseName = courseData?.course?.courseName || '';
  const courseTitle = <span className="font-italic">“{courseName}”</span>;
  return (
    <>
      <h4>
        <FormattedMessage {...messages.confirmHeaderWithCourse} values={{ courseTitle }} />
      </h4>
      <p className="py-2">
        {categoryLabels.length > 0
          ? (
            <FormattedMessage
              {...messages.confirmTextWithPathways}
              values={{ categories: formatList(categoryLabels, { type: 'conjunction' }) }}
            />
          )
          : (
            <FormattedMessage {...messages.confirmText} values={{ courseTitle }} />
          )
        }
      </p>
      <ActionRow>
        <Button variant="tertiary" onClick={handleClose}>
          <FormattedMessage {...messages.confirmCancel} />
        </Button>
        <Button onClick={handleConfirm}>
          <FormattedMessage {...messages.confirmUnenroll} />
        </Button>
      </ActionRow>
    </>
  );
};
ConfirmPane.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
};

export default ConfirmPane;
