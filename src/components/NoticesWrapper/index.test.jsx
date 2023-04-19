import React from 'react';
import { shallow } from 'enzyme';

import useNoticesWrapperData from './hooks';
import NoticesWrapper from '.';

jest.mock('./hooks', () => jest.fn());

const hookProps = { isRedirected: false };
useNoticesWrapperData.mockReturnValue(hookProps);

let el;
const children = [<b key={1}>some</b>, <i key={2}>children</i>];
describe('NoticesWrapper component', () => {
  describe('behavior', () => {
    it('initializes hooks', () => {
      el = shallow(<NoticesWrapper>{children}</NoticesWrapper>);
      expect(useNoticesWrapperData).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    it('does not show children if redirected', () => {
      useNoticesWrapperData.mockReturnValueOnce({ isRedirected: true });
      el = shallow(<NoticesWrapper>{children}</NoticesWrapper>);
      expect(el.children().length).toEqual(0);
    });
    it('shows children if not redirected', () => {
      el = shallow(<NoticesWrapper>{children}</NoticesWrapper>);
      expect(el.children().length).toEqual(2);
      expect(el.children().at(0).matchesElement(children[0])).toEqual(true);
      expect(el.children().at(1).matchesElement(children[1])).toEqual(true);
    });
  });
});
