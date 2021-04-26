import React from 'react';
import { shallow } from 'enzyme';
import { MstJira } from '../../../src/features/pulse/MstJira';

describe('pulse/MstJira', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MstJira {...props} />
    );

    expect(
      renderedComponent.find('.pulse-mst-jira').length
    ).toBe(1);
  });
});
