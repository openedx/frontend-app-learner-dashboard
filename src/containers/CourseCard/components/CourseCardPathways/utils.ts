import { PathwayData } from '@src/hooks/usePathwayData';
import { isValidCssColor } from '@src/utils';

/**
 * Returns the custom text color of the pathway category badge, or undefined if it is missing
 * or not a valid CSS color, in which case the default color class must be used.
 */
export const getPathwayTextColor = (pathway: PathwayData) => {
  const { categoryTextColor } = pathway.pathway;
  return categoryTextColor && isValidCssColor(categoryTextColor) ? categoryTextColor : undefined;
};
