import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import {
  isEnterpriseUser,
  showOrdersAndSubscriptionsMenuItem,
} from './utils';

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedUser: jest.fn(),
}));

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));

describe('isEnterpriseUser', () => {
  beforeEach(() => {
    getAuthenticatedUser.mockReset();
  });

  test('should return false if authenticatedUser is not enterprise user', () => {
    getAuthenticatedUser.mockReturnValueOnce(null);
    expect(isEnterpriseUser()).toBe(false);
    getAuthenticatedUser.mockReturnValueOnce({ roles: [] });
    expect(isEnterpriseUser()).toBe(false);
  });

  test('should return false if authenticatedUser roles do not include "enterprise_learner"', () => {
    getAuthenticatedUser.mockReturnValueOnce({ roles: ['role1', 'role2', 'role3'] });
    expect(isEnterpriseUser()).toBe(false);
  });

  test('should return true if authenticatedUser roles include "enterprise_learner"', () => {
    getAuthenticatedUser.mockReturnValueOnce({
      roles: ['role1', 'enterprise_learner:role2', 'role3'],
    });
    expect(isEnterpriseUser()).toBe(true);
  });
});

describe('showOrdersAndSubscriptionsMenuItem', () => {
  afterEach(() => {
    getConfig.mockReset();
    getAuthenticatedUser.mockReset();
  });

  test('should return true when ENABLE_B2C_SUBSCRIPTIONS is true and isEnterpriseUser returns false', () => {
    getConfig.mockReturnValueOnce({
      ENABLE_B2C_SUBSCRIPTIONS: 'true',
    });
    getAuthenticatedUser.mockReturnValueOnce({ roles: [] });
    expect(showOrdersAndSubscriptionsMenuItem()).toBe(true);
  });

  test('should return false when ENABLE_B2C_SUBSCRIPTIONS is false and isEnterpriseUser returns false', () => {
    getConfig.mockReturnValueOnce({
      ENABLE_B2C_SUBSCRIPTIONS: 'false',
    });
    getAuthenticatedUser.mockReturnValueOnce({ roles: ['role1', 'role2', 'role3'] });
    expect(showOrdersAndSubscriptionsMenuItem()).toBe(false);
  });
});
