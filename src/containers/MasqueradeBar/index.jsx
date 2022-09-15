import React from 'react';
import { AppContext } from '@edx/frontend-platform/react';

import {
  Chip,
  Button,
  FormControl,
  FormControlFeedback,
  FormLabel,
  FormGroup,
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
              <FormControlFeedback type="invalid">
                {masqueradeError}
              </FormControlFeedback>
            )}
          </FormGroup>
          <Button
            disabled={!masqueradeInput.length}
            variant="danger"
            onClick={handleMasqueradeSubmit(masqueradeInput)}
          >
            {formatMessage(messages.SubmitButton)}
          </Button>
        </>
      )}
    </div>
  );
};

export default MasqueradeBar;
