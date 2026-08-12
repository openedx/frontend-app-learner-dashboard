import { Form } from "@openedx/paragon";
import { FormattedMessage } from "react-intl";
import { FilterType } from "data/context/FiltersProvider";

import messages from "../messages";

export interface TypeFormProps {
  types: FilterType[];
  selectedTypes: FilterType[];
  handleTypeChange: (
    { target }: { target: { checked: boolean, value: string }}
  ) => void;
}

export const TypeForm = ({
  types,
  selectedTypes,
  handleTypeChange,
}: TypeFormProps) => {
  const formValues = selectedTypes.map(type => type.id);

  return (
    <Form.Group>
      <div className="filter-form-heading mb-1">
        <FormattedMessage {...messages.type} />
      </div>
      <Form.CheckboxSet
        name="course-status-filters"
        onChange={handleTypeChange}
        value={formValues}
      >
        {types.map(type => (
          <Form.Checkbox className="py-2" value={type.id}>
            {type.text}
          </Form.Checkbox>
        ))}
      </Form.CheckboxSet>
    </Form.Group>
  );
};
