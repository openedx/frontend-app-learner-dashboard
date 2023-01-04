import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames';

import { AppContext } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Badge, Hyperlink, Icon } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';

import { useCountryCode } from 'data/redux/hooks';
import useIsMediumScreen from './hooks';
import { getMerchandisingItems, countryCodeUS } from './constants';
import messages from './messages';
import './index.scss';

export const StaticCallouts = () => {
  // TODO will be remove after experiment
  const [show2uLobs, setShow2uLobs] = useState(false);
  const { authenticatedUser } = useContext(AppContext);
  useEffect(() => {
    const experimentId = '22164741776';
    const optimizely = window.optimizely || null;
    let timer = null;
    if (optimizely) {
      optimizely.push({
        type: 'user',
        attributes: {
          isEnterpriseUser: authenticatedUser.administrator,
        },
      });
      optimizely.push({
        type: 'page',
        pageName: 'van_1225_merchandise_2u_lobs_on_learner_home',
      });
      timer = setTimeout(() => {
        const selectedVariant = optimizely.get('state').getVariationMap()[experimentId];
        if (selectedVariant?.name === 'dashboard_with_2u_lobs') {
          setShow2uLobs(true);
        }
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [authenticatedUser]);
  const { formatMessage } = useIntl();
  const countryCode = useCountryCode();
  const merchandisingItems = getMerchandisingItems(countryCode);
  const isMediumScreen = useIsMediumScreen();
  const markup = { markup: children => <span className="d-inline-flex mb-0 text-brand-500">{children}</span> };
  const items = merchandisingItems.map(item => (
    <Hyperlink
      destination={item.itemURL}
      key={item.key}
      target="_blank"
      showLaunchIcon={false}
      className={classNames('static-callouts-item', {
        'static-callouts-item-md': isMediumScreen && countryCode === countryCodeUS,
      })}
    >
      <Badge variant="warning" className="item-badge mb-2">{formatMessage(messages.badgeTitle)}</Badge>
      <h3>
        {formatMessage(item.title)}
      </h3>
      <div className="card-description">
        {formatMessage(item.description)}
        <Icon className="d-inline-block align-middle mx-1" src={ArrowForward} />
      </div>
    </Hyperlink>
  ));

  return (
    show2uLobs && (
      <div className="callouts-container">
        <div>
          <h2>
            {formatMessage(messages.heading, markup)}
          </h2>
          <p className="mb-0 text-gray-700">
            {formatMessage(messages.subheading)}
          </p>
        </div>
        <div className={classNames('static-callouts-container', {
          'static-callouts-container-md': isMediumScreen && countryCode === countryCodeUS,
        })}
        >
          {items}
        </div>
      </div>
    )
  );
};

export default StaticCallouts;
