import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchPosts, fetchAddNewCar, fetchUpdateCar } from "CONSTANTS/Axios";

const getPosts = createAsyncThunk(
   'list/getPosts',
   async ( user, { rejectWithValue } ) => {
      const data = await fetchPosts( user );

      if ( data.isFailed ) return rejectWithValue();

      const carsList = data.map( car => ({
         id: car.id,
         model: car.model,
         seats: car.seats,
         price: car.price,
         location: car.city,
         images: car.images,
         fuel: car.fuel,
         gear: car.transmission,
         description: 'gtnvum e lav vijakum voch mi xndir chuni',
         isFavorite: car.is_favorite,
         user: car.user,
         createdAt: car.created_at,
      }));

      return {
         allCars: carsList,
         ownCars: carsList.filter( current => current.user.id === user.id ),
      }
   }
); 

const addNewCar = createAsyncThunk(
   'list/addNewCar',
   async ( { user, newCarData }, { rejectWithValue, dispatch } ) => {
      const data = await fetchAddNewCar( user, newCarData );

      if ( data.isFailed ) return rejectWithValue();

      return dispatch( getPosts( user ) );
   }
); 

const updateCar = createAsyncThunk(
   'list/updateCar',
   async ( { user, updatedCarData }, { rejectWithValue, dispatch } ) => {
      const data = await fetchUpdateCar( user, updatedCarData );

      if ( data.isFailed ) return rejectWithValue();

      return dispatch( getPosts( user ) );
   }
);

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
   selectedCar: false,
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
      setSelectedCar( state, { payload } ) {
         state.selectedCar = payload;
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
   },
   extraReducers: ( builder ) => {
      builder
      .addCase( getPosts.pending, ( state ) => {
         state.loading = true;
      })
      .addCase( getPosts.fulfilled, ( state, { payload } ) => {
         return {
            ...state,
            ...payload,
            loading: false,
         }
      })
      .addCase( getPosts.rejected, ( state ) => {
         state.loading = false;
      })
      .addCase( addNewCar.pending, ( state ) => {
         state.loading = true;
         state.isAddCarPopupOpen = false;
      })
      .addCase( addNewCar.fulfilled, ( state ) => {
      })
      .addCase( addNewCar.rejected, ( state ) => {
         state.loading = false;
      })
      .addCase( updateCar.pending, ( state ) => {
         state.loading = true;
         state.isAddCarPopupOpen = false;
      })
      .addCase( updateCar.fulfilled, ( state ) => {
      })
      .addCase( updateCar.rejected, ( state ) => {
         state.loading = false;
      })
   }
});

export const { 
   setAllCars,
   setOwnCars,
   setLoading,
   setSorting,
   setSelectedCar,
   deletCar,
   makeFavorite,
   deletFavorite,
   openAddCarPopup,
   closeAddCarPopup,
} = appSlice.actions;
export { getPosts, addNewCar, updateCar };
export default appSlice.reducer;