import * as ProgramDashboard from '.';
import ProgramsList from './ProgramsList';

jest.mock('./ProgramsList', () => jest.fn(() => null));

describe('ProgramDashboard', () => {
  it('exports ProgramsList', () => {
    expect(ProgramDashboard.ProgramsList).toBeDefined();
  });

  it('exports the correct ProgramsList component', () => {
    expect(ProgramDashboard.ProgramsList).toBe(ProgramsList);
  });
});
