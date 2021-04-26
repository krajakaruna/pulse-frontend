import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  PULSE_SHOW_VIEW_MODAL,
} from './constants';

export function showViewModal() {
  return {
    type: PULSE_SHOW_VIEW_MODAL,
  };
}

export function useShowModel() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(showViewModal(...params)), [dispatch]);
  return { showViewModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case PULSE_SHOW_VIEW_MODAL:
      return {
        ...state,
          showViewModal : true
      };

    default:
      return state;
  }
}
