import { FormattedMessage } from '@openedx/frontend-base';
import { Card, Icon, Stack } from '@openedx/paragon';
import { FormatListBulleted } from '@openedx/paragon/icons';
import { PathwayData } from '@src/hooks/usePathwayData';
import messages from './messages';
import { CategoryBadge } from '@src/components/CategoryBadge';

import './index.scss';

export const PathwayCard = ({ pathway }: { pathway: PathwayData }) => (
  <Card className="dashboard-pathway-card">
    <Card.Header
      title={pathway.pathway.content.displayName}
      subtitle={pathway.provider?.name ?? null}
      actions={(
        <div className="d-flex justify-content-between" style={{ width: '250px' }}>
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
          {pathway.pathway.categoryLabel && (
            <CategoryBadge
              categoryLabel={pathway.pathway.categoryLabel}
              categoryBackgroundColor={pathway.pathway.categoryBackgroundColor}
              categoryTextColor={pathway.pathway.categoryTextColor}
            />
          )}
        </div>
      )}
    />
  </Card>
);
