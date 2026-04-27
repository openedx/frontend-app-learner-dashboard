import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DashboardTabs from './DashboardTabs';

jest.mock('@openedx/paragon', () => {
  const ReactLib = require('react');

  const Tabs = ({ children, activeKey, onSelect }) => {
    const tabs = ReactLib.Children.toArray(children);
    const activeTab = tabs.find(tab => tab.props.eventKey === activeKey) || tabs[0];

    return (
      <div>
        <div>
          {tabs.map(tab => (
            <button
              key={tab.props.eventKey}
              type="button"
              role="tab"
              onClick={() => onSelect?.(tab.props.eventKey, {})}
            >
              {tab.props.title}
            </button>
          ))}
        </div>
        <div>{activeTab?.props.children}</div>
      </div>
    );
  };

  const Tab = () => null;

  return {
    Tabs,
    Tab,
  };
});

const tabs = [
  {
    key: 'courses',
    title: 'Courses',
    panel: <div>Courses panel</div>,
  },
  {
    key: 'programs',
    title: 'Programs',
    panel: <div>Programs panel</div>,
  },
  {
    key: 'history',
    title: 'History',
    panel: <div>History panel</div>,
  },
];

describe('DashboardTabs', () => {
  it('renders all tab labels', () => {
    render(
      <DashboardTabs
        activeTab="courses"
        onSelect={jest.fn()}
        tabs={tabs}
      />,
    );

    expect(screen.getByRole('tab', { name: 'Courses' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Programs' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'History' })).toBeInTheDocument();
  });

  it('renders content for active tab', () => {
    const { rerender } = render(
      <DashboardTabs
        activeTab="courses"
        onSelect={jest.fn()}
        tabs={tabs}
      />,
    );

    expect(screen.getByText('Courses panel')).toBeInTheDocument();
    expect(screen.queryByText('Programs panel')).not.toBeInTheDocument();

    rerender(
      <DashboardTabs
        activeTab="programs"
        onSelect={jest.fn()}
        tabs={tabs}
      />,
    );

    expect(screen.getByText('Programs panel')).toBeInTheDocument();
    expect(screen.queryByText('Courses panel')).not.toBeInTheDocument();
  });

  it('calls onSelect when user clicks a tab', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <DashboardTabs
        activeTab="courses"
        onSelect={onSelect}
        tabs={tabs}
      />,
    );

    await user.click(screen.getByRole('tab', { name: 'Programs' }));
    expect(onSelect).toHaveBeenCalledWith('programs', expect.anything());
  });

  it('switches tab content in controlled usage', async () => {
    const user = userEvent.setup();

    const ControlledWrapper = () => {
      const [activeTab, setActiveTab] = React.useState('courses');
      return (
        <DashboardTabs
          activeTab={activeTab}
          onSelect={setActiveTab}
          tabs={tabs}
        />
      );
    };

    render(<ControlledWrapper />);

    expect(screen.getByText('Courses panel')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'History' }));
    expect(screen.getByText('History panel')).toBeInTheDocument();
    expect(screen.queryByText('Courses panel')).not.toBeInTheDocument();
  });
});