import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   allCars: [],
   ownCars: [],
   sorting: {
      showFavorites: false,
      cheaper: false,
      moreExpensive: false,
   },
   loading: false,
   isAddCarPopupOpen: false,
   editingCar: false,
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
      makeFavorite( state, { payload } ) {
         state.allCars = state.allCars.map( car => car.id == payload ? { ...car, isFavorite: true } : car );
      },
      deletFavorite( state, { payload } ) {
         state.allCars = state.allCars.map( car => car.id == payload ? { ...car, isFavorite: false } : car );
      },
      deletCar( state, { payload } ) {
         state.allCars = state.allCars.filter( car => car.id !== payload );
         state.ownCars = state.ownCars.filter( car => car.id !== payload );
      },
      openAddCarPopup( state, { payload } ) {
         state.isAddCarPopupOpen = true;
         state.editingCar = payload;
      },
      closeAddCarPopup( state ) {
         state.isAddCarPopupOpen = false;
         state.editingCar = false;
      },
      setSorting( state, { payload } ) {
         state.sorting = { ...state.sorting, ...payload }
      }
   }
});

export const { 
   setAllCars,
   setOwnCars,
   setLoading,
   setSorting,
   deletCar,
   makeFavorite,
   deletFavorite,
   openAddCarPopup,
   closeAddCarPopup,
} = appSlice.actions;
export default appSlice.reducer;