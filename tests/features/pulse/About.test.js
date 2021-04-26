import React from 'react';
import { shallow } from 'enzyme';
import { About } from '../../../src/features/pulse/About';

describe('pulse/About', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <About {...props} />
    );

    expect(
      renderedComponent.find('.pulse-about').length
    ).toBe(1);
  });
});
