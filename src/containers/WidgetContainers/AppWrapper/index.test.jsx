import React from 'react';

import { shallow } from '@edx/react-unit-test-utils';

import PaintedDoorExperimentProvider from 'widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';

import AppWrapper from '.';

jest.mock(
  'widgets/RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext',
  () => 'PaintedDoorExperimentProvider',
);

let el;

const children = (<div>This is some <b>test</b> <i>content</i></div>);

const render = () => {
  el = shallow(<AppWrapper>{children}</AppWrapper>);
};

const mockAndRenderForBlock = (newVal) => {
  const oldVal = process.env;
  beforeEach(() => {
    process.env = { ...oldVal, ...newVal };
    render();
  });
  afterEach(() => {
    process.env = oldVal;
    render();
  });
};

describe('AppWrapper WidgetContainer component', () => {
  describe('output', () => {
    describe('painted door experiment is active (08/23)', () => {
      mockAndRenderForBlock({ EXPERIMENT_08_23_VAN_PAINTED_DOOR: true });
      test('snapshot', () => {
        expect(el.snapshot).toMatchSnapshot();
      });
      it('renders children wrapped in PaintedDoorExperimentProvider', () => {
        const control = el.instance.findByType(PaintedDoorExperimentProvider)[0];
        expect(el.instance).toEqual(control);
      });
    });
    describe('no experiments are active', () => {
      mockAndRenderForBlock({ EXPERIMENT_08_23_VAN_PAINTED_DOOR: false });
      test('snapshot', () => {
        expect(el.snapshot).toMatchSnapshot();
      });
      it('renders children wrapped in PaintedDoorExperimentProvider', () => {
        expect(el.instance.matches(shallow(children))).toEqual(true);
      });
    });
  });
});
