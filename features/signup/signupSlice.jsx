import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'signup',
  initialState: {
    email: '',
    name:'',
    mobileNumber: ''
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName:(state,action)=>{
      state.name=action.payload;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
  },
});

export const { setEmail,setPassword,setName,setMobileNumber} = counterSlice.actions;
export default counterSlice.reducer;
