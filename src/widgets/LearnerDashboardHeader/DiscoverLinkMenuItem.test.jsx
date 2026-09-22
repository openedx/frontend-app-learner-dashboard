import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider, getSiteConfig, setSiteConfig } from '@openedx/frontend-base';

import { coursesRole } from '@src/constants';
import { LocationDisplay, provideRoute } from '@src/testUtils';
import GlobalDataContext from '../../data/contexts/GlobalDataContext';
import DiscoverLinkMenuItem from './DiscoverLinkMenuItem';

function renderDiscover(courseSearchUrl) {
  return render(
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={['/dashboard']}>
        <GlobalDataContext.Provider value={{ platformSettings: { courseSearchUrl } }}>
          <DiscoverLinkMenuItem />
        </GlobalDataContext.Provider>
        <LocationDisplay />
      </MemoryRouter>
    </IntlProvider>,
  );
}

describe('DiscoverLinkMenuItem', () => {
  const siteConfig = getSiteConfig();

  afterEach(() => {
    setSiteConfig(siteConfig);
  });

  it('navigates to the courses route in the client when an app provides it', () => {
    provideRoute(coursesRole, 'courses');
    renderDiscover('/courses');

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/courses');

    fireEvent.click(link);
    expect(screen.getByTestId('location')).toHaveTextContent('/courses');
  });

  it('falls back to the course search URL the LMS reports', () => {
    renderDiscover('/courses');

    expect(screen.getByRole('link')).toHaveAttribute('href', 'http://localhost:8000/courses');
  });

  it('keeps an absolute course search URL as is', () => {
    renderDiscover('https://catalog.example.com/courses');

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://catalog.example.com/courses');
  });
});
