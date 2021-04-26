import React from 'react';
import { shallow } from 'enzyme';
import { Role } from '../../../src/features/pulse/Role';

describe('pulse/Role', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Role {...props} />
    );

    expect(
      renderedComponent.find('.pulse-role').length
    ).toBe(1);
  });
});
