import React from 'react';
import { shallow } from 'enzyme';
import { Team } from '../../../src/features/pulse/Team';

describe('pulse/Team', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Team {...props} />
    );

    expect(
      renderedComponent.find('.pulse-team').length
    ).toBe(1);
  });
});
