import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

import { formatMessage } from 'testUtils';
import { MailtoLink } from '@openedx/paragon';

import hooks from './hooks';
import messages from './messages';
import CreditBanner from '.';

jest.mock('components/Banner', () => 'Banner');

jest.mock('./hooks', () => ({
  useCreditBannerData: jest.fn(),
}));

let el;
const cardId = 'test-card-id';

const ContentComponent = () => 'ContentComponent';
const supportEmail = 'test-support-email';

describe('CreditBanner component', () => {
  describe('behavior', () => {
    beforeEach(() => {
      hooks.useCreditBannerData.mockReturnValue(null);
      el = shallow(<CreditBanner cardId={cardId} />);
    });
    it('initializes hooks with cardId', () => {
      expect(hooks.useCreditBannerData).toHaveBeenCalledWith(cardId);
    });
    it('returns null if hookData is null', () => {
      expect(el.isEmptyRender()).toEqual(true);
    });
  });
  describe('render', () => {
    describe('with error state', () => {
      beforeEach(() => {
        hooks.useCreditBannerData.mockReturnValue({
          error: true,
          ContentComponent,
          supportEmail,
        });
        el = shallow(<CreditBanner cardId={cardId} />);
      });
      test('snapshot', () => {
        expect(el.snapshot).toMatchSnapshot();
      });
      it('passes danger variant to Banner parent', () => {
        expect(el.instance.findByType('Banner')[0].props.variant).toEqual('danger');
      });
      it('includes credit-error-msg with support email link', () => {
        expect(el.instance.findByTestId('credit-error-msg')[0].children[0].el).toEqual(shallow(formatMessage(messages.error, {
          supportEmailLink: (<MailtoLink to={supportEmail}>{supportEmail}</MailtoLink>),
        })));
      });
      it('loads ContentComponent with cardId', () => {
        expect(el.instance.findByType('ContentComponent')[0].props.cardId).toEqual(cardId);
      });
    });

    describe('with error state with no email', () => {
      beforeEach(() => {
        hooks.useCreditBannerData.mockReturnValue({
          error: true,
          ContentComponent,
        });
        el = shallow(<CreditBanner cardId={cardId} />);
      });
      test('snapshot', () => {
        expect(el.snapshot).toMatchSnapshot();
      });
      it('includes credit-error-msg without support email link', () => {
        expect(el.instance.findByTestId('credit-error-msg')[0].children[0].el).toEqual(formatMessage(messages.errorNoEmail));
      });
    });

    describe('with no error state', () => {
      beforeEach(() => {
        hooks.useCreditBannerData.mockReturnValue({
          error: false,
          ContentComponent,
          supportEmail,
        });
        el = shallow(<CreditBanner cardId={cardId} />);
      });
      test('snapshot', () => {
        expect(el.snapshot).toMatchSnapshot();
      });
      it('loads ContentComponent with cardId', () => {
        expect(el.instance.findByType('ContentComponent')[0].props.cardId).toEqual(cardId);
      });
    });
  });
});
