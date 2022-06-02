/* eslint-disable quotes */
import React from 'react';
import { Button, useToggle, ModalDialog } from '@edx/paragon';
import { Program } from '@edx/paragon/icons';

export const RelatedProgram = () => {
  const [isOpen, open, close] = useToggle(false);
  return (
    <>
      <Button
        variant="tertiary"
        size="sm"
        iconBefore={Program}
        onClick={open}
      >
        2 Related Program
      </Button>
      <ModalDialog
        title="My dialog"
        isOpen={isOpen}
        onClose={close}
        hasCloseButton
        isFullscreenOnMobile
      >
        <ModalDialog.Header>
          <ModalDialog.Title>
            Related Programs
          </ModalDialog.Title>
        </ModalDialog.Header>

        <ModalDialog.Body>
          <p>
            {/* eslint-disable-next-line */}
            I am baby palo santo ugh celiac fashion axe. La croix lo-fi venmo whatever. Beard man braid migas single-origin coffee forage ramps. Tumeric messenger bag bicycle rights wayfarers, try-hard cronut blue bottle health goth. Sriracha tumblr cardigan, cloud bread succulents tumeric copper mug marfa semiotics woke next level organic roof party +1 try-hard.
          </p>
        </ModalDialog.Body>
      </ModalDialog>
    </>
  );
};

export default RelatedProgram;
