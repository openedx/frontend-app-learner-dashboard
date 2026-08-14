import { Form } from "@openedx/paragon";
import { FormattedMessage } from "react-intl";
import { FilterCategory } from "data/context/FiltersProvider";

import messages from "../messages";

export interface CategoryFormProps {
  categories: FilterCategory[];
  selectedCategories: FilterCategory[];
  handleCategoryChange: (
    { target }: { target: { checked: boolean, value: string }}
  ) => void;
}

export const CategoryForm = ({
  categories,
  selectedCategories,
  handleCategoryChange,
}: CategoryFormProps) => {
  const formValues = selectedCategories.map(category => category.id);

  return (
    <Form.Group>
      <div className="filter-form-heading mb-1">
        <FormattedMessage {...messages.category} />
      </div>
      <Form.CheckboxSet
        name="course-status-filters"
        onChange={handleCategoryChange}
        value={formValues}
      >
        {categories.map(category => (
          <Form.Checkbox className="py-2" value={category.id}>
            {category.text}
          </Form.Checkbox>
        ))}
      </Form.CheckboxSet>
    </Form.Group>
  );
};
