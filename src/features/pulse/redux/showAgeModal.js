import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  PULSE_SHOW_AGE_MODAL,
} from './constants';

export function showAgeModal() {
  return {
    type: PULSE_SHOW_AGE_MODAL,
  };
}

export function useShowAgeModal() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(showAgeModal(...params)), [dispatch]);
  return { showAgeModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case PULSE_SHOW_AGE_MODAL:
      return {
        ...state,
        showAgeModal:true
      };

    default:
      return state;
  }
}
