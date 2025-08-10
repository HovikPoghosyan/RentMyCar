import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchCountries, fetchModels } from "CONSTANTS/Axios";

const getCountries = createAsyncThunk(
   'menu/getCountries',
   async () => {
      const data = await fetchCountries();
      return data;
   }
);

const getModels = createAsyncThunk(
   'menu/getModels',
   async () => {
      const data = await fetchModels();
      return data;
   }
);

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
      locations: [],
   }
};

const appSlice = createSlice({
   name: 'menu',
   initialState,
   reducers: {
      setSelectedValues( state, { payload }) {
         state.selectedValues = { ...state.selectedValues, ...payload };
      },
   },
   extraReducers: ( builder ) => {
      builder
      .addCase( getCountries.fulfilled, ( state, { payload } ) => {
         state.countries = payload;
      })
      .addCase( getModels.fulfilled, ( state, { payload } ) => {
         state.models = payload;
      })
   }
});

export const { 
   setSelectedValues,
} = appSlice.actions;
export { getCountries, getModels };
export default appSlice.reducer;