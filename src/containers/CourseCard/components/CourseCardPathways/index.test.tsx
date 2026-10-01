import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';

import { PathwayData, useCoursePathways } from '@src/hooks/usePathwayData';
import { useVisiblePathways } from './hooks';
import { MorePathwaysPopover } from './MorePathwaysPopover';
import { CourseCardPathways } from '.';

jest.mock('@src/hooks/usePathwayData', () => ({
  useCoursePathways: jest.fn(),
}));

jest.mock('./hooks', () => ({
  useVisiblePathways: jest.fn(),
}));

jest.mock('./MorePathwaysPopover', () => ({
  MorePathwaysPopover: jest.fn(() => <div>MorePathwaysPopover</div>),
}));

const mockUseCoursePathways = useCoursePathways as jest.MockedFunction<typeof useCoursePathways>;
const mockUseVisiblePathways = useVisiblePathways as jest.MockedFunction<typeof useVisiblePathways>;

const buildPathway = (id: string, displayName: string, categoryTextColor?: string): PathwayData => ({
  pathway: {
    id,
    content: { displayName },
    courseCount: 3,
    categoryTextColor,
  },
});

const dataEngineering = buildPathway('pathway-1', 'Data Engineering Fundamentals');
const machineLearning = buildPathway('pathway-2', 'Introduction to Machine Learning', '#9B1766');
const loremIpsum = buildPathway('pathway-3', 'Lorem ipsum dolor sit amet');
const pathways = [dataEngineering, machineLearning, loremIpsum];

const mockSplit = (visiblePathways: PathwayData[], hiddenPathways: PathwayData[]) => {
  mockUseVisiblePathways.mockReturnValue({
    containerRef: { current: null },
    measureRef: { current: null },
    visiblePathways,
    hiddenPathways,
  });
};

const renderComponent = () => render(
  <IntlProvider locale="en">
    <CourseCardPathways cardId="card-1" />
  </IntlProvider>,
);

// The labels shown in the strip, leaving out the hidden copies used for measuring
const getVisibleLabels = (container: HTMLElement) => Array.from(
  container.querySelectorAll('.course-card-pathways-container > .course-card-pathways-label'),
);

describe('CourseCardPathways', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCoursePathways.mockReturnValue(pathways);
    mockSplit(pathways, []);
  });

  it('renders nothing when the course has no pathways', () => {
    mockUseCoursePathways.mockReturnValue([]);
    mockSplit([], []);
    const { container } = renderComponent();
    expect(container).toBeEmptyDOMElement();
  });

  it('gets the pathways of the card course', () => {
    renderComponent();
    expect(mockUseCoursePathways).toHaveBeenCalledWith('card-1');
    expect(mockUseVisiblePathways).toHaveBeenCalledWith(pathways);
  });

  it('renders the "Included in" label and every visible pathway', () => {
    const { container } = renderComponent();
    expect(screen.getByText('Included in')).toBeInTheDocument();
    expect(getVisibleLabels(container).map((label) => label.textContent)).toEqual([
      'Data Engineering Fundamentals',
      '•Introduction to Machine Learning',
      '•Lorem ipsum dolor sit amet',
    ]);
  });

  it('colors each label with its category text color, or the default color', () => {
    const { container } = renderComponent();
    const [defaultColorLabel, customColorLabel] = getVisibleLabels(container);
    expect(defaultColorLabel).toHaveClass('text-info-800');
    expect(customColorLabel).toHaveStyle({ color: '#9B1766' });
    expect(customColorLabel).not.toHaveClass('text-info-800');
  });

  it('does not render the popover nor truncate labels when every pathway fits', () => {
    const { container } = renderComponent();
    expect(MorePathwaysPopover).not.toHaveBeenCalled();
    expect(container.querySelector('.is-truncated')).not.toBeInTheDocument();
  });

  it('truncates the last visible label and passes the hidden pathways to the popover', () => {
    mockSplit([dataEngineering, machineLearning], [loremIpsum]);
    const { container } = renderComponent();

    const visibleLabels = getVisibleLabels(container);
    expect(visibleLabels).toHaveLength(2);
    expect(visibleLabels[0]).not.toHaveClass('is-truncated');
    expect(visibleLabels[1]).toHaveClass('is-truncated');

    expect(screen.getByText('MorePathwaysPopover')).toBeInTheDocument();
    expect(MorePathwaysPopover).toHaveBeenCalledWith({ pathways: [loremIpsum] }, expect.anything());
  });

  it('renders every pathway in the hidden row used for measuring', () => {
    mockSplit([dataEngineering], [machineLearning, loremIpsum]);
    const { container } = renderComponent();
    const measureRow = container.querySelector('.course-card-pathways-measure');
    expect(measureRow).toHaveAttribute('aria-hidden');
    expect(measureRow?.children).toHaveLength(pathways.length);
  });
});
