/* eslint-disable import/no-extraneous-dependencies */
import { within } from '@testing-library/react';

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

  get get() {
    return {
      courseCards: this.el.getAllByTestId('CourseCard'),
      card: {
        header: (card) => within(card).getByTestId('CourseCardTitle'),
        details: (card) => within(card).getByTestId('CourseCardDetails'),
        // banners: (card) => within(card).getByTestId('CourseCardBanners'),
        // programsBadge: (card) => within(card).getByTestId('RelatedProgramsBadge'),
        // actions: (card) => within(card).getByTestId('CourseCardActions'),
      },
    };
  }

  /**
   * Returns promises for attempting to find elements within the DOM
   */
  get find() {
    return {
    };
  }

  verifyText = (el, text) => within(el).getByText(text);

  verifyTextIncludes = (el, text) => within(el).getByText(text, { exact: false });
}

export default Inspector;
