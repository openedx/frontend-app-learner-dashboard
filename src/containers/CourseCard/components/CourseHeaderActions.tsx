import { FormattedMessage } from '@openedx/frontend-base';
import { Stack } from '@openedx/paragon';

import CourseCardMenu from './CourseCardMenu';
import messages from '../messages';
import { ItemBadge } from '@src/components/ItemBadge';

export const CourseHeaderActions = ({ cardId }: { cardId: string }) => (
  <Stack direction="horizontal" gap={1}>
    <ItemBadge
      categoryLabel={<FormattedMessage {...messages.courseBadge} />}
    />
    <CourseCardMenu cardId={cardId} />
  </Stack>
);

export default CourseHeaderActions;
