import React from 'react';

import { setUser } from 'store/modules/userReducer';

const userMiddleware = storeAPI => next => action => {
   // if ( action.type == 'user/setUser' ) {
   //    console.log('setUser: ', action.payload );
   // }

   // if ( action.type == 'user/signOut' ) {

   // }
   
   return next( action );
};

export default userMiddleware;

