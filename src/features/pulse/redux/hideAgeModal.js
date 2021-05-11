import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  PULSE_HIDE_AGE_MODAL,
} from './constants';

export function hideAgeModal() {
  return {
    type: PULSE_HIDE_AGE_MODAL,
  };
}

export function useHideAgeModal() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(hideAgeModal(...params)), [dispatch]);
  return { hideAgeModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case PULSE_HIDE_AGE_MODAL:
      return {
        ...state,
        showAgeModal:false
      };

    default:
      return state;
  }
}
