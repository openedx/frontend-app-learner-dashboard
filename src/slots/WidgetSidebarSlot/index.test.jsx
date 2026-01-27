import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router-dom';
import { reduxHooks } from '@src/hooks';
import WidgetSidebarSlot from '.';

jest.mock('@src/hooks', () => ({
  reduxHooks: {
    usePlatformSettingsData: jest.fn(),
  },
}));

const courseSearchUrl = 'mock-url';

describe('WidgetSidebar', () => {
  it('renders PluginSlot with correct children', () => {
    reduxHooks.usePlatformSettingsData.mockReturnValueOnce({ courseSearchUrl });
    render(
      <MemoryRouter>
        <IntlProvider locale="en">
          <WidgetSidebarSlot />
        </IntlProvider>
      </MemoryRouter>
    );
    const pluginSlot = screen.getByText('Looking for a new challenge?');
    expect(pluginSlot).toBeDefined();
  });
});
