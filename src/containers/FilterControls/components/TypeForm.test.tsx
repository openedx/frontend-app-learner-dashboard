import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { TypeForm, TypeFormProps } from './TypeForm';

const types = [
  { id: 'course', text: 'Course' },
  { id: 'pathway', text: 'Pathway' },
];

const mockHandleTypeChange = jest.fn();

const defaultProps: TypeFormProps = {
  types,
  selectedTypes: [],
  handleTypeChange: mockHandleTypeChange,
};

const renderComponent = (props = defaultProps) => render(
  <IntlProvider locale="en">
    <TypeForm {...props} />
  </IntlProvider>,
);

describe('TypeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a checkbox for each type', () => {
    renderComponent();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(types.length);
    types.forEach(type => {
      expect(screen.getByRole('checkbox', { name: type.text })).toBeInTheDocument();
    });
  });

  it('checks boxes based on selectedTypes prop', () => {
    renderComponent({ ...defaultProps, selectedTypes: [types[0]] });
    expect(screen.getByRole('checkbox', { name: types[0].text })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: types[1].text })).not.toBeChecked();
  });

  it('calls handleTypeChange when a checkbox is clicked', () => {
    renderComponent();
    const checkbox = screen.getByRole('checkbox', { name: types[0].text });
    fireEvent.click(checkbox);
    expect(mockHandleTypeChange).toHaveBeenCalled();
  });

  it('displays the type heading', () => {
    renderComponent();
    expect(screen.getByText(/type/i)).toBeInTheDocument();
  });
});
