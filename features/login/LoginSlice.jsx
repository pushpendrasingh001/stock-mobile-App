import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'Login',
  initialState:
   {
     loginEmail: '',
     otp:'',
   },
  reducers:
   {
    setLoginEmail: (state, action) => {
      state.loginEmail = action.payload; 
    },
    setOTP: (state, action) => {
      state.otp = action.payload;
    },
  },
});

export const {setLoginEmail,setOTP} = counterSlice.actions;
export default counterSlice.reducer;
