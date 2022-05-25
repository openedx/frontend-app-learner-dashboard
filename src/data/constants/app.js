import { getConfig } from '@edx/frontend-platform';

export const routePath = `${getConfig().PUBLIC_PATH}:courseId`;
export const locationId = window.location.pathname.slice(1);
