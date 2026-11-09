import { getAppConfig } from '@openedx/frontend-base';

import app from './app';

jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getAppConfig: jest.fn(),
}));

const widgetId = (name: string) => `org.openedx.frontend.widget.learnerDashboard.${name}.v1`;

const conditionCallback = (name: string) => {
  const operation = app.slots?.find((slot) => 'id' in slot && slot.id === widgetId(name));
  return (operation as { condition: { callback: () => boolean } }).condition.callback;
};

describe('LearnerDashboardHeader app', () => {
  describe('programs link', () => {
    it.each([
      [true, true],
      [false, false],
      [undefined, false],
    ])('when ENABLE_PROGRAMS is %p, shown is %p', (enablePrograms, expected) => {
      (getAppConfig as jest.Mock).mockReturnValue({ ENABLE_PROGRAMS: enablePrograms });
      expect(conditionCallback('headerLinkPrograms')()).toBe(expected);
    });
  });

  describe('order history link', () => {
    it.each([
      ['http://orders.example.com', true],
      ['', false],
      [undefined, false],
    ])('when ORDER_HISTORY_URL is %p, shown is %p', (url, expected) => {
      (getAppConfig as jest.Mock).mockReturnValue({ ORDER_HISTORY_URL: url });
      expect(conditionCallback('headerLinkOrderHistory')()).toBe(expected);
    });
  });
});
