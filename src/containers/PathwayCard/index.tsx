import { FormattedMessage } from '@openedx/frontend-base';
import { Card, Icon, Stack } from '@openedx/paragon';
import { FormatListBulleted } from '@openedx/paragon/icons';
import { PathwayData } from '@src/hooks/usePathwayData';
import messages from './messages';
import { CategoryBadge } from '@src/components/CategoryBadge';

export const PathwayCard = ({ pathway }: { pathway: PathwayData }) => (
  <Card className='p-2' orientation="horizontal">
    <Card.Section>
      <h3 className="mb-1">
        {pathway.pathway.content.displayName}
      </h3>
      {pathway.provider && (
        <span className="small text-gray-500">
          {pathway.provider.name}
        </span>
      )}
    </Card.Section>
    <Card.Footer className="w-auto flex-shrink-0">
      <Stack direction="horizontal" gap={3}>
        <Stack direction="horizontal" gap={1}>
          <Icon src={FormatListBulleted} />
          <FormattedMessage
            {...messages.cardProgress}
            values={{
              completedCount: pathway.progress?.completedItemCount ?? 0,
              totalCount: pathway.pathway.itemCount,
            }}
          />
        </Stack>
        <CategoryBadge
          categoryLabel={pathway.pathway.categoryLabel}
          categoryBackgroundColor={pathway.pathway.categoryBackgroundColor}
          categoryTextColor={pathway.pathway.categoryTextColor}
        />
      </Stack>
    </Card.Footer>
  </Card>
);
