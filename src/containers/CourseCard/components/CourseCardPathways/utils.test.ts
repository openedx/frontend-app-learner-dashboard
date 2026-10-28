import { PathwayData } from '@src/hooks/usePathwayData';
import { getPathwayTextColor } from './utils';

const buildPathway = (categoryTextColor?: string): PathwayData => ({
  pathway: {
    id: 'pathway-1',
    content: { displayName: 'Test Pathway' },
    itemCount: 3,
    categoryTextColor,
  },
});

describe('getPathwayTextColor', () => {
  it('returns the category text color when it is a valid CSS color', () => {
    expect(getPathwayTextColor(buildPathway('#9B1766'))).toBe('#9B1766');
  });

  it('returns undefined when the category text color is missing or not a valid CSS color', () => {
    expect(getPathwayTextColor(buildPathway())).toBeUndefined();
    expect(getPathwayTextColor(buildPathway('not-a-color'))).toBeUndefined();
  });
});
