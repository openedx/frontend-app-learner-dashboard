import React from 'react';

import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { ItemsList, itemsListDataShape } from 'containers/ItemsPanel/ItemsList';

export const ItemsListSlot = ({ itemsListData }) => (
  <PluginSlot
    id="org.openedx.frontend.learner_dashboard.items_list.v1"
    idAliases={['items_list_slot']}
    pluginProps={{ itemsListData }}
  >
    <ItemsList itemsListData={itemsListData} />
  </PluginSlot>
);

ItemsListSlot.propTypes = {
  itemsListData: itemsListDataShape,
};

export default ItemsListSlot;
