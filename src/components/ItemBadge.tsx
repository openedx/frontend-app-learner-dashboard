import { ReactElement } from 'react';
import { Badge } from '@openedx/paragon';
import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import { isValidCssColor } from '@src/utils';

export interface ItemBadgeProps {
  categoryLabel: string | ReactElement;
  categoryBackgroundColor?: string;
  categoryTextColor?: string;
};

export const ItemBadge = ({
  categoryLabel,
  categoryBackgroundColor,
  categoryTextColor,
}: ItemBadgeProps) => {
  const hasCustomColors = !!categoryBackgroundColor
    && !!categoryTextColor
    && isValidCssColor(categoryBackgroundColor)
    && isValidCssColor(categoryTextColor);

  if (!useIsPathwayPilotUIEnabled()) {
    return null;
  }

  return (
    <Badge
      variant="light"
      className="p-1.5"
      style={hasCustomColors ? {
        backgroundColor: categoryBackgroundColor,
        color: categoryTextColor,
      } : undefined}
    >
      {categoryLabel}
    </Badge>
  );
};
