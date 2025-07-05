import { createSlice } from "@reduxjs/toolkit";

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
   }
});

export const { 
   setUser,
   signOut,
   setUserFalse,
   toggleRememberMe,
} = appSlice.actions;
export default appSlice.reducer;