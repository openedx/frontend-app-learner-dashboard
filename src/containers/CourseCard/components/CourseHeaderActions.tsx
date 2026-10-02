import { FormattedMessage } from '@openedx/frontend-base';
import { Stack } from '@openedx/paragon';

import CourseCardMenu from './CourseCardMenu';
import messages from '../messages';
import { ItemBadge } from '@src/components/ItemBadge';

export const CourseHeaderActions = ({ cardId }: { cardId: string }) => (
  <Stack direction="horizontal" gap={1}>
    <ItemBadge
      categoryLabel={<FormattedMessage {...messages.courseBadge} />}
      className="text-dark-900 bg-light-500"
    />
    <CourseCardMenu cardId={cardId} />
  </Stack>
);

export default CourseHeaderActions;
