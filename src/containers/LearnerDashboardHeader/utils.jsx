import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

export const isEnterpriseUser = () => {
  const authenticatedUser = getAuthenticatedUser();
  const userRoleNames = authenticatedUser ? authenticatedUser.roles.map(role => role.split(':')[0]) : [];

  return userRoleNames.includes('enterprise_learner');
};

export const showOrdersAndSubscriptionsMenuItem = () => (getConfig().ENABLE_B2C_SUBSCRIPTIONS?.toLowerCase() === 'true' && !isEnterpriseUser());

export default isEnterpriseUser;
