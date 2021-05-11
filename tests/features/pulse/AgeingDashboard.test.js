import React from 'react';
import { shallow } from 'enzyme';
import { AgeingDashboard } from '../../../src/features/pulse/AgeingDashboard';

describe('pulse/AgeingDashboard', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AgeingDashboard {...props} />
    );

    expect(
      renderedComponent.find('.pulse-ageing-dashboard').length
    ).toBe(1);
  });
});
