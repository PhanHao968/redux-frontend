import {
  FETCH_SIMS_REQUEST,
  FETCH_SIMS_SUCCESS,
  FETCH_SIMS_FAILURE,
  CLEAR_SEARCH_RESULTS,
  RESTORE_SIMS,
}
  from '../constants/ProductConstant';


export const fetchSimsRequest =()=>({
  type:FETCH_SIMS_REQUEST,
});

export const fetchSimsSuccess = (sims)=>({
  type: FETCH_SIMS_SUCCESS,
  payload: sims,
})

export const fetchSimsFailure = (error) => ({
  type: FETCH_SIMS_FAILURE,
  payload: error,
});

export const clearSearchResults = () => {
    return {
        type: CLEAR_SEARCH_RESULTS,
    };
};

export const restoreSims = () => {
    return {
        type: RESTORE_SIMS,
    };
};

export const fetchSims = () => {
  return async (dispatch) => {
    dispatch(fetchSimsRequest());
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "dashboard");
      console.log("url/3000:",response)
      const data = await response.json();
      dispatch(fetchSimsSuccess(data));
    } catch (error) {
      dispatch(fetchSimsFailure(error));
    }
  };
};

export const trashSims = () => {
  return async (dispatch) => {
    dispatch(fetchSimsRequest());
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "trashsim/");
      const data = await response.json();
      dispatch(fetchSimsSuccess(data));
    } catch (error) {
      dispatch(fetchSimsFailure(error));
    }
  };
};
