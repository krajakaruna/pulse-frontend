import React from 'react';
import { shallow } from 'enzyme';
import { Feedback } from '../../../src/features/pulse/Feedback';

describe('pulse/Feedback', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Feedback {...props} />
    );

    expect(
      renderedComponent.find('.pulse-feedback').length
    ).toBe(1);
  });
});
