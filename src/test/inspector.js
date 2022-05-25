/* eslint-disable import/no-extraneous-dependencies */
import { within } from '@testing-library/react';

import fakeData from 'data/services/lms/fakeData';
import { gradingStatusTransform } from 'data/redux/grading/selectors/selected';

import appMessages from './messages';

const { rubricConfig } = fakeData.oraMetadata;

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
   * Returns listView elements (immediate return methods)
   */
  get listView() {
    const table = () => this.getByRole('table');
    const tableRows = () => table().querySelectorAll('tbody tr');
    return {
      table,
      tableRows,
      selectedBtn: (num) => this.getByText(`View selected responses (${num})`),
      loadingResponses: () => this.getByText(appMessages.ListView.loadingResponses),
      listCheckbox: (index) => (
        within(tableRows().item(index)).getByTitle('Toggle Row Selected')
      ),
      backLink: () => this.getByText(appMessages.ListView.backToResponsesLowercase).closest('a'),
      reloadBtn: () => this.getByText(appMessages.ListView.reloadSubmissions).closest('button'),
    };
  }

  /**
   * Returns Review Modal elements (immediate return methods)
   */
  get review() {
    const modal = this.getByRole('dialog');
    const modalEl = within(modal);
    const { getByLabelText, getByText } = modalEl;
    const rubricContent = () => modalEl.getByText(appMessages.Rubric.rubric).closest('div');
    const rubricFeedback = () => (
      within(rubricContent()).getByText(appMessages.Rubric.overallComments).closest('div')
    );
    const rubricCriterion = (index) => (
      within(rubricContent()).getByText(rubricConfig.criteria[index].prompt).closest('div')
    );
    return {
      modal: () => modal,
      modalEl: () => modalEl,
      nextNav: () => getByLabelText(appMessages.ReviewActionsComponents.loadNext),
      prevNav: () => getByLabelText(appMessages.ReviewActionsComponents.loadPrevious),
      hideRubricBtn: () => getByText(appMessages.ReviewActions.hideRubric),
      showRubricBtn: () => getByText(appMessages.ReviewActions.showRubric),
      loadingResponse: () => getByText(appMessages.ReviewModal.loadingResponse),
      retryFetchLink: () => (
        getByText(appMessages.ReviewErrors.reloadSubmission).closest('button')
      ),
      username: (index) => getByText(fakeData.ids.username(index)),
      gradingStatus: (submission) => (
        getByText(appMessages.lms[gradingStatusTransform(submission)])
      ),
      rubric: {
        criteria: () => modal.querySelectorAll('.rubric-criteria'),
        feedbackInput: () => within(rubricFeedback()).getByRole('textbox'),
        submitGradeBtn: () => modalEl.getByText(appMessages.Rubric.submitGrade),
        criterion: rubricCriterion,
        criterionOption: (criterionIndex, optionIndex) => (
          within(rubricCriterion(criterionIndex))
            .getByText(rubricConfig.criteria[criterionIndex].options[optionIndex].label)
        ),
        criterionFeedback: (index) => within(rubricCriterion(index)).getByRole('textbox'),
      },
    };
  }

  /**
   * Returns promises for attempting to find elements within the DOM
   */
  get find() {
    return {
      listView: {
        viewAllResponsesBtn: () => this.findByText(appMessages.ListView.viewAllResponses),
        loadErrorHeading: () => this.findByText(appMessages.ListView.loadErrorHeading),
      },
      review: {
        prevNav: () => (
          this.review.modalEl().findByLabelText(appMessages.ReviewActionsComponents.loadPrevious)
        ),
        loadErrorHeading: () => this.findByText(appMessages.ReviewErrors.loadErrorHeading),
        startGradingBtn: () => this.findByText(appMessages.ReviewActionsComponents.startGrading),
        overrideGradeBtn: () => this.findByText(appMessages.ReviewActionsComponents.overrideGrade),
        submitGradeBtn: () => this.findByText(appMessages.Rubric.submitGrade),
      },
    };
  }
}

export default Inspector;
