import { MockUseState } from 'testUtils';
import { apiHooks } from 'hooks';
import * as hooks from './hooks';

jest.mock('hooks', () => ({
  apiHooks: {
    useCreateCreditRequest: jest.fn(),
  },
}));

const state = new MockUseState(hooks);

const cardId = 'test-card-id';
const requestData = { data: 'request data' };
const creditRequest = jest.fn().mockReturnValue(Promise.resolve(requestData));
apiHooks.useCreateCreditRequest.mockReturnValue(creditRequest);
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
        expect(apiHooks.useCreateCreditRequest).toHaveBeenCalledWith(cardId);
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
          expect(creditRequest).toHaveBeenCalledWith();
          expect(state.setState.creditRequestData).toHaveBeenCalledWith(requestData.data);
        });
      });
    });
  });
});
