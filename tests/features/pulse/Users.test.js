import React from 'react';
import { shallow } from 'enzyme';
import { Users } from '../../../src/features/pulse/Users';

describe('pulse/Users', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Users {...props} />
    );

    expect(
      renderedComponent.find('.pulse-users').length
    ).toBe(1);
  });
});
