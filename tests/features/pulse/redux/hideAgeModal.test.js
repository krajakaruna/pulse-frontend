import {
  PULSE_HIDE_AGE_MODAL,
} from '../../../../src/features/pulse/redux/constants';

import {
  hideAgeModal,
  reducer,
} from '../../../../src/features/pulse/redux/hideAgeModal';

describe('pulse/redux/hideAgeModal', () => {
  it('returns correct action by hideAgeModal', () => {
    expect(hideAgeModal()).toHaveProperty('type', PULSE_HIDE_AGE_MODAL);
  });

  it('handles action type PULSE_HIDE_AGE_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PULSE_HIDE_AGE_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
