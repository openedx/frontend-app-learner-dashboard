import { PathwayData } from '@src/hooks/usePathwayData';
import { PathwaysList } from './PathwaysList';
import { Stack } from '@openedx/paragon';

export interface PathwaysPanelProps {
  pathwaysByCategory: {
    categoryLabelPlural: string;
    pathways: PathwayData[];
  }[];
};

export const PathwaysPanel = ({
  pathwaysByCategory,
}: PathwaysPanelProps) => (
  <Stack gap={2}>
    {pathwaysByCategory.map((pathwayList) => (
      pathwayList.categoryLabelPlural && pathwayList.pathways
        ? <PathwaysList {...pathwayList} key={pathwayList.categoryLabelPlural} />
        : null
    ))}
  </Stack>
);
