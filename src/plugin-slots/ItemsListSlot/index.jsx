import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { ItemsList, itemsListDataShape } from 'containers/ItemsPanel/ItemsList';

export const ItemsListSlot = ({ courseListData }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.course_list.v1"
    idAliases={['course_list_slot']}
    pluginProps={{ courseListData }}
  >
    <ItemsList itemsListData={courseListData} />
  </PluginSlot>
);

ItemsListSlot.propTypes = {
  courseListData: itemsListDataShape,
};

export default ItemsListSlot;
