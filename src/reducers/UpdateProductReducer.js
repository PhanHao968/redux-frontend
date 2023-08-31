
// eslint-disable-next-line no-unused-vars
import { UPDATE_PRODUCT_INFO } from '../constants/UpdateProductConstant';
// eslint-disable-next-line no-unused-vars
import { DELETE_PRODUCT } from '../constants/UpdateProductConstant'

const initialState = {
  network: "",
  phone_number: "",
  price: "",
  category: "",
  detail: "",
  simId: null
};

const updateProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT":
      if(state.data){
        const filteredProducts = state.data.filter((sim) => sim.id !== action.payload);
        return {
          ...state,
          data: filteredProducts
        };
      }
      return state;

    case "UPDATE_PRODUCT_INFO":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default updateProductReducer;