import {
  PULSE_SHOW_VIEW_MODAL,
} from '../../../../src/features/pulse/redux/constants';

import {
  showViewModal,
  reducer,
} from '../../../../src/features/pulse/redux/showViewModal';

describe('pulse/redux/showViewModal', () => {
  it('returns correct action by showViewModal', () => {
    expect(showViewModal()).toHaveProperty('type', PULSE_SHOW_VIEW_MODAL);
  });

  it('handles action type PULSE_SHOW_VIEW_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PULSE_SHOW_VIEW_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
