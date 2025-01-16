import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'addInfo',
  initialState: 
  {
    gender:'',
    sendNews:false,
    shareData:false,
  
  },
  reducers:
   {
    setGender:(state,action)=>{
      state.gender=action.payload
    },
    toggleSendNews: (state) => {
      state.sendNews = !state.sendNews;
    },
    toggleShareData: (state) => {
      state.shareData = !state.shareData;
    },
  },
});

export const { setGender,toggleSendNews,toggleShareData} = counterSlice.actions;
export default counterSlice.reducer;
