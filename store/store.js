import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../features/signup/signupSlice";
import loginReducer from '../features/login/LoginSlice'
import additionalInformation from '../features/additionalInformation/AddInfo'
export const store = configureStore({
  reducer: {
    signup: signupReducer, 
    login:  loginReducer,
    addInfo:additionalInformation
  },
});
