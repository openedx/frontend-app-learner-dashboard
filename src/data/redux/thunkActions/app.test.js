import { keyStore } from 'utils';
import { actions, selectors } from 'data/redux';
import { post } from 'data/services/lms/utils';

import requests from './requests';

import * as module from './app';

jest.mock('data/services/lms/utils', () => ({
  post: jest.fn(),
}));
jest.mock('data/redux', () => ({
  actions: {
    app: {
      setPageNumber: jest.fn(v => ({ setPageNumber: v })),
      loadGlobalData: jest.fn(v => ({ loadGlobalData: v })),
      loadCourses: jest.fn(v => ({ loadCourses: v })),
      loadRecommendedCourses: jest.fn(v => ({ loadRecommendedCourses: v })),
    },
  },
  selectors: {
    app: {
      emailConfirmation: jest.fn(),
      courseCard: {
        courseRun: jest.fn(),
        entitlement: jest.fn(),
      },
    },
  },
}));
jest.mock('./requests', () => ({
  initializeList: jest.fn((args) => ({ initializeList: args })),
  newEntitlementEnrollment: jest.fn((args) => ({ newEntitlementEnrollment: args })),
  switchEntitlementEnrollment: jest.fn((args) => ({ switchEntitlementEnrollment: args })),
  leaveEntitlementSession: jest.fn((args) => ({ leaveEntitlementSession: args })),
  unenrollFromCourse: jest.fn((args) => ({ unenrollFromCourse: args })),
  masqueradeAs: jest.fn((args) => ({ masqueradeAs: args })),
  clearMasquerade: jest.fn((args) => ({ clearMasquerade: args })),
  updateEmailSettings: jest.fn((args) => ({ updateEmailSettings: args })),
}));

const dispatch = jest.fn(action => action);

const checkDispatch = (call) => { expect(dispatch).toHaveBeenCalledWith(call); };

const moduleKeys = keyStore(module);

const testString = 'TEST-string';
const uuid = 'test-UUID';
const cardId = 'test-card-id';
const selection = 'test-selection';
const courseId = 'test-COURSE-id';
const isRefundable = 'test-is-refundable';

const loadDataSpy = jest.spyOn(module, moduleKeys.loadData);
const mockLoadData = data => ({ loadData: data });

const initializeSpy = jest.spyOn(module, moduleKeys.initialize);
const mockInitialize = () => 'mock-initialize';

const testState = { test: 'state' };
const getState = () => testState;

