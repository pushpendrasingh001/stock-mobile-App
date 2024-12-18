import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup/signupSlice"; // Make sure this path is correct

export const store = configureStore({
  reducer: {
    signup: signupReducer, 
  },
});
