import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'store/modules/userReducer';
import domReducer from 'store/modules/domReducer';
import listReducer from 'store/modules/listReducer';
import menuReducer from 'store/modules/menuReducer';


function configureReduxStore() {
   const store = configureStore({
      reducer: {
         user: userReducer,
         dom: domReducer,
         list: listReducer,
         menu: menuReducer,
      },
      middleware: ( getDefaultMiddleware ) => getDefaultMiddleware().concat( ),
   })

   return store;
}

export default configureReduxStore;
