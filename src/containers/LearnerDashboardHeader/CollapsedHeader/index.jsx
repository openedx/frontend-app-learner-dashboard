import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { MenuIcon, Close } from '@openedx/paragon/icons';
import { IconButton, Icon } from '@openedx/paragon';

import { useLearnerDashboardHeaderData, useIsCollapsed } from '../hooks';

import CollapseMenuBody from './CollapseMenuBody';
import BrandLogo from '../BrandLogo';

import messages from '../messages';

export const CollapsedHeader = () => {
  const { formatMessage } = useIntl();
  const isCollapsed = useIsCollapsed();
  const { isOpen, toggleIsOpen } = useLearnerDashboardHeaderData();

  return (
    isCollapsed && (
      <>
        <header className="d-flex shadow-sm align-items-center learner-variant-header">
          <IconButton
            invertColors
            isActive
            src={isOpen ? Close : MenuIcon}
            iconAs={Icon}
            alt={
              isOpen
                ? formatMessage(messages.collapseMenuOpenAltText)
                : formatMessage(messages.collapseMenuClosedAltText)
            }
            onClick={toggleIsOpen}
            variant="primary"
            className="p-4"
          />
          <BrandLogo />
        </header>
        <CollapseMenuBody isOpen={isOpen} />
      </>
    )
  );
};

CollapsedHeader.propTypes = {};

export default CollapsedHeader;
