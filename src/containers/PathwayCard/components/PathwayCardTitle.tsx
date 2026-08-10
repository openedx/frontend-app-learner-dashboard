import { usePathwayData } from 'hooks/usePathwayData';

export const PathwayCardTitle = ({ cardId }: { cardId: string }) => {
  const pathwayData = usePathwayData(cardId);
  const courseName = pathwayData.pathway.name;
  const homeUrl = pathwayData?.pathwayRun?.homeUrl;

  return (
    <h3>
      <a
        href={homeUrl}
        className="course-card-title"
        data-testid="PathwayCardTitle"
      >
          {courseName}
      </a>
    </h3>
  );
};
