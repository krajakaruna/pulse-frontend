import React from 'react';
import { shallow } from 'enzyme';
import { ItJira } from '../../../src/features/pulse/ItJira';

describe('pulse/ItJira', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ItJira {...props} />
    );

    expect(
      renderedComponent.find('.pulse-it-jira').length
    ).toBe(1);
  });
});
