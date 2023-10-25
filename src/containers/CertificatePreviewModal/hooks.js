import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import messages from './messages';

export const useCertificatePreviewData = () => {
  const { formatMessage } = useIntl();

  const selectedCardId = reduxHooks.useCertificatePreviewData().cardId;

  const { courseId } = reduxHooks.useCardCourseRunData(selectedCardId) || {};

  const courseTitle = courseId;
  const header = formatMessage(messages.previewTitle, { courseTitle });

  const closePreviewModal = reduxHooks.useUpdateCertificatePreviewModalCallback(null);

  const getCertificatePreviewUrl = () => `${getConfig().LMS_BASE_URL}/certificates/upsell/course/${courseId}`;

  return {
    showModal: selectedCardId != null,
    header,
    closePreviewModal,
    getCertificatePreviewUrl,
  };
};

export default useCertificatePreviewData;
