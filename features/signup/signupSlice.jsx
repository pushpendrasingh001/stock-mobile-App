import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'signup',
  initialState: {
    email: '',
    password:'',
    gender:'',
    name:'',
    sendNews:false,
    shareData:false
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword:(state,action)=>{
      state.password=action.payload
    },
    setGender:(state,action)=>{
      state.gender=action.payload
    },
    setName:(state,action)=>{
      state.name=action.payload;
    },
    toggleSendNews: (state) => {
      state.sendNews = !state.sendNews;
    },
    toggleShareData: (state) => {
      state.shareData = !state.shareData;
    },
  },
});

export const { setEmail,setPassword,setGender,setName,toggleSendNews,toggleShareData} = counterSlice.actions;
export default counterSlice.reducer;
