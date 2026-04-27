import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab } from '@openedx/paragon';

const tabShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  panel: PropTypes.node.isRequired,
});

export const DashboardTabs = ({
  activeTab,
  onSelect,
  tabs,
}) => (
  <Tabs
    id="subscription-dashboard-tabs"
    defaultActiveKey={tabs[0].key}
    activeKey={activeTab}
    onSelect={onSelect}
    className="mb-4"
    mountOnEnter
  >
    {tabs.map(tab => (
      <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
        {tab.panel}
      </Tab>
    ))}
  </Tabs>
);

DashboardTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(tabShape).isRequired,
};

export default DashboardTabs;