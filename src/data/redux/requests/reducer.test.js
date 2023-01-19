import { RequestStates } from 'data/constants/requests';
import { initialState, actions, reducer } from './reducer';

const testingState = {
  ...initialState,
  arbitraryField: 'arbitrary',
};

describe('requests reducer', () => {
  it('has initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  const testValue = 'roll for initiative';
  const testKey = 'test-key';
  describe('handling actions', () => {
    describe('startRequest', () => {
      it('adds a pending status for the given key', () => {
        expect(reducer(
          testingState,
          actions.startRequest({ requestKey: testKey }),
        )).toEqual({
          ...testingState,
          [testKey]: { status: RequestStates.pending },
        });
      });
    });
    describe('completeRequest', () => {
      it('adds a completed status with passed response', () => {
        expect(reducer(
          testingState,
          actions.completeRequest({ requestKey: testKey, response: testValue }),
        )).toEqual({
          ...testingState,
          [testKey]: { status: RequestStates.completed, response: testValue },
        });
      });
    });
    describe('failRequest', () => {
      it('adds a failed status with passed error', () => {
        expect(reducer(
          testingState,
          actions.failRequest({ requestKey: testKey, error: testValue }),
        )).toEqual({
          ...testingState,
          [testKey]: { status: RequestStates.failed, error: testValue },
        });
      });
    });
  });
});
