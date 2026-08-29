import app from './app';
import { appId } from './constants';
import routes from './routes';
import slots from './slots';

describe('learnerDashboardApp', () => {
  it('declares the learner dashboard appId, routes, and slots', () => {
    expect(app.appId).toBe(appId);
    expect(app.routes).toBe(routes);
    expect(app.slots).toBe(slots);
  });

  it('bundles no config defaults', () => {
    expect(app.defaultConfig).toBeUndefined();
  });

  it('leaves config to the operator', () => {
    expect(app.config).toBeUndefined();
  });
});
