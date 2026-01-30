import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useCourseData } from 'hooks';
import RelatedProgramsBanner from '.';

jest.mock('hooks', () => ({
  useCourseData: jest.fn(),
}));

const cardId = 'test-card-id';
const programData = {
  list: [
    {
      title: 'Program 1',
      url: 'http://example.com/program1',
    },
    {
      title: 'Program 2',
      url: 'http://example.com/program2',
    },
  ],
  length: 2,
};

describe('RelatedProgramsBanner', () => {
  it('render empty', () => {
    useCourseData.mockReturnValue(null);
    render(<IntlProvider locale="en"><RelatedProgramsBanner cardId={cardId} /></IntlProvider>);
    const banner = screen.queryByRole('alert');
    expect(banner).toBeNull();
  });

  it('render with programs', () => {
    useCourseData.mockReturnValue({ programs: { relatedPrograms: programData.list } });
    render(<IntlProvider locale="en"><RelatedProgramsBanner cardId={cardId} /></IntlProvider>);
    const list = screen.getByRole('list');
    expect(list.childElementCount).toBe(programData.list.length);
  });

  it('render related programs title', () => {
    useCourseData.mockReturnValue({ programs: { relatedPrograms: programData.list } });
    render(<IntlProvider locale="en"><RelatedProgramsBanner cardId={cardId} /></IntlProvider>);
    const title = screen.getByText('Related Programs:');
    expect(title).toBeInTheDocument();
  });
});
