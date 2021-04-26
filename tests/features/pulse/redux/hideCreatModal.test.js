import {
  PULSE_HIDE_CREAT_MODAL,
} from '../../../../src/features/pulse/redux/constants';

import {
  hideCreatModal,
  reducer,
} from '../../../../src/features/pulse/redux/hideCreatModal';

describe('pulse/redux/hideCreatModal', () => {
  it('returns correct action by hideCreatModal', () => {
    expect(hideCreatModal()).toHaveProperty('type', PULSE_HIDE_CREAT_MODAL);
  });

  it('handles action type PULSE_HIDE_CREAT_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PULSE_HIDE_CREAT_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
