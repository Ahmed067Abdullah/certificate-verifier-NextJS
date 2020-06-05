import actionTypes from "./AuthModal.types";
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  id: '',
  name: '',
  email: '',
  checked: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HYDRATE:
      return { ...state };
    case actionTypes.SET_USER:
      return {
        ...state,
        ...payload
      };
    case actionTypes.SET_CHECKED:
      return {
        ...state,
        checked: payload
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;