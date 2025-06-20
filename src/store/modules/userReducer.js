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
      setUser( user, { payload } ) {
         return { 
            ...user, 
            ...payload, 
            isAuthenticated: true 
         };
      },
      setUserFalse( user ) {
         return {
            ...user,
            isAuthenticated: false
         };
      },
      toggleRememberMe( user ) {
         return {
            ...user,
            rememberMe: !user.rememberMe,
         }
      },
      signOut() {
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