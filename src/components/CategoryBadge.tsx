import { ReactElement } from 'react';
import { Badge } from '@openedx/paragon';

export interface CategoryBadgeProps {
  categoryLabel: string | ReactElement;
  categoryBackgroundColor: string;
  categoryTextColor: string;
};

export const CategoryBadge = ({
  categoryLabel,
  categoryBackgroundColor,
  categoryTextColor,
}: CategoryBadgeProps) => (
  <Badge
    className="p-1.5"
    style={{
      backgroundColor: categoryBackgroundColor,
      color: categoryTextColor,
    }}
  >
    {categoryLabel}
  </Badge>
);
