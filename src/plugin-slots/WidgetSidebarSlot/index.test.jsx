import { render, screen } from '@testing-library/react';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useInitializeLearnerHome, useCourseCompletion } from 'data/hooks';
import WidgetSidebarSlot from '.';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
  useCourseCompletion: jest.fn(),
}));

describe('WidgetSidebar', () => {
  it('renders PluginSlot with correct children', () => {
    useInitializeLearnerHome.mockReturnValueOnce({ data: { courses: [{ id: 1 }] } });
    useCourseCompletion.mockReturnValue({ data: [], isLoading: false, isError: false });
    render(<IntlProvider locale="en"><WidgetSidebarSlot /></IntlProvider>);
    expect(screen.getByText('Progress Summary')).toBeDefined();
  });
});