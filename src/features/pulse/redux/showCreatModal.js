import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  PULSE_SHOW_CREAT_MODAL,
} from './constants';

export function showCreatModal() {
  return {
    type: PULSE_SHOW_CREAT_MODAL,
  };
}

export function useShowCreatModal() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(showCreatModal(...params)), [dispatch]);
  return { showCreatModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case PULSE_SHOW_CREAT_MODAL:
      return {
        ...state,
        showCreatModal:true
      };

    default:
      return state;
  }
}
