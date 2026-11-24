import { PathwaysInCategoryData } from '@src/hooks/usePathwayData';
import { PathwaysList } from './PathwaysList';

export interface PathwaysPanelProps {
  pathwaysByCategory: PathwaysInCategoryData[];
};

export const PathwaysPanel = ({
  pathwaysByCategory,
}: PathwaysPanelProps) => (
  <>
    {pathwaysByCategory.map(({ pathways }) => {
      if (!pathways.length) {
        return null;
      }
      const { categoryLabelPlural } = pathways[0].pathway;
      return (
        <div className="mb-5" key={categoryLabelPlural}>
          <PathwaysList categoryLabelPlural={categoryLabelPlural} pathways={pathways} />
        </div>
      );
    })}
  </>
);
