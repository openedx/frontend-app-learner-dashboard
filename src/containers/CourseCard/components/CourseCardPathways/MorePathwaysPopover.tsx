import { useState } from 'react';
import classNames from 'classnames';
import { useIntl } from '@openedx/frontend-base';
import {
  Badge, Button, ModalPopup, useToggle,
} from '@openedx/paragon';
import { ArrowDropDown } from '@openedx/paragon/icons';

import { PathwayData } from '@src/hooks/usePathwayData';

import { getPathwayTextColor } from './utils';
import messages from './messages';

export const MorePathwaysPopover = ({ pathways }: { pathways: PathwayData[] }) => {
  const { formatMessage } = useIntl();
  const [isOpen, open, close] = useToggle(false);
  const [target, setTarget] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button
        ref={setTarget}
        variant="link"

        iconAfter={ArrowDropDown}
        className="course-card-pathways-trigger ml-auto pl-2"
        aria-label={formatMessage(messages.morePathways, { count: pathways.length })}
        onClick={open}
      >
        <Badge pill variant="primary">{pathways.length}</Badge>
      </Button>
      <ModalPopup
        positionRef={target}
        isOpen={isOpen}
        onClose={close}
        placement="bottom-end"
        // The strip hides its overflow, so the popup is rendered outside of it
        withPortal
      >
        <div className="bg-white px-4 py-3 rounded shadow small">
          <ul className="mb-0 pl-3">
            {pathways.map((pathway) => {
              const textColor = getPathwayTextColor(pathway);
              return (
                <li
                  key={pathway.pathway.id}
                  className={classNames({ 'text-info-800': !textColor })}
                  style={textColor ? { color: textColor } : undefined}
                >
                  {pathway.pathway.content.displayName}
                </li>
              );
            })}
          </ul>
        </div>
      </ModalPopup>
    </>
  );
};
