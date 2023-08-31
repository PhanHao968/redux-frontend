import {
  FETCH_SIMS_REQUEST,
  FETCH_SIMS_SUCCESS,
  FETCH_SIMS_FAILURE,
  SET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS, RESTORE_SIMS
}
  from '../constants/ProductConstant';


const initialState = {
  sims: [],
  loading: false,
  error: null,
};

const simsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        sims: action.payload,
      };
    case FETCH_SIMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SIMS_SUCCESS:
      return {
        ...state.sims,
        loading: false,
        sims: action.payload,
      };
    case FETCH_SIMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        sims: [],
      };
    case RESTORE_SIMS:
      return {
        ...state,
        sims: action.payload,
      };
    default:
      return state;
  }
};

export default simsReducer;