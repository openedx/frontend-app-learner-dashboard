import { useIntl } from '@edx/frontend-platform/i18n';

import { MockUseState } from 'testUtils';
import { reduxHooks } from 'hooks';

import * as hooks from './hooks';
import messages from './messages';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardRelatedProgramsData: jest.fn(),
  },
}));

const cardId = 'test-card-id';

const state = new MockUseState(hooks);
const numPrograms = 27;

describe('RelatedProgramsBadge hooks', () => {
  const { formatMessage } = useIntl();
  let out;
  describe('state values', () => {
    state.testGetter(state.keys.isOpen);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('useRelatedProgramsBadgeData', () => {
    beforeEach(() => {
      state.mock();
      reduxHooks.useCardRelatedProgramsData.mockReturnValueOnce({
        length: numPrograms,
      });
      out = hooks.useRelatedProgramsBadgeData({ cardId });
    });
    afterEach(state.restore);

    test('openModal sets isOpen to true as useCallback', () => {
      out.openModal();
      expect(state.setState.isOpen).toHaveBeenCalledWith(true);
    });

    test('closeModal sets isOpen to false as useCallback', () => {
      out.closeModal();
      expect(state.setState.isOpen).toHaveBeenCalledWith(false);
    });

    test('isOpen returns state value for isOpen', () => {
      expect(out.isOpen).toEqual(state.stateVals.isOpen);
    });

    test('forwards numPrograms from relatedPrograms.length for the cardId', () => {
      expect(out.numPrograms).toEqual(numPrograms);
    });
    test('returns empty programsMessage if no programs', () => {
      reduxHooks.useCardRelatedProgramsData.mockReturnValueOnce({ length: 0 });
      out = hooks.useRelatedProgramsBadgeData({ cardId });
      expect(out.programsMessage).toEqual('');
    });
    test('returns badgeLabelSingular programsMessage if 1 programs', () => {
      reduxHooks.useCardRelatedProgramsData.mockReturnValueOnce({ length: 1 });
      out = hooks.useRelatedProgramsBadgeData({ cardId });
      expect(out.programsMessage).toEqual(formatMessage(
        messages.badgeLabelSingular,
        { numPrograms: 1 },
      ));
    });
    test('returns badgeLabelSingular programsMessage if multiple programs', () => {
      expect(out.programsMessage).toEqual(formatMessage(
        messages.badgeLabelPlural,
        { numPrograms },
      ));
    });
  });
});
