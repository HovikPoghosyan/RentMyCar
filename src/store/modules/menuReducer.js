import React from 'react';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   countries: [],
   models: [],
   selectedValues: {
      models: [],
      fuel: [],
      gears: [],
      minSeats: [],
      maxSeats: [],
      minPrice: [],
      maxPrice: [],
      minBags: [],
      maxBags: [],
      locations: [],
   }
};

const appSlice = createSlice({
   name: 'menu',
   initialState,
   reducers: {
      addCountries( state, { payload }) {
         state.countries = payload;
      },
      addModels( state, { payload }) {
         state.models = payload;
      },
      setSelectedValues( state, { payload }) {
         state.selectedValues = { ...state.selectedValues, ...payload };
      },
   }
});

export const { 
   addCountries,
   addModels,
   setSelectedValues,
} = appSlice.actions;
export default appSlice.reducer;