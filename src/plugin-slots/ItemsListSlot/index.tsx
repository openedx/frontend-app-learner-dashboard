import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { ItemsList, itemsListDataShape } from 'containers/ItemsPanel/ItemsList';

export const ItemsListSlot = ({ itemsListData }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.item_list.v1"
    idAliases={['item_list_slot']}
    pluginProps={{ itemsListData }}
  >
    <ItemsList itemsListData={itemsListData} />
  </PluginSlot>
);

ItemsListSlot.propTypes = {
  courseListData: itemsListDataShape,
};

export default ItemsListSlot;
