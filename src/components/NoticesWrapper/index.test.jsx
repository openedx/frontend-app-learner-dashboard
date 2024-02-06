import React from 'react';
import { shallow } from '@edx/react-unit-test-utils';

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
      expect(el.instance.children.length).toEqual(0);
    });
    it('shows children if not redirected', () => {
      el = shallow(<NoticesWrapper>{children}</NoticesWrapper>);
      expect(el.instance.children.length).toEqual(2);
      expect(el.instance.children[0].type).toEqual(shallow(children[0]).type);
      expect(el.instance.props).toEqual(shallow(children[0]).props);
      expect(el.instance.children[1].type).toEqual(shallow(children[1]).type);
      expect(el.instance.props).toEqual(shallow(children[1]).props);
    });
  });
});
