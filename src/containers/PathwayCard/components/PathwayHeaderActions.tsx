import { Badge, Stack } from "@openedx/paragon";
import { PathwayCardMenu } from "./PathwayCardMenu";
import { getConfig } from "@edx/frontend-platform";
import { usePathwayData } from "hooks/usePathwayData";
import { isValidCssColor } from "utils";

export const PathwayHeaderActions = ({ cardId } : { cardId: string }) => {
  const pathwayData = usePathwayData(cardId);
  const pathwayType = pathwayData.pathway.type;
  const typeBackgroundColor = pathwayData.pathway.typeBackgroundColor
  const typeTextColor = pathwayData.pathway.typeTextColor;

  const hasCustomColors = !!typeBackgroundColor
    && !!typeTextColor
    && isValidCssColor(typeBackgroundColor)
    && isValidCssColor(typeTextColor);

  return (
    <Stack direction="horizontal" gap={2}>
      {getConfig().ENABLE_PATHWAY_PILOT_UI && pathwayType?.trim() && (
        <Badge
          className="pathway-card-badge"
          style={hasCustomColors ? {
            backgroundColor: typeBackgroundColor,
            color: typeTextColor,
          } : undefined}
        >
          {pathwayType}
        </Badge>
      )}
      <PathwayCardMenu cardId={cardId} />
    </Stack>
  )
};
