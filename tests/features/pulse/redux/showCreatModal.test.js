import {
  PULSE_SHOW_CREAT_MODAL,
} from '../../../../src/features/pulse/redux/constants';

import {
  showCreatModal,
  reducer,
} from '../../../../src/features/pulse/redux/showCreatModal';

describe('pulse/redux/showCreatModal', () => {
  it('returns correct action by showCreatModal', () => {
    expect(showCreatModal()).toHaveProperty('type', PULSE_SHOW_CREAT_MODAL);
  });

  it('handles action type PULSE_SHOW_CREAT_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PULSE_SHOW_CREAT_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
