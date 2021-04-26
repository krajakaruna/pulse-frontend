import React from 'react';
import { shallow } from 'enzyme';
import { UserCreat } from '../../../src/features/pulse/UserCreat';

describe('pulse/UserCreat', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UserCreat {...props} />
    );

    expect(
      renderedComponent.find('.pulse-user-creat').length
    ).toBe(1);
  });
});
