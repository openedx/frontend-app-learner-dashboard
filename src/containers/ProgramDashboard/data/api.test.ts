import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useProgramsListData } from '../../../data/hooks/queryHooks';
import { fetchProgramsListData } from './api';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));
jest.mock('./api', () => ({
  fetchProgramsListData: jest.fn(),
}));

describe('useProgramsListData', () => {
  const mockQueryResult = {
    data: { results: [] },
    isLoading: false,
    isError: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue(mockQueryResult);
  });

  it('calls useQuery with the expected arguments', () => {
    renderHook(() => useProgramsListData());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['programsList'],
      queryFn: fetchProgramsListData,
      retry: false,
      refetchOnWindowFocus: false,
    });
  });

  it('returns the result of useQuery', () => {
    const { result } = renderHook(() => useProgramsListData());

    expect(result.current).toEqual(mockQueryResult);
  });
});
