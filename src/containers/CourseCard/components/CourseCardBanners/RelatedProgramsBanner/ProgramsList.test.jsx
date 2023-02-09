import { shallow } from 'enzyme';

import { ProgramsList } from './ProgramsList';

describe('ProgramsList', () => {
  const programs = [
    {
      programUrl: 'http://example.com',
      title: 'Example Program 1',
    },
    {
      programUrl: 'http://example.com',
      title: 'Example Program 2',
    },
  ];

  it('renders correctly', () => {
    const wrapper = shallow(<ProgramsList programs={programs} />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('li').length).toEqual(programs.length);
  });
});
