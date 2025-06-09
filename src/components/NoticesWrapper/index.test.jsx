import { render } from '@testing-library/react';

import useNoticesWrapperData from './hooks';
import NoticesWrapper from '.';

jest.mock('./hooks', () => jest.fn());

const hookProps = { isRedirected: false };

const children = [<b key={1}>some</b>, <i key={2}>children</i>];
describe('NoticesWrapper component', () => {
  beforeEach(() => {
    useNoticesWrapperData.mockClear();
  });
  describe('behavior', () => {
    it('initializes hooks', () => {
      useNoticesWrapperData.mockReturnValue(hookProps);
      render(<NoticesWrapper>{children}</NoticesWrapper>);
      expect(useNoticesWrapperData).toHaveBeenCalledWith();
    });
  });
  describe('output', () => {
    it('does not show children if redirected', () => {
      useNoticesWrapperData.mockReturnValueOnce({ isRedirected: true });
      const { queryByText } = render(<NoticesWrapper>{children}</NoticesWrapper>);
      expect(queryByText('some')).not.toBeInTheDocument();
      expect(queryByText('children')).not.toBeInTheDocument();
    });
    it('shows children if not redirected', () => {
      useNoticesWrapperData.mockReturnValue(hookProps);
      const { getByText } = render(<NoticesWrapper>{children}</NoticesWrapper>);
      expect(getByText('some')).toBeInTheDocument();
      expect(getByText('children')).toBeInTheDocument();
    });
  });
});
