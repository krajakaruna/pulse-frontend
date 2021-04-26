import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../src/features/pulse/Home';

describe('pulse/Home', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Home {...props} />
    );

    expect(
      renderedComponent.find('.pulse-home').length
    ).toBe(1);
  });
});
