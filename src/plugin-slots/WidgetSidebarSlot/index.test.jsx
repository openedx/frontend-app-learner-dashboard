import { render, screen } from '@testing-library/react';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { reduxHooks } from 'hooks';
import WidgetSidebarSlot from '.';

jest.mock('hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(),
  },
}));

const courseSearchUrl = 'mock-url';

describe('WidgetSidebar', () => {
  it('renders PluginSlot with correct children', () => {
    reduxHooks.usePlatformSettingsData.mockReturnValueOnce({ courseSearchUrl });
    render(<IntlProvider locale="en"><WidgetSidebarSlot /></IntlProvider>);
    const pluginSlot = screen.getByText('Looking for a new challenge?');
    expect(pluginSlot).toBeDefined();
  });
});
