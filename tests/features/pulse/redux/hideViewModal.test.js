import {
  PULSE_HIDE_VIEW_MODAL,
} from '../../../../src/features/pulse/redux/constants';

import {
  hideViewModal,
  reducer,
} from '../../../../src/features/pulse/redux/hideViewModal';

describe('pulse/redux/hideViewModal', () => {
  it('returns correct action by hideViewModal', () => {
    expect(hideViewModal()).toHaveProperty('type', PULSE_HIDE_VIEW_MODAL);
  });

  it('handles action type PULSE_HIDE_VIEW_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PULSE_HIDE_VIEW_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
