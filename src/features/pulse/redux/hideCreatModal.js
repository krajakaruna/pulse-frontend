import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  PULSE_HIDE_CREAT_MODAL,
} from './constants';

export function hideCreatModal() {
  return {
    type: PULSE_HIDE_CREAT_MODAL,
  };
}

export function useHideCreatModal() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(hideCreatModal(...params)), [dispatch]);
  return { hideCreatModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case PULSE_HIDE_CREAT_MODAL:
      return {
        ...state,
        showCreatModal:false
      };

    default:
      return state;
  }
}
