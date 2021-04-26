import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../src/features/pulse/Footer';

describe('pulse/Footer', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Footer {...props} />
    );

    expect(
      renderedComponent.find('.pulse-footer').length
    ).toBe(1);
  });
});
