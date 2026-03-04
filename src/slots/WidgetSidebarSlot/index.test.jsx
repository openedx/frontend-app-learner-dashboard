import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { MemoryRouter } from 'react-router';
import { useInitializeLearnerHome } from '@src/data/hooks';
import WidgetSidebarSlot from '.';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

const courseSearchUrl = 'mock-url';

describe('WidgetSidebar', () => {
  it('renders PluginSlot with correct children', () => {
    useInitializeLearnerHome.mockReturnValueOnce({ data: { platformSettings: { courseSearchUrl } } });
    render(
      <MemoryRouter>
        <IntlProvider locale="en">
          <WidgetSidebarSlot />
        </IntlProvider>
      </MemoryRouter>,
    );
    const pluginSlot = screen.getByText('Looking for a new challenge?');
    expect(pluginSlot).toBeDefined();
  });
});
