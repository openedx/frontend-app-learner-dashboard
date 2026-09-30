import { PathwayData } from '@src/hooks/usePathwayData';
import { PathwayCard } from '../PathwayCard';
import { Stack } from '@openedx/paragon';

export interface PathwaysListProps {
  categoryLabelPlural: string;
  pathways: PathwayData[];
}

export const PathwaysList = ({
  categoryLabelPlural,
  pathways,
}: PathwaysListProps) => (
  <div>
    <Stack direction="horizontal" gap={1} className="h3">
      <span className="text-gray-700">
        {categoryLabelPlural}
      </span>
    </Stack>
    <Stack gap={2}>
      {pathways.map((pathway) => (
        <PathwayCard pathway={pathway} key={pathway.pathway.id} />
      ))}
    </Stack>
  </div>
);
