import { FormattedMessage } from '@openedx/frontend-base';
import { Card, Icon, Stack } from '@openedx/paragon';
import { FormatListBulleted } from '@openedx/paragon/icons';
import { PathwayData } from '@src/hooks/usePathwayData';
import messages from './messages';
import { ItemBadge } from '@src/components/ItemBadge';

export const PathwayCard = ({ pathway }: { pathway: PathwayData }) => (
  <Card>
    <Card.Header
      title={pathway.pathway.content.displayName}
      subtitle={pathway.provider?.name ?? null}
      actions={(
        <Stack direction="horizontal">
          <Stack direction="horizontal" gap={1}>
            <Icon src={FormatListBulleted} />
            <FormattedMessage
              {...messages.cardProgress}
              values={{
                completedCount: pathway.progress?.completedCourseCount ?? 0,
                totalCount: pathway.pathway.courseCount,
              }}
            />
          </Stack>
          {pathway.pathway.categoryLabel && (
            <ItemBadge
              categoryLabel={pathway.pathway.categoryLabel}
              categoryBackgroundColor={pathway.pathway.categoryBackgroundColor}
              categoryTextColor={pathway.pathway.categoryTextColor}
            />
          )}
        </Stack>
      )}
    />
  </Card>
);
