import { FormattedMessage } from '@openedx/frontend-base';
import { Badge, Stack } from '@openedx/paragon';

import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import CourseCardMenu from './CourseCardMenu';
import messages from '../messages';

export const CourseHeaderActions = ({ cardId }: { cardId: string }) => (
  <Stack direction="horizontal" gap={1}>
    {useIsPathwayPilotUIEnabled() && (
      <Badge variant="light" className="p-1.5">
        <FormattedMessage {...messages.courseBadge} />
      </Badge>
    )}
    <CourseCardMenu cardId={cardId} />
  </Stack>
);

export default CourseHeaderActions;
