import { useIntl } from "react-intl";

import { Dropdown, Icon, IconButton } from "@openedx/paragon";
import { MoreVert } from "@openedx/paragon/icons";
import messages from "../messages";
import { useIsMasquerading } from "hooks";
import { usePathwayData } from "hooks/usePathwayData";

export const PathwayCardMenu = ({ cardId }: { cardId: string }) => {
  const { formatMessage } = useIntl();
  const pathwayData = usePathwayData(cardId);
  const isEmailEnabled = pathwayData.enrollment?.isEmailEnabled ?? false;
  const isMasquerading = useIsMasquerading();

  // TODO waiting to backend to set this
  const shouldShowUnenrollItem = true;
  const shouldShowDropdown = true;

  if (!shouldShowDropdown) {
    return null;
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        id={`course-actions-dropdown-${cardId}`}
        as={IconButton}
        src={MoreVert}
        iconAs={Icon}
        variant="primary"
        alt={formatMessage(messages.dropdownAlt)}
      />
      <Dropdown.Menu>
        {shouldShowUnenrollItem && (
          <Dropdown.Item
            disabled={isMasquerading}
            onClick={() => { /** TODO */ }}
          >
            {formatMessage(messages.unenroll)}
          </Dropdown.Item>
        )}
        {isEmailEnabled && (
          <Dropdown.Item
            disabled={isMasquerading}
            onClick={() => { /** TODO */ }}
          >
            {formatMessage(messages.emailSettings)}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
