import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/features/pulse/Dashboard';

describe('pulse/Dashboard', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Dashboard {...props} />
    );

    expect(
      renderedComponent.find('.pulse-dashboard').length
    ).toBe(1);
  });
});
