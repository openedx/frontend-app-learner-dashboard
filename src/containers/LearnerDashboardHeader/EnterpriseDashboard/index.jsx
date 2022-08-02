import React from 'react';
// import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import {
  Dropdown, ModalDialog, ActionRow, Button,
} from '@edx/paragon';

import { nullMethod } from 'hooks';

import messages from './messages';
import useEnterpriseDashboardHook from './hooks';

export const EnterpriseDashboard = () => {
  const { formatMessage } = useIntl();
  const {
    availableDashboards,
    mostRecentDashboard,
    showDialog,

    selectedItem,
    beginSelectDashboardItem,
    cancelSelectDashboardItem,
  } = useEnterpriseDashboardHook();

  return (
    <>
      {availableDashboards.map((dashboard) => (
        <Dropdown.Item
          onClick={beginSelectDashboardItem(dashboard)}
          active={dashboard.label === mostRecentDashboard.label}
          key={dashboard.label}
        >
          {dashboard.label} {formatMessage(messages.dashboard)}
        </Dropdown.Item>
      ))}
      <ModalDialog
        isOpen={showDialog}
        onClose={nullMethod}
        hasCloseButton={false}
        title=""
      >
        <div
          className="bg-white p-3 rounded shadow"
          style={{ textAlign: 'start' }}
        >
          <h4>
            {formatMessage(messages.enterpriseDialogHeader, {
              label: selectedItem.label,
            })}
          </h4>
          <p>
            {formatMessage(messages.enterpriseDialogBody, {
              label: selectedItem.label,
            })}
          </p>
          <ActionRow>
            <Button variant="tertiary" onClick={cancelSelectDashboardItem}>
              {formatMessage(messages.enterpriseDialogDismissButton)}
            </Button>
            <Button type="a" href={selectedItem.url}>
              {formatMessage(messages.enterpriseDialogConfirmButton)}
            </Button>
          </ActionRow>
        </div>
      </ModalDialog>
    </>
  );
};

EnterpriseDashboard.propTypes = {};

export default EnterpriseDashboard;
