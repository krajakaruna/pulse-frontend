import React from 'react';
import { shallow } from 'enzyme';
import { UserPasswordChange } from '../../../src/features/pulse/User';

describe('pulse/UserPasswordChange', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserPasswordChange {...props} />
    );

    expect(
      renderedComponent.find('.pulse-user').length
    ).toBe(1);
  });
});
