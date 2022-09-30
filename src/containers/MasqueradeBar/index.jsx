import React from 'react';
import { AppContext } from '@edx/frontend-platform/react';

import {
  Chip,
  FormControl,
  FormControlFeedback,
  FormLabel,
  FormGroup,
  StatefulButton,
} from '@edx/paragon';
import { Close } from '@edx/paragon/icons';

import messages from './messages';
import { useMasqueradeBarData } from './hooks';
import './index.scss';

export const MasqueradeBar = () => {
  const { authenticatedUser } = React.useContext(AppContext);

  const {
    canMasquerade,
    isMasquerading,
    isMasqueradingFailed,
    isMasqueradingPending,
    masqueradeInput,
    masqueradeError,
    handleMasqueradeInputChange,
    handleClearMasquerade,
    handleMasqueradeSubmit,
    formatMessage,
  } = useMasqueradeBarData({ authenticatedUser });

  if (!canMasquerade) { return null; }

  return (
    <div className="masquerade-bar">
      {isMasquerading ? (
        <>
          <FormLabel inline className="masquerade-form-label">
            {formatMessage(messages.ViewingAs)}
          </FormLabel>
          <Chip
            className="masquerade-chip"
            iconAfter={Close}
            onClick={handleClearMasquerade}
          >
            {masqueradeInput}
          </Chip>
        </>
      ) : (
        <>
          <FormLabel inline className="masquerade-form-label">
            {formatMessage(messages.ViewAs)}
          </FormLabel>
          <FormGroup isInvalid={isMasqueradingFailed} className="masquerade-form-input">
            <FormControl
              value={masqueradeInput}
              onChange={handleMasqueradeInputChange}
              floatingLabel={formatMessage(messages.StudentNameInput)}
            />
            {isMasqueradingFailed && (
              <FormControlFeedback type="invalid" hasIcon={false}>
                {masqueradeError}
              </FormControlFeedback>
            )}
          </FormGroup>
          <StatefulButton
            disabled={!masqueradeInput.length}
            variant="brand"
            onClick={handleMasqueradeSubmit(masqueradeInput)}
            labels={{
              default: formatMessage(messages.SubmitButton),
            }}
            state={isMasqueradingPending ? 'pending' : 'default'}
          />
        </>
      )}
    </div>
  );
};

export default MasqueradeBar;
