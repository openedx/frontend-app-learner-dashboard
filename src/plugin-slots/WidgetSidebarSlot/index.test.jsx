import { render, screen } from '@testing-library/react';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { useInitializeLearnerHome } from 'data/hooks';
import WidgetSidebarSlot from '.';

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

const courseSearchUrl = 'mock-url';

describe('WidgetSidebar', () => {
  it('renders PluginSlot with correct children', () => {
    useInitializeLearnerHome.mockReturnValueOnce({ platformSettings: { courseSearchUrl } });
    render(<IntlProvider locale="en"><WidgetSidebarSlot /></IntlProvider>);
    const pluginSlot = screen.getByText('Looking for a new challenge?');
    expect(pluginSlot).toBeDefined();
  });
});
