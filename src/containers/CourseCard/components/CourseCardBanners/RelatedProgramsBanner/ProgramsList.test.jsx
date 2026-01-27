import { render, screen } from '@testing-library/react';

import { ProgramsList } from './ProgramsList';

describe('ProgramsList', () => {
  const programs = [
    {
      programUrl: 'http://example.com',
      title: 'Example Program 1',
    },
    {
      programUrl: 'http://example2.com',
      title: 'Example Program 2',
    },
  ];

  it('renders correctly', () => {
    render(<ProgramsList programs={programs} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.children.length).toEqual(programs.length);
  });

  it('add the links correctly', () => {
    render(<ProgramsList programs={programs} />);
    programs.forEach(program => {
      const link = screen.getByRole('link', { name: program.title });
      expect(link).toHaveAttribute('href', program.url);
    });
  });
});
