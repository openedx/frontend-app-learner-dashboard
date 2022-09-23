import { shallow } from 'enzyme';

import { GreetingBanner } from './GreetingBanner';

describe('GreetingBanner', () => {
  const morning = new Date('2021-01-01T11:59:59.999');
  const afternoon = new Date('2021-01-01T16:59:59.999');
  const evening = new Date('2021-01-01T18:00:00');
  describe('snapshots', () => {
    ['small', 'large'].forEach((size) => {
      test(`with size ${size} and morning`, () => {
        jest.useFakeTimers().setSystemTime(morning);
        const wrapper = shallow(<GreetingBanner size={size} />);
        expect(wrapper).toMatchSnapshot();
      });
      test(`with size ${size} and afternoon`, () => {
        jest.useFakeTimers().setSystemTime(afternoon);
        const wrapper = shallow(<GreetingBanner size={size} />);
        expect(wrapper).toMatchSnapshot();
      });
      test(`with size ${size} and evening`, () => {
        jest.useFakeTimers().setSystemTime(evening);
        const wrapper = shallow(<GreetingBanner size={size} />);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
