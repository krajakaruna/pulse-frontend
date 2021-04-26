import React from 'react';
import { shallow } from 'enzyme';
import { Offers } from '../../../src/features/pulse/Offers';

describe('pulse/Offers', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Offers {...props} />
    );

    expect(
      renderedComponent.find('.pulse-offers').length
    ).toBe(1);
  });
});
