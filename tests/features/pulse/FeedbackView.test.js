import React from 'react';
import { shallow } from 'enzyme';
import { FeedbackView } from '../../../src/features/pulse/FeedbackView';

describe('pulse/FeedbackView', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FeedbackView {...props} />
    );

    expect(
      renderedComponent.find('.pulse-feedback-view').length
    ).toBe(1);
  });
});
