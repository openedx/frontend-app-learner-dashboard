import { PathwayData } from '@src/hooks/usePathwayData';
import { getPathwayTextColor } from './utils';

const buildPathway = (categoryTextColor?: string): PathwayData => ({
  pathway: {
    id: 'pathway-1',
    content: { displayName: 'Test Pathway' },
    courseCount: 3,
    categoryTextColor,
  },
});

describe('getPathwayTextColor', () => {
  it('returns the category text color when it is a valid CSS color', () => {
    expect(getPathwayTextColor(buildPathway('#9B1766'))).toBe('#9B1766');
  });

  it('returns undefined when the category text color is missing', () => {
    expect(getPathwayTextColor(buildPathway())).toBeUndefined();
  });

  it('returns undefined when the category text color is empty', () => {
    expect(getPathwayTextColor(buildPathway(''))).toBeUndefined();
  });

  it('returns undefined when the category text color is not a valid CSS color', () => {
    expect(getPathwayTextColor(buildPathway('not-a-color'))).toBeUndefined();
  });
});
