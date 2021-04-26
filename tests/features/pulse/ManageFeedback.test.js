import React from 'react';
import { shallow } from 'enzyme';
import { ManageFeedback } from '../../../src/features/pulse/ManageFeedaback';

describe('pulse/ManageFeedback', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ManageFeedback {...props} />
    );

    expect(
      renderedComponent.find('.pulse-manage-feedaback').length
    ).toBe(1);
  });
});
