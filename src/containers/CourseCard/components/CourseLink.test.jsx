import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LocationDisplay } from '@src/testUtils';
import CourseLink from './CourseLink';

describe('CourseLink', () => {
  const renderLink = (props) => render(
    <MemoryRouter>
      <CourseLink className="custom-class" {...props}>Test</CourseLink>
      <LocationDisplay />
    </MemoryRouter>,
  );

  it('navigates in the client for a path in this site', async () => {
    const onClick = jest.fn();
    renderLink({ href: '/learning/course', onClick });
    const link = screen.getByRole('link', { name: 'Test' });
    expect(link).toHaveClass('custom-class');
    await userEvent.click(link);
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByTestId('location')).toHaveTextContent('/learning/course');
  });

  it('is a plain anchor for any other url', () => {
    renderLink({ href: 'http://lms.example.com/course' });
    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute('href', 'http://lms.example.com/course');
  });

  it('is an anchor with no href when there is no url', () => {
    renderLink({});
    expect(screen.getByText('Test')).not.toHaveAttribute('href');
  });
});
