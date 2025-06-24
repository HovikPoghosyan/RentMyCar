import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoadingCircle from 'components/features/LoadingCircle/LoadingCircle';

import { setUserFalse } from 'store/modules/userReducer';

import { loginUser } from 'CONSTANTS/Axios';

import { getPosts } from 'CONSTANTS/Axios';

const RouteLayout = ({ Page, pageType, redirectPath }) => {
   const dispatch = useDispatch();
   const user = useSelector( store => store.user );
   const isAuthenticated = useSelector( store => store.user.isAuthenticated );
   
   useEffect(() => {
      if ( isAuthenticated ) getPosts( user, dispatch );
   }, [ isAuthenticated ])

   useEffect(() => {
      const userString = localStorage.getItem( 'user' ) || sessionStorage.getItem( 'user' );
      const userData = userString ? JSON.parse( userString ) : null;
      if ( isAuthenticated === undefined ) {
         if ( !userData?.email && !userData?.password && !userData?.token ) dispatch( setUserFalse() );
         else {
            loginUser( userData, dispatch );
         }
      }
   }, [ user, isAuthenticated ]);
   if ( isAuthenticated === undefined ) return <LoadingCircle />;

   if ( pageType === 'index' ) {
      if ( isAuthenticated ) return <Navigate to = "carslist" />;
      else return <Navigate to = "login" />;
   }

   if ( pageType === 'private' && !isAuthenticated ) return <Navigate to = { redirectPath } />;
   if ( pageType === 'guest' && isAuthenticated ) return <Navigate to = { redirectPath } />;

   return <Page />;
};

export default RouteLayout;
















// import React, {
//    useEffect,
// } from 'react';
// import { 
//    useSelector,
//    useDispatch,
// } from 'react-redux';
// import { 
//    useNavigate,
// } from 'react-router-dom'; 

// import { 
//    setUser,
// } from 'store/modules/userReducer';

// function RouteLayout({ redirectPath, Page, pageType }) {
//    const navigate = useNavigate();
//    const dispatch = useDispatch();

//    const user = useSelector( store => store.user );
//    localStorage.setItem('user', JSON.stringify(user));

//    useEffect(() => {
//       let isAuthorized = false;
//       const authorizedUser = JSON.parse( localStorage.getItem( {
//          email: "example@gmail.com",
//          password: "password"
//        } ) );
//       const userKeyTesting = true;

//       fetch('https://retmycar-production.up.railway.app/api/auth/login', {
//          method: 'POST',
//          headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({
//             "email": "example@gmail.com",
//             "password": "password"
//          })
//       })
//       .then(response => response.json())
//       .then(data => {
//          console.log('Success:', data);
//       })
//       .catch(error => {
//          console.error('Error:', error);
//       });
       
   
//       if ( userKeyTesting ) {
//          //fetchov stugenq usery ka te che;
//          const fetchResult = true;
//          const fetchData = JSON.parse( localStorage.getItem( 'loggedInUser' ) );
//          if ( fetchResult ) dispatch( setUser( fetchData ) );
//          isAuthorized = true;
//       }
//       const startPath = isAuthorized ? '/carslist' : '/login';
//       navigate( startPath );
//    }, []);

//    // if ( pageType == 'private' && !user?.key ) return <Navigate to = { redirectPath }/>
//    // if ( pageType == 'guest' && user?.key ) return <Navigate to = { redirectPath }/>
//    return <Page />;
// }

// export default RouteLayout;