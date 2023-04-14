import React from 'react';
import { shallow } from 'enzyme';

import useNoticesProviderData from './hooks';
import NoticesProvider from '.';

jest.mock('./hooks', () => jest.fn());

const hookProps = { isRedirected: false };
useNoticesProviderData.mockReturnValue(hookProps);

let el;
const children = [<b key={1}>some</b>, <i key={2}>children</i>];
describe('NoticesProvider component', () => {
  describe('behavior', () => {
    it('initializes hooks', () => {
      el = shallow(<NoticesProvider>{children}</NoticesProvider>);
      expect(useNoticesProviderData).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    it('does not show children if redirected', () => {
      useNoticesProviderData.mockReturnValueOnce({ isRedirected: true });
      el = shallow(<NoticesProvider>{children}</NoticesProvider>);
      expect(el.children().length).toEqual(0);
    });
    it('shows children if not redirected', () => {
      el = shallow(<NoticesProvider>{children}</NoticesProvider>);
      expect(el.children().length).toEqual(2);
      expect(el.children().at(0).matchesElement(children[0])).toEqual(true);
      expect(el.children().at(1).matchesElement(children[1])).toEqual(true);
    });
  });
});
