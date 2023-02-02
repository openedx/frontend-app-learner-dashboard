import React from 'react';
import PropTypes from 'prop-types';

import { Button, Collapsible } from '@edx/paragon';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Program,
} from '@edx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import { nullMethod } from 'utils';
import Banner from 'components/Banner';

import ProgramList from './ProgramsList';
import messages from './messages';

export const RelatedProgramsBanner = ({ cardId }) => {
  const { formatMessage } = useIntl();

  const programData = reduxHooks.useCardRelatedProgramsData(cardId);

  return (
    programData?.length > 0 && (
      <Banner icon={Program} className="bg-light mb-0">
        <Collapsible.Advanced defaultOpen>
          <div className="related-programs-banner d-flex text-nowrap">
            <span className="row flex-grow-1 mr-0">
              <span className="col col-auto">
                {formatMessage(messages.relatedPrograms)}
              </span>

              <Collapsible.Visible whenClosed>
                <span className="col text-ellipsis w-0">
                  <ProgramList programs={programData.list} isCollapse />
                </span>
              </Collapsible.Visible>
            </span>

            <Collapsible.Trigger>
              <Collapsible.Visible whenClosed>
                <Button
                  variant="link"
                  size="inline"
                  className="float-right"
                  iconAfter={KeyboardArrowUp}
                  onClick={nullMethod}
                  alt={formatMessage(messages.expandBannerAlt)}
                >
                  {formatMessage(messages.expandBanner)}
                </Button>
              </Collapsible.Visible>
              <Collapsible.Visible whenOpen as="span">
                <Button
                  variant="link"
                  size="inline"
                  className="float-right"
                  iconAfter={KeyboardArrowDown}
                  onClick={nullMethod}
                  alt={formatMessage(messages.collapseBannerAlt)}
                >
                  {formatMessage(messages.collapseBanner)}
                </Button>
              </Collapsible.Visible>
            </Collapsible.Trigger>
          </div>

          <Collapsible.Body>
            <div className="d-flex flex-column">
              <ProgramList programs={programData.list} />
            </div>
          </Collapsible.Body>
        </Collapsible.Advanced>
      </Banner>
    )
  );
};
RelatedProgramsBanner.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default RelatedProgramsBanner;
