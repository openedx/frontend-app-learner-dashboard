import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { CategoryForm, CategoryFormProps } from './CategoryForm';

const categories = [
  { id: 'course', text: 'Course' },
  { id: 'pathway', text: 'Pathway' },
];

const mockHandleCategoryChange = jest.fn();

const defaultProps: CategoryFormProps = {
  categories,
  selectedCategories: [],
  handleCategoryChange: mockHandleCategoryChange,
};

const renderComponent = (props = defaultProps) => render(
  <IntlProvider locale="en">
    <CategoryForm {...props} />
  </IntlProvider>,
);

describe('CategoryForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a checkbox for each category', () => {
    renderComponent();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(categories.length);
    categories.forEach(category => {
      expect(screen.getByRole('checkbox', { name: category.text })).toBeInTheDocument();
    });
  });

  it('checks boxes based on selectedCategories prop', () => {
    renderComponent({ ...defaultProps, selectedCategories: [categories[0]] });
    expect(screen.getByRole('checkbox', { name: categories[0].text })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: categories[1].text })).not.toBeChecked();
  });

  it('calls handleCategoryChange when a checkbox is clicked', () => {
    renderComponent();
    const checkbox = screen.getByRole('checkbox', { name: categories[0].text });
    fireEvent.click(checkbox);
    expect(mockHandleCategoryChange).toHaveBeenCalled();
  });

  it('displays the category heading', () => {
    renderComponent();
    expect(screen.getByText(/category/i)).toBeInTheDocument();
  });
});
