import {
  PULSE_SHOW_AGE_MODAL,
} from '../../../../src/features/pulse/redux/constants';

import {
  showAgeModal,
  reducer,
} from '../../../../src/features/pulse/redux/showAgeModal';

describe('pulse/redux/showAgeModal', () => {
  it('returns correct action by showAgeModal', () => {
    expect(showAgeModal()).toHaveProperty('type', PULSE_SHOW_AGE_MODAL);
  });

  it('handles action type PULSE_SHOW_AGE_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PULSE_SHOW_AGE_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
