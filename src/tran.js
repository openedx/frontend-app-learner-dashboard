import logo from 'assets/plower.png';
import React, { Component, Suspense } from 'react';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import './App.css';

// use hoc for class based components
// eslint-disable-next-line react/prefer-stateless-function
class LegacyWelcomeClass extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { t } = this.props;
    // eslint-disable-next-line react/jsx-filename-extension
    return <h2>{t('title')}</h2>;
  }
}
const Welcome = withTranslation()(LegacyWelcomeClass);

// Component using the Trans component
const MyComponent = () => (
  <Trans i18nKey="description.part1">
    To get started, edit <code>src/App.js</code> and save to reload.
  </Trans>
);
// page uses the hook
const Page = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
        <button type="button" onClick={() => changeLanguage('de')}>
          de
        </button>
        <button type="button" onClick={() => changeLanguage('en')}>
          en
        </button>
      </div>
      <div className="App-intro">
        <MyComponent />
      </div>
      <div>{t('description.part2')}</div>
    </div>
  );
};

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
// eslint-disable-next-line react/function-component-definition
export default function tran() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}