describe('app thunk actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    selectors.app.emailConfirmation.mockReturnValueOnce({ sendEmailUrl: testString });
    selectors.app.courseCard.entitlement.mockReturnValueOnce({ uuid, isRefundable });
    selectors.app.courseCard.courseRun.mockReturnValueOnce({ courseId });
  });
  describe('loadData', () => {
    const courses = 'test-courses';
    const globalData = { some: 'global', data: 'fields' };
    beforeEach(() => {
      module.loadData({ courses, ...globalData })(dispatch);
    });
    it('initializes pageNumber to 1', () => {
      checkDispatch(actions.app.setPageNumber(1));
    });
    it('loads courses', () => {
      checkDispatch(actions.app.loadCourses({ courses }));
    });
    it('loads remaining passed args as global data', () => {
      checkDispatch(actions.app.loadGlobalData(globalData));
    });
  });
  describe('initialize', () => {
    beforeEach(() => {
      loadDataSpy.mockImplementationOnce(mockLoadData);
      module.initialize()(dispatch);
    });
    it('dispatches initializeList event, calling loadData on response', () => {
      const { onSuccess } = dispatch.mock.calls[0][0].initializeList;
      onSuccess({ data: testString });
      checkDispatch(mockLoadData(testString));
    });
  });
  describe('sendConfirmEmail', () => {
    it('sends post request fo sendEmailUrl', () => {
      expect(module.sendConfirmEmail()(dispatch, getState)).toEqual(post(testString));
      expect(selectors.app.emailConfirmation).toHaveBeenCalledWith(testState);
    });
  });
  describe('newEntitlementEnrollment', () => {
    beforeEach(() => {
      module.newEntitlementEnrollment(cardId, selection)(dispatch, getState);
    });
    it('dispatches newEntitlementEnrollment request then re-init on success', () => {
      const request = dispatch.mock.calls[0][0];
      expect(request.newEntitlementEnrollment.uuid).toEqual(uuid);
      expect(request.newEntitlementEnrollment.courseId).toEqual(selection);
      expect(request.newEntitlementEnrollment.onSuccess).toBeDefined();
      expect(initializeSpy).not.toHaveBeenCalled();
      request.newEntitlementEnrollment.onSuccess();
      expect(initializeSpy).toHaveBeenCalled();
    });
  });
  describe('switchEntitlementEnrollmnent', () => {
    beforeEach(() => {
      module.switchEntitlementEnrollment(cardId, selection)(dispatch, getState);
    });
    it('dispatches switchEntitlementEnrollment request then re-init on success', () => {
      const request = dispatch.mock.calls[0][0];
      expect(request.switchEntitlementEnrollment.uuid).toEqual(uuid);
      expect(request.switchEntitlementEnrollment.courseId).toEqual(selection);
      expect(request.switchEntitlementEnrollment.onSuccess).toBeDefined();
      expect(initializeSpy).not.toHaveBeenCalled();
      request.switchEntitlementEnrollment.onSuccess();
      expect(initializeSpy).toHaveBeenCalled();
    });
  });
  describe('leaveEntitlementSession', () => {
    beforeEach(() => {
      module.leaveEntitlementSession(cardId)(dispatch, getState);
    });
    it('dispatches leaveEntitlementEnrollment request then re-init on success', () => {
      const request = dispatch.mock.calls[0][0];
      expect(request.leaveEntitlementSession.uuid).toEqual(uuid);
      expect(request.leaveEntitlementSession.isRefundable).toEqual(isRefundable);
      expect(request.leaveEntitlementSession.onSuccess).toBeDefined();
      expect(initializeSpy).not.toHaveBeenCalled();
      request.leaveEntitlementSession.onSuccess();
      expect(initializeSpy).toHaveBeenCalled();
    });
  });
  describe('unenrollFromCourse', () => {
    const reason = 'test-reason';
    it('dispatches unenrollFromCourse request action', () => {
      module.unenrollFromCourse(cardId, reason)(dispatch, getState);
      const request = dispatch.mock.calls[0][0];
      expect(request.unenrollFromCourse.courseId).toEqual(courseId);
    });
  });
  describe('masqueradeAs', () => {
    it('dispatches masqueradeAS request action, loading data on success', () => {
      loadDataSpy.mockImplementationOnce(mockLoadData);
      module.masqueradeAs(testString)(dispatch);
      const request = dispatch.mock.calls[0][0];
      request.masqueradeAs.onSuccess({ data: testString });
      expect(dispatch).toHaveBeenCalledWith(mockLoadData(testString));
    });
  });
  describe('clearMasquerade', () => {
    it('dispatches clearMasquerade action and re-initializes', () => {
      initializeSpy.mockImplementationOnce(mockInitialize);
      module.clearMasquerade()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(requests.clearMasquerade());
      expect(dispatch).toHaveBeenCalledWith(mockInitialize());
    });
  });
  describe('update email settings', () => {
    it('dispatches updateEmailSettings request action', () => {
      module.updateEmailSettings(cardId, testString)(dispatch, getState);
      expect(selectors.app.courseCard.courseRun).toHaveBeenCalledWith(testState, cardId);
      expect(dispatch).toHaveBeenCalledWith(requests.updateEmailSettings({
        courseId,
        enable: testString,
      }));
    });
  });
});
