import { MockUseState } from 'testUtils';
import { useCreateCreditRequest } from 'data/hooks';
import * as hooks from './hooks';

jest.mock('hooks', () => ({
  useCourseData: jest.fn().mockReturnValue({
    credit: { providerId: 'provider-123' },
    courseRun: { courseId: 'course-456' },
  }),
}));

jest.mock('data/hooks', () => ({
  useCreateCreditRequest: jest.fn(),
}));

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: jest.fn().mockReturnValue({
      authenticatedUser: { username: 'test-user' },
    }),
  };
});

const state = new MockUseState(hooks);

const cardId = 'test-card-id';
const requestData = { data: 'request data' };
const creditRequest = jest.fn().mockReturnValue(Promise.resolve(requestData));
useCreateCreditRequest.mockReturnValue({ mutate: creditRequest });
const event = { preventDefault: jest.fn() };

let out;
describe('Credit Banner view hooks', () => {
  describe('state', () => {
    state.testGetter(state.keys.creditRequestData);
  });
  describe('useCreditRequestData', () => {
    beforeEach(() => {
      state.mock();
      out = hooks.useCreditRequestData(cardId);
    });
    describe('behavior', () => {
      it('initializes creditRequestData state field with null value', () => {
        state.expectInitializedWith(state.keys.creditRequestData, null);
      });
      it('calls useCreateCreditRequest with passed cardID', () => {
        expect(useCreateCreditRequest).toHaveBeenCalledWith();
      });
    });
    describe('output', () => {
      it('returns requestData state value', () => {
        state.mockVal(state.keys.creditRequestData, requestData);
        out = hooks.useCreditRequestData(cardId);
        expect(out.requestData).toEqual(requestData);
      });
      describe('createCreditRequest', () => {
        it('returns an event handler that prevents default click behavior', () => {
          out.createCreditRequest(event);
          expect(event.preventDefault).toHaveBeenCalled();
        });
        it('calls api.createCreditRequest and sets requestData with the response', async () => {
          await out.createCreditRequest(event);
          expect(creditRequest).toHaveBeenCalled();
        });
      });
    });
  });
});
