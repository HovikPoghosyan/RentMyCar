import React from 'react';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isAddCarPopupOpen: false,

};

const appSlice = createSlice({
   name: 'dom',
   initialState,
   reducers: {
      openAddCarPopup( state ) {
         state.isAddCarPopupOpen = true;
      },
      closeAddCarPopup( state ) {
         state.isAddCarPopupOpen = false;
      },
   }
});

export const { 
   openAddCarPopup,
   closeAddCarPopup,
} = appSlice.actions;
export default appSlice.reducer;