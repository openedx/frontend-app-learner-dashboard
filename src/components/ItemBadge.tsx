import { ReactElement } from 'react';
import classNames from 'classnames';
import { Badge } from '@openedx/paragon';
import { useIsPathwayPilotUIEnabled } from '@src/hooks';
import { isValidCssColor } from '@src/utils';

export interface ItemBadgeProps {
  categoryLabel: string | ReactElement;
  categoryBackgroundColor?: string;
  categoryTextColor?: string;
  // When set, the colors are expected to come from this class instead of the default utilities
  className?: string;
};

export const ItemBadge = ({
  categoryLabel,
  categoryBackgroundColor,
  categoryTextColor,
  className,
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
      // The default color utilities use !important, so they would override the custom colors
      className={classNames('p-1.5', className, {
        'bg-info-200 text-info-800': !hasCustomColors && !className,
      })}
      style={hasCustomColors ? {
        backgroundColor: categoryBackgroundColor,
        color: categoryTextColor,
      } : undefined}
    >
      {categoryLabel}
    </Badge>
  );
};
