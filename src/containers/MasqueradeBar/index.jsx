import React from 'react';
import { AppContext } from '@edx/frontend-platform/react';

import {
  Chip,
  Form,
  FormControl,
  FormControlFeedback,
  FormLabel,
  FormGroup,
  StatefulButton,
  Icon,
} from '@edx/paragon';
import { Close, PersonSearch } from '@edx/paragon/icons';

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
    masqueradeErrorMessage,
    handleMasqueradeInputChange,
    handleClearMasquerade,
    handleMasqueradeSubmit,
    formatMessage,
  } = useMasqueradeBarData({ authenticatedUser });

  if (!canMasquerade) { return null; }

  return (
    <div className="w-100 shadow-sm px-2">
      <Form className="masquerade-bar w-100">
        {isMasquerading ? (
          <>
            <FormLabel inline className="masquerade-form-label">
              <Icon src={PersonSearch} />
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
              <Icon src={PersonSearch} />
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
                  {formatMessage(masqueradeErrorMessage)}
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
              className="mr-3"
              state={isMasqueradingPending ? 'pending' : 'default'}
              type="submit"
            />
          </>
        )}
      </Form>
    </div>
  );
};

export default MasqueradeBar;
