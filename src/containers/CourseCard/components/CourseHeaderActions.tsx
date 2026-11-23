import { FormattedMessage } from '@openedx/frontend-base';
import { Badge, Stack } from '@openedx/paragon';

import CourseCardMenu from './CourseCardMenu';
import messages from '../messages';

export const CourseHeaderActions = ({ cardId }: { cardId: string }) => (
  <Stack direction="horizontal" gap={1}>
    <Badge className="p-1.5 text-dark-900 bg-light-500">
      <FormattedMessage {...messages.courseBadge} />
    </Badge>
    <CourseCardMenu cardId={cardId} />
  </Stack>
);

export default CourseHeaderActions;
