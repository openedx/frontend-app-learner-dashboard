import React from 'react';
import { render, screen } from '@testing-library/react';
import AppWrapper from './index';

describe('AppWrapper', () => {
  it('should render children without modification', () => {
    render(
      <AppWrapper>
        <div>Test Child</div>
      </AppWrapper>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
