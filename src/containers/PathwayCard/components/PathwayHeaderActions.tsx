import { Badge, Stack } from "@openedx/paragon";
import { PathwayCardMenu } from "./PathwayCardMenu";
import { getConfig } from "@edx/frontend-platform";
import { usePathwayData } from "hooks/usePathwayData";
import { isValidCssColor } from "utils";

export const PathwayHeaderActions = ({ cardId } : { cardId: string }) => {
  const pathwayData = usePathwayData(cardId);
  const pathwayCategory = pathwayData.pathway.categoryLabel;
  const categoryBackgroundColor = pathwayData.pathway.categoryBackgroundColor
  const categoryTextColor = pathwayData.pathway.categoryTextColor;

  const hasCustomColors = !!categoryBackgroundColor
    && !!categoryTextColor
    && isValidCssColor(categoryBackgroundColor)
    && isValidCssColor(categoryTextColor);

  return (
    <Stack direction="horizontal" gap={2}>
      {getConfig().ENABLE_PATHWAY_PILOT_UI && pathwayCategory?.trim() && (
        <Badge
          className="pathway-card-badge"
          style={hasCustomColors ? {
            backgroundColor: categoryBackgroundColor,
            color: categoryTextColor,
          } : undefined}
        >
          {pathwayCategory}
        </Badge>
      )}
      <PathwayCardMenu cardId={cardId} />
    </Stack>
  )
};
