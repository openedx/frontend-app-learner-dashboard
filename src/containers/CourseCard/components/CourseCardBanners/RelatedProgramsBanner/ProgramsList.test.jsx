import { shallow } from 'enzyme';

import { ProgramsList, iconMap } from './ProgramsList';

describe('ProgramsList', () => {
  const programs = [
    ...Object.keys(iconMap).map((key) => ({
      title: `program title${key}`,
      programUrl: `http://example.com/${key}`,
      programType: key,
    })),
    // undefined programType
    {
      title: 'undefined programType',
      programUrl: 'http://example.com/undefined-programType',
      programType: undefined,
    },
  ];

  it('renders correctly', () => {
    const wrapper = shallow(<ProgramsList programs={programs} />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('li').length).toEqual(programs.length);
  });
});
