import React from 'react';
// import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown, ModalDialog, ActionRow, Button } from '@edx/paragon';

import { hooks as appHooks } from 'data/redux';

import { nullMethod } from 'hooks';

import messages from './messages';

import { StrictDict } from 'utils';


export const state = StrictDict({
  showDialog: (val) => React.useState(val),
  selectedItem: (val) => React.useState(val),
});

export const useEnterpriseDashboardHook = () => {
  const { availableDashboards, mostRecentDashboard } = appHooks.useEnterpriseDashboardData();
  const [showDialog, setShowDialog] = state.showDialog(false);
  const [selectedItem, setSelectedItem] = state.selectedItem({});

  const beginSelectDashboardItem = (val) => () => {
    setSelectedItem(val);
    setShowDialog(true);
  }

  const cancelSelectDashboardItem = () => {
    setSelectedItem({});
    setShowDialog(false);
  }

  return {
    availableDashboards,
    mostRecentDashboard,
    showDialog,

    selectedItem,
    beginSelectDashboardItem,
    cancelSelectDashboardItem,
  }
}

export const EnterpriseDashboard = () => {
  const { formatMessage } = useIntl();
  const {
    availableDashboards,
    mostRecentDashboard,
    showDialog,

    selectedItem,
    beginSelectDashboardItem,
    cancelSelectDashboardItem
  } = useEnterpriseDashboardHook();

  return <>
    {
      availableDashboards.map(dashboard => (
        <Dropdown.Item onClick={beginSelectDashboardItem(dashboard)} active={dashboard.label === mostRecentDashboard.label} key={dashboard.label}>
          {dashboard.label} {formatMessage(messages.dashboard)}
        </Dropdown.Item>
      ))
    }
     <ModalDialog
      isOpen={showDialog}
      onClose={nullMethod}
      hasCloseButton={false}
      title=""
    >
      <div className="bg-white p-3 rounded shadow" style={{ textAlign: 'start' }}>
        <h4>{formatMessage(messages.enterpriseDialogHeader, { label: selectedItem.label })}</h4>
        <p>{formatMessage(messages.enterpriseDialogBody, { label: selectedItem.label })}</p>
        <ActionRow>
          <Button variant="tertiary" onClick={cancelSelectDashboardItem}>
            {formatMessage(messages.enterpriseDialogDismissButton)}
          </Button>
          <Button type="a" href={selectedItem.url}>{formatMessage(messages.enterpriseDialogConfirmButton)}</Button>
        </ActionRow>
      </div>
    </ModalDialog>
  </>
};

EnterpriseDashboard.propTypes = {};

export default EnterpriseDashboard;
