import { render, screen } from '@testing-library/react';
import { formatMessage } from '@src/testUtils';
import { IntlProvider } from '@openedx/frontend-base';
import { useCourseData } from '@src/hooks';
import { useCoursePathways } from '@src/hooks/usePathwayData';

import { ConfirmPane } from './ConfirmPane';
import messages from './messages';

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(),
}));

jest.mock('@src/hooks/usePathwayData', () => ({
  useCoursePathways: jest.fn(),
}));

const props = {
  cardId: 'cardId',
  handleClose: jest.fn().mockName('props.handleClose'),
  handleConfirm: jest.fn().mockName('props.handleConfirm'),
};

const createPathway = (id, categoryLabelPlural) => ({
  pathway: {
    id,
    content: { displayName: `Pathway ${id}` },
    courseCount: 4,
    categoryLabelPlural,
  },
});

const renderComponent = () => render(<IntlProvider locale="en"><ConfirmPane {...props} /></IntlProvider>);

describe('UnenrollConfirmModal ConfirmPane', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCourseData.mockReturnValue({
      course: {
        courseName: 'Test Course',
      },
    });
    useCoursePathways.mockReturnValue([]);
  });
  it('renders title with the course name', () => {
    renderComponent();
    expect(screen.getByRole('heading')).toHaveTextContent('Unenroll from “Test Course”?');
  });
  it('renders cancel button', () => {
    renderComponent();
    const cancelButton = screen.getByRole('button', { name: formatMessage(messages.confirmCancel) });
    expect(cancelButton).toBeInTheDocument();
  });
  it('renders unenroll button', () => {
    renderComponent();
    const unenrollButton = screen.getByRole('button', { name: formatMessage(messages.confirmUnenroll) });
    expect(unenrollButton).toBeInTheDocument();
  });
  it('renders the default text when the course is not part of any pathway', () => {
    renderComponent();
    expect(useCoursePathways).toHaveBeenCalledWith(props.cardId);
    expect(screen.getByText((text) => text.startsWith('Are you sure you want to unenroll'))).toBeInTheDocument();
    expect(screen.queryByText(/This course is part of/)).not.toBeInTheDocument();
  });
  it('renders the default text when the pathways of the course have no category', () => {
    useCoursePathways.mockReturnValue([createPathway('pathway-1')]);
    renderComponent();
    expect(screen.getByText((text) => text.startsWith('Are you sure you want to unenroll'))).toBeInTheDocument();
    expect(screen.queryByText(/This course is part of/)).not.toBeInTheDocument();
  });
  it('lists each category of the pathways of the course once', () => {
    useCoursePathways.mockReturnValue([
      createPathway('pathway-1', 'Bootcamps'),
      createPathway('pathway-2', 'Tutorials'),
      createPathway('pathway-3', 'Bootcamps'),
      createPathway('pathway-4'),
    ]);
    renderComponent();
    expect(screen.getByText(/^This course is part of Bootcamps and Tutorials you’re enrolled in\./)).toBeInTheDocument();
    expect(screen.queryByText(/Are you sure you want to unenroll/)).not.toBeInTheDocument();
  });
});
