import { Icon, Stack } from '@openedx/paragon';
import { PathwayData } from '@src/hooks/usePathwayData';
import { CardsStackIcon } from '@src/utils/icons/CardsStackIcon';
import { PathwayCard } from '../PathwayCard';

export interface PathwaysListProps {
  categoryLabelPlural: string;
  pathways: PathwayData[];
}

export const PathwaysList = ({
  categoryLabelPlural,
  pathways,
}: PathwaysListProps) => (
  <>
    <Stack direction="horizontal" gap={1} className="h3 mb-3">
      <Icon className='text-info-900' src={CardsStackIcon} />
      <span className="text-gray-700">
        {categoryLabelPlural}
      </span>
    </Stack>
    <Stack gap={2}>
      {pathways.map((pathway) => (
        <PathwayCard pathway={pathway} key={pathway.pathway.id} />
      ))}
    </Stack>
  </>
);
