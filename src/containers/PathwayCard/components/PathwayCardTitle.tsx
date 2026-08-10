import { usePathwayData } from 'hooks/usePathwayData';

export const PathwayCardTitle = ({ cardId }: { cardId: string }) => {
  const pathwayData = usePathwayData(cardId);
  const name = pathwayData.pathway.content.displayName;
  const homeUrl = pathwayData?.pathwayRun?.homeUrl;

  return (
    <h3>
      <a
        href={homeUrl}
        className="dashboard-card-title"
        data-testid="PathwayCardTitle"
      >
        {name}
      </a>
    </h3>
  );
};
