import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/pulse/Login';

describe('pulse/Login', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Login {...props} />
    );

    expect(
      renderedComponent.find('.pulse-login').length
    ).toBe(1);
  });
});
