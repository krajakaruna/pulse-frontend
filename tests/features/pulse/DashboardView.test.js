import React from 'react';
import { shallow } from 'enzyme';
import { DashboardView } from '../../../src/features/pulse/DashboardView';

describe('pulse/DashboardView', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DashboardView {...props} />
    );

    expect(
      renderedComponent.find('.pulse-dashboard-view').length
    ).toBe(1);
  });
});
