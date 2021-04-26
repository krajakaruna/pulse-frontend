import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  PULSE_HIDE_VIEW_MODAL,
} from './constants';

export function hideViewModal() {
  return {
    type: PULSE_HIDE_VIEW_MODAL,
  };
}

export function useHideModel() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(hideViewModal(...params)), [dispatch]);
  return { hideViewModal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case PULSE_HIDE_VIEW_MODAL:
      return {
        ...state,
         showViewModal : false
      };

    default:
      return state;
  }
}
