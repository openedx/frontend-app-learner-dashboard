import { FormattedMessage } from '@openedx/frontend-base';
import { Stack } from '@openedx/paragon';

import CourseCardMenu from './CourseCardMenu';
import messages from '../messages';
import { ItemBadge } from '@src/components/ItemBadge';
import { useIsPathwayPilotUIEnabled } from '@src/hooks';

export const CourseHeaderActions = ({ cardId }: { cardId: string }) => (
  <Stack direction="horizontal" gap={1}>
    {useIsPathwayPilotUIEnabled() && (
      <ItemBadge
        categoryLabel={<FormattedMessage {...messages.courseBadge} />}
        className="text-dark-900 bg-light-500"
      />
    )}
    <CourseCardMenu cardId={cardId} />
  </Stack>
);

export default CourseHeaderActions;
