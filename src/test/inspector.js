/* eslint-disable import/no-extraneous-dependencies */
// import { within } from '@testing-library/react';

// import fakeData from 'data/services/lms/fakeData';
// import { gradingStatusTransform } from 'data/redux/grading/selectors/selected';

// import appMessages from './messages';

/**
 * App inspector class providing methods to return elements from within
 * the virtual DOM
 * @props {Root Node} el - Root app render node.
 */
class Inspector {
  constructor(el) {
    this.el = el;
    this.getByRole = this.el.getByRole;
    this.getByText = this.el.getByText;
    this.getByLabelText = this.el.getByLabelText;
    this.findByText = this.el.findByText;
    this.findByLabelText = this.el.findByLabelText;
  }

  /**
   * Returns promises for attempting to find elements within the DOM
   */
  get find() {
    return {
    };
  }
}

export default Inspector;
