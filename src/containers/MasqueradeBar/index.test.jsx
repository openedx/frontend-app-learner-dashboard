import { useContext, useState } from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { useInitializeLearnerHome } from 'data/hooks';
import { useMasquerade } from 'data/context';
import MasqueradeBar from '.';
// import hooks from './hooks';
import messages from './messages';

jest.mock('data/context', () => ({
  useMasquerade: jest.fn(),
}));

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useState: jest.fn(ActualReact.useState),
    useContext: jest.fn((context) => {
      // eslint-disable-next-line global-require
      if (context === require('@edx/frontend-platform/react').AppContext) {
        return {
          authenticatedUser: { administrator: true },
        };
      }
      return ActualReact.useContext(context);
    }),
  };
});

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

const mockDefaults = () => {
  useMasquerade.mockReturnValue({
    masqueradeUser: null,
    setMasqueradeUser: jest.fn(),
  });
  useInitializeLearnerHome.mockReturnValue({
    isError: false,
    error: null,
    isPending: false,
  });
};

describe('MasqueradeBar', () => {
  describe('render', () => {
    it('can masquerade', () => {
      mockDefaults();
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const labelStudentName = screen.getByText(messages.StudentNameInput.defaultMessage);
      expect(labelStudentName).toBeInTheDocument();
      const submitButton = screen.getByRole('button', { name: messages.SubmitButton.defaultMessage });
      expect(submitButton).toBeInTheDocument();
    });
    it('can masquerade with input', () => {
      const masqueradeInput = 'test';
      mockDefaults();
      useState.mockReturnValue([masqueradeInput, jest.fn()]);
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const valueMasqueradeInput = screen.getByRole('textbox', { value: masqueradeInput });
      expect(valueMasqueradeInput).toBeInTheDocument();
    });
    it('is masquerading with input', () => {
      const masqueradeInput = 'test';
      useInitializeLearnerHome.mockReturnValue({
        isError: false,
        error: null,
        isPending: false,
      });
      useMasquerade.mockReturnValue({
        masqueradeUser: masqueradeInput,
        setMasqueradeUser: jest.fn(),
      });
      useState.mockReturnValue([masqueradeInput, jest.fn()]);
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const chipMasqueradeInput = screen.getByText(masqueradeInput);
      expect(chipMasqueradeInput).toBeInTheDocument();
      expect(chipMasqueradeInput.parentElement).toHaveClass('masquerade-chip');
    });
    it('is masquerading failed with error', () => {
      const masqueradeInput = 'test';
      useInitializeLearnerHome.mockReturnValue({
        isError: true,
        error: { customAttributes: { httpErrorStatus: 404 } },
        isPending: false,
      });
      useMasquerade.mockReturnValue({
        masqueradeUser: masqueradeInput,
        setMasqueradeUser: jest.fn(),
      });
      useState.mockReturnValue([masqueradeInput, jest.fn()]);
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const valueMasqueradeInput = screen.getByRole('textbox', { value: masqueradeInput });
      expect(valueMasqueradeInput).toHaveClass('is-invalid');
    });
    it('is masquerading pending', () => {
      useInitializeLearnerHome.mockReturnValue({
        isError: false,
        error: null,
        isPending: true,
      });
      useMasquerade.mockReturnValue({
        masqueradeUser: 'test',
        setMasqueradeUser: jest.fn(),
      });
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const pendingButton = screen.getByRole('button', { name: messages.SubmitButton.defaultMessage });
      expect(pendingButton).toBeInTheDocument();
      expect(pendingButton).toHaveAttribute('aria-disabled', 'true');
    });
    it('handle clear masquerade', () => {
      const setMasqueradeUser = jest.fn();
      const masqueradeInput = 'test';
      useInitializeLearnerHome.mockReturnValue({
        isError: false,
        error: null,
        isPending: false,
      });
      useMasquerade.mockReturnValue({
        masqueradeUser: masqueradeInput,
        setMasqueradeUser,
      });
      useState.mockReturnValue([masqueradeInput, jest.fn()]);
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const chipMasqueradeInput = screen.getByText(masqueradeInput);
      expect(chipMasqueradeInput).toBeInTheDocument();
      chipMasqueradeInput.click();
      expect(setMasqueradeUser).toHaveBeenCalledWith(undefined);
    });
    it('handle masquerade submit', () => {
      const setMasqueradeUser = jest.fn();
      const masqueradeInput = 'test';
      useInitializeLearnerHome.mockReturnValue({
        isError: false,
        error: null,
        isPending: false,
      });
      useMasquerade.mockReturnValue({
        masqueradeUser: null,
        setMasqueradeUser,
      });
      useState.mockReturnValue([masqueradeInput, jest.fn()]);
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const submitButton = screen.getByRole('button', { name: messages.SubmitButton.defaultMessage });
      expect(submitButton).toBeInTheDocument();
      submitButton.click();
      expect(setMasqueradeUser).toHaveBeenCalledWith(masqueradeInput);
    });
    it('cannot masquerade', () => {
      mockDefaults();
      useContext.mockReturnValue({
        authenticatedUser: { administrator: false },
      });
      render(<IntlProvider lang="en"><MasqueradeBar /></IntlProvider>);
      const labelStudentName = screen.queryByText(messages.StudentNameInput.defaultMessage);
      expect(labelStudentName).toBeNull();
    });
  });
});
