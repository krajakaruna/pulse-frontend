import React from 'react';
import { shallow } from 'enzyme';
import { Ortom8Jira } from '../../../src/features/pulse/Ortom8Jira';

describe('pulse/Ortom8Jira', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Ortom8Jira {...props} />
    );

    expect(
      renderedComponent.find('.pulse-ortom-8-jira').length
    ).toBe(1);
  });
});
