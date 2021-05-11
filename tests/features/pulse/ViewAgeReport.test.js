import React from 'react';
import { shallow } from 'enzyme';
import { ViewAgeReport } from '../../../src/features/pulse/ViewAgeReport';

describe('pulse/ViewAgeReport', () => {
  it('renders node with correct class name', () => {
    const props = {
      pulse: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ViewAgeReport {...props} />
    );

    expect(
      renderedComponent.find('.pulse-view-age-report').length
    ).toBe(1);
  });
});
