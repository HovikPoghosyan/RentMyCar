import React from 'react';
import { createSlice } from "@reduxjs/toolkit";
import LoadingCircle from 'components/features/LoadingCircle/LoadingCircle';

const initialState = {
   allCars: [],
   ownCars: [],
   sorting: {
      showFavorites: false,
      type: undefined,
      models: undefined,
      seats: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      bags: undefined,  
      location: undefined,
      transmission: undefined,
      fuel: undefined,
   },
   loading: false,
};

const appSlice = createSlice({
   name: 'list',
   initialState,
   reducers: {
      openAddCarPopup( state ) {
         state.isAddCarPopupOpen = true;
      },
      closeAddCarPopup( state ) {
         state.isAddCarPopupOpen = false;
      },
      setAllCars( state, { payload } ) {
         state.allCars = payload;
      },
      setOwnCars( state, { payload } ) {
         state.ownCars = payload;
      },
      setLoading( state, { payload } ) {
         state.loading = payload;
      },
   }
});

export const { 
   setAllCars,
   setOwnCars,
   setLoading,
   openAddCarPopup,
   closeAddCarPopup,
} = appSlice.actions;
export default appSlice.reducer;