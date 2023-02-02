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

    expect(wrapper.length).toEqual(programs.length);
    wrapper.forEach((el) => expect(el.hasClass('row')).toEqual(true));
  });

  it('renders correctly with collapse', () => {
    const wrapper = shallow(<ProgramsList programs={programs} isCollapse />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.length).toEqual(programs.length);
    wrapper.forEach((el) => expect(el.hasClass('d-inline')).toEqual(true));
  });
});
