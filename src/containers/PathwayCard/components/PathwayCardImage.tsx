import { CardImage } from "containers/DashboardCard/CardImage";
import { usePathwayData } from "hooks/usePathwayData";
import messages from "../messages";

export interface PathwayCardImageProps {
  cardId: string;
  orientation: string;
}

export const PathwayCardImage = ({ cardId, orientation }) => {
  const pathwayData = usePathwayData(cardId);
  
  const { homeUrl } = pathwayData.pathwayRun || {};
  const wrapperClassName = `pgn__card-wrapper-image-cap d-inline-block overflow-visible ${orientation}`;

  return (
    <a
      className={wrapperClassName}
      href={homeUrl}
      tabIndex={-1}
    >
      <CardImage
        bannerImgSrc={pathwayData.pathway?.bannerImgSrc}
        messages={messages}
      />
    </a>
  )
};
