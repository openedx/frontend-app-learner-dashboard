import { shallow } from '@edx/react-unit-test-utils';

import { reduxHooks } from 'hooks';
import RelatedProgramsBanner from '.';

jest.mock('./ProgramsList', () => 'ProgramsList');

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardRelatedProgramsData: jest.fn(),
  },
}));

const cardId = 'test-card-id';

describe('RelatedProgramsBanner', () => {
  test('render empty', () => {
    reduxHooks.useCardRelatedProgramsData.mockReturnValue({
      length: 0,
    });
    const el = shallow(<RelatedProgramsBanner cardId={cardId} />);
    expect(el.isEmptyRender()).toEqual(true);
  });

  test('render with programs', () => {
    reduxHooks.useCardRelatedProgramsData.mockReturnValue({
      list: [
        {
          title: 'Program 1',
          url: 'http://example.com/program1',
        },
        {
          title: 'Program 2',
          url: 'http://example.com/program2',
        },
      ],
      length: 2,
    });
    const el = shallow(<RelatedProgramsBanner cardId={cardId} />);
    expect(el.snapshot).toMatchSnapshot();
  });
});
