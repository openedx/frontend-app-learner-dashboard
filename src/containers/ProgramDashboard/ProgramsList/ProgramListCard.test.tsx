import { render, RenderResult, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import ProgramListCard from './ProgramListCard';
import { ProgramData } from '../data/types';

jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ children, ...props }) => <a {...props}>{children}</a>),
}));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    LMS_BASE_URL: 'test-base-url',
  })),
}));

const mockBaseProgram = {
  uuid: 'test-uuid',
  title: 'test-title',
  type: 'test-type',
  bannerImage: {
    xSmall: { url: 'banner-xSmall.jpg', width: 348, height: 116 },
    small: { url: 'banner-small.jpg', width: 435, height: 145 },
    medium: { url: 'banner-medium.jpg', width: 726, height: 242 },
    large: { url: 'banner-large.jpg', width: 1440, height: 480 },
  },
  authoringOrganizations: [
    {
      uuid: 'org-uuid-1',
      key: 'test-key',
      name: 'test-org-1',
      logoImageUrl: 'test-logo.png',
      certificateLogoImageUrl: 'test-cert-logo.png',
    },
  ],
  progress: {
    inProgress: 1,
    notStarted: 2,
    completed: 3,
  },
};

const mockMultipleOrgProgram = {
  ...mockBaseProgram,
  authoringOrganizations: [
    {
      uuid: 'org-uuid-1',
      name: 'MIT',
      key: 'MITx',
      logoImageUrl: 'mit-logo.png',
      certificateLogoImageUrl: 'mit-cert-logo-1.png',
    },
    {
      uuid: 'org-uuid-2',
      name: 'Harvard',
      key: 'Harvardx',
      logoImageUrl: 'harvard-logo.png',
      certificateLogoImageUrl: 'harvard-cert-logo-2.png',
    },
  ],
};

describe('ProgramListCard', () => {
  const renderComponent = (programData: ProgramData = mockBaseProgram): RenderResult => render(
    <IntlProvider locale="en">
      <ProgramListCard program={programData} />
    </IntlProvider>,
  );

  it('renders all data for program', () => {
    renderComponent();
    expect(screen.getByText(mockBaseProgram.title)).toBeInTheDocument();
    expect(screen.getByText(mockBaseProgram.type)).toBeInTheDocument();
    expect(screen.getByText(mockBaseProgram.authoringOrganizations[0].key)).toBeInTheDocument();
    const logoImageNode = screen.getByAltText(mockBaseProgram.authoringOrganizations[0].key);
    expect(logoImageNode).toHaveAttribute('src', mockBaseProgram.authoringOrganizations[0].logoImageUrl);
    expect(screen.getByText(mockBaseProgram.progress.inProgress)).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText(mockBaseProgram.progress.completed)).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText(mockBaseProgram.progress.notStarted)).toBeInTheDocument();
    expect(screen.getByText('Remaining')).toBeInTheDocument();
  });

  it('renders names of all organizations when more than one', () => {
    renderComponent(mockMultipleOrgProgram);
    const aggregatedOrganizations = mockMultipleOrgProgram.authoringOrganizations.map(org => org.key).join(', ');
    expect(screen.getByText(aggregatedOrganizations)).toBeInTheDocument();
  });

  it('doesnt render logo of organizations when more than one', () => {
    const { queryByAltText } = renderComponent(mockMultipleOrgProgram);
    const logoImageNode = queryByAltText(mockMultipleOrgProgram.authoringOrganizations[0].key);
    expect(logoImageNode).toBeNull();
  });

  it('each card links to a progress page using the program uuid', async () => {
    const { getByTestId } = renderComponent();
    const programCard = getByTestId('program-list-card');
    expect(programCard).toHaveAttribute('to', 'test-base-url/dashboard/programs/test-uuid');
  });

  it.each([{
    width: 1450,
    size: 'large',
  },
  {
    width: 1300,
    size: 'large',
  },
  {
    width: 1000,
    size: 'large',
  },
  {
    width: 800,
    size: 'medium',
  },
  {
    width: 600,
    size: 'small',
  },
  {
    width: 500,
    size: 'xSmall',
  }])('tests window size', ({ width, size }) => {
    global.innerWidth = width;
    const { getByAltText } = renderComponent();
    const imageCap = getByAltText('program card image for test-title');
    expect(imageCap).toHaveAttribute('src', `banner-${size}.jpg`);
  });
});
