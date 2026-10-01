import { PathwaysInCategoryData } from '@src/hooks/usePathwayData';
import { PathwaysList } from './PathwaysList';

export interface PathwaysPanelProps {
  pathwaysByCategory: PathwaysInCategoryData[];
};

export const PathwaysPanel = ({
  pathwaysByCategory,
}: PathwaysPanelProps) => (
  <>
    {pathwaysByCategory.map((pathwayList) => (
      pathwayList.categoryLabelPlural && pathwayList.pathways?.length
        ? (
            <div className="mb-5" key={pathwayList.categoryLabelPlural}>
              <PathwaysList {...pathwayList} />
            </div>
          )
        : null
    ))}
  </>
);
