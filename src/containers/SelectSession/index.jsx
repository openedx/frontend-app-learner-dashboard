import React from 'react';
import { hooks as appHooks } from 'data/redux';

import SelectSessionModal from './SelectSessionModal';

export const SelectSession = () => {
  const { courseNumber } = appHooks.useSelectSessionsModalData();
  return courseNumber ? <SelectSessionModal courseNumber={courseNumber} /> : null;
};
SelectSession.propTypes = {};

export default SelectSession;
