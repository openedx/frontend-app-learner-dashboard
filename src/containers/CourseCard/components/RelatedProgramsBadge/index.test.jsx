import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import useRelatedProgramsBadge from './hooks';
import RelatedProgramsBadge from '.';

jest.mock('containers/RelatedProgramsModal', () => 'RelatedProgramsModal');
jest.mock('./hooks', () => jest.fn());

const hookProps = {
  isOpen: true,
  openModal: jest.fn().mockName('useRelatedProgramsBadge.openModal'),
  closeModal: jest.fn().mockName('useRelatedProgramsBadge.closeModal'),
  numPrograms: 3,
  programsMessage: 'useRelatedProgramsBadge.programsMessage',
};

const cardId = 'test-card-id';

describe('RelatedProgramsBadge component', () => {
  it('should not render if no programs', () => {
    useRelatedProgramsBadge.mockReturnValueOnce({ ...hookProps, numPrograms: 0 });
    render(<IntlProvider locale="en"><RelatedProgramsBadge cardId={cardId} /></IntlProvider>);
    const button = screen.queryByRole('button', { name: hookProps.programsMessage });
    expect(button).toBeNull();
    const dialog = screen.queryByRole('dialog');
    expect(dialog).toBeNull();
  });
  it('3 programs closed', () => {
    useRelatedProgramsBadge.mockReturnValue({ ...hookProps, isOpen: false });
    render(<IntlProvider locale="en"><RelatedProgramsBadge cardId={cardId} /></IntlProvider>);
    const button = screen.getByRole('button', { name: hookProps.programsMessage });
    expect(button).toBeInTheDocument();
  });
});
