import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import updateProductReducer from "../reducers/UpdateProductReducer";
import simsReducer from "../reducers/ProductReducer";

const store = configureStore({
  reducer: {
    sims: simsReducer,
    updateProductInfo: updateProductReducer,
  },
  middleware: [thunk]
});

export default store;
