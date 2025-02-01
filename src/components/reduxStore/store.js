import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";  
import fetchDataReducer from "./fetchData";

const store = configureStore({
  reducer: {
    auth: authReducer,       
    fetchData: fetchDataReducer
  }
});

export default store;