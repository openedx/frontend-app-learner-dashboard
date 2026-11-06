import { FormattedMessage } from '@openedx/frontend-base';
import { Stack } from '@openedx/paragon';

import CourseCardMenu from './CourseCardMenu';
import messages from '../messages';
import { CategoryBadge } from '@src/components/CategoryBadge';

export const CourseHeaderActions = ({ cardId }: { cardId: string }) => (
  <Stack direction="horizontal" gap={1}>
    <CategoryBadge
      categoryLabel={<FormattedMessage {...messages.courseBadge} />}
      className="text-dark-900 bg-light-500"
    />
    <CourseCardMenu cardId={cardId} />
  </Stack>
);

export default CourseHeaderActions;
