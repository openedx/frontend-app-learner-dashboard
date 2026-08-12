import { render, screen } from '@testing-library/react';
import { CardDetails } from './CardDetails';

describe('CardDetails', () => {
  it('renders providerName and details', () => {
    render(<CardDetails providerName="edX" details="Self-paced" showAccessMessage={false} />);
    expect(screen.getByText(/edX/)).toBeInTheDocument();
    expect(screen.getByText(/Self-paced/)).toBeInTheDocument();
  });

  it('does not render the access message when showAccessMessage is false', () => {
    render(
      <CardDetails
        providerName="edX"
        details="Self-paced"
        showAccessMessage={false}
        accessMessage="Access expires soon"
      />,
    );
    expect(screen.queryByText(/Access expires soon/)).not.toBeInTheDocument();
  });

  it('renders the access message when showAccessMessage is true', () => {
    render(
      <CardDetails
        providerName="edX"
        details="Self-paced"
        showAccessMessage
        accessMessage="Access expires soon"
      />,
    );
    expect(screen.getByText(/Access expires soon/)).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <CardDetails
        providerName="edX"
        details="Self-paced"
        showAccessMessage={false}
        actions={<button type="button">Action</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applies the dataTestId', () => {
    render(
      <CardDetails
        providerName="edX"
        details="Self-paced"
        showAccessMessage={false}
        dataTestId="card-details"
      />,
    );
    expect(screen.getByTestId('card-details')).toBeInTheDocument();
  });
});
