import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchLogInUser, fetchSignUpUser } from "CONSTANTS/Axios";

const logInUser = createAsyncThunk(
   'user/logInUser',
   async ( userData, { rejectWithValue } ) => {
      const data = await fetchLogInUser( userData );

      if ( data.isFailed ) return rejectWithValue( data );
      return { ...userData, token: data.token, ...data.user };
   }
); 

const signUpUser = createAsyncThunk(
   'user/signUpUser',
   async ( userData, { rejectWithValue } ) => {
      const data = await fetchSignUpUser( userData );

      if ( data.isFailed ) return rejectWithValue( data );
      return { ...userData, token: data.token, ...data.user };
   }
); 

const initialState = {
   name: undefined,
   email: undefined,
   id: undefined,
   token: undefined,
   favoriteIds: undefined,
   rememberMe: false,
   isAuthenticated: undefined,
};

const appSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser( state, { payload } ) {
         return { 
            ...state, 
            ...payload, 
            isAuthenticated: true,
         };
      },
      setUserFalse( state ) {
         state.isAuthenticated = false;
      },
      toggleRememberMe( state ) {
         state.rememberMe = !state.rememberMe;
      },
      signOut( state ) {
         return {
            ...initialState,
            isAuthenticated: false,
         };
      },
   },
   extraReducers: ( builder ) => {
      builder
         .addCase( logInUser.fulfilled, ( state, { payload } ) => {
            
            return {
               ...state,
               ...payload,
               isAuthenticated: true,
            };
         })
         .addCase( logInUser.rejected, ( state ) => {
            state.isAuthenticated = false;
         })
         .addCase( signUpUser.fulfilled, ( state, { payload } ) => {
            return {
               ...state,
               ...payload,
               isAuthenticated: true,
            };
         })
         .addCase( signUpUser.rejected, ( state ) => {
            state.isAuthenticated = false;
         });
   }
});

export const { 
   setUser,
   signOut,
   setUserFalse,
   toggleRememberMe,
} = appSlice.actions;
export { logInUser, signUpUser };
export default appSlice.reducer;