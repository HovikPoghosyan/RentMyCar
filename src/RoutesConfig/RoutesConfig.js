import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RouteLayout from './RouteLayout';

const App = lazy(() => import('App/App'));
const LogIn = lazy(() => import('Pages/LogIn/LogIn'));
const SignUp = lazy(() => import('Pages/SignUp/SignUp'));
const CarsList = lazy(() => import('Pages/CarsList/CarsList'));
const Profile = lazy(() => import('Pages/Profile/Profile'));
const NotFound = lazy(() => import('Pages/NotFound/NotFound'));


function routesConfig() {
   return createBrowserRouter([
      {
         path: '/',
         element: <App/>,
         children: [
            {
               index: true,
               element: <RouteLayout pageType = 'index' />,
            },
            {
               path: 'login',
               element: <RouteLayout Page = { LogIn } pageType = 'guest' redirectPath = '/carslist' />,
            },
            {
               path: 'signup',
               element: <RouteLayout Page = { SignUp } pageType = 'guest' redirectPath = '/carslist' />,
            },
            {
               path: 'carslist',
               element: <RouteLayout Page = { CarsList } pageType = 'private' redirectPath = '/login' />,
            },
            {
               path: 'profile',
               element: <RouteLayout Page = { Profile } pageType = 'private' redirectPath = '/login' />,
            },
            {
               path: '*',
               element: <NotFound />,
            },
         ],
      },
   ]);
}

export default routesConfig;

























// const isAuthenticated = () => new Promise((resolve, reject) => {
//    setTimeout(() => {
//       if ( Math.random() < 0.5  ) {
//          resolve( true );
//       } else {
//          reject( false );
//       }
//    }, 4000); 
// });

// const checkAuth = async () => isAuthenticated()
//    .then(() => true )
//    .catch(() => false );

   


// const routeDefinitions = [
//    {
//       path: 'login',
//       element: <LogIn />,
//       pageType: 'guest',
//       redirectPath: '/carslist',
//    },
//    {
//       path: 'signup',
//       element: <SignUp />,
//       pageType: 'guest',
//       redirectPath: '/carslist',
//    },
//    {
//       path: 'carslist',
//       element: <CarsList />,
//       pageType: 'private',
//       redirectPath: '/login',
//    },
//    {
//       path: 'profile',
//       element: <Profile />,
//       pageType: 'private',
//       redirectPath: '/login',
//    },
// ];

// const routesConfig = () => {
//    const [authStatus, setAuthStatus] = useState(null);   

//    useEffect(() => {
//       const verifyAuth = async () => {
//       const result = await checkAuth();
//       setAuthStatus(result);
//       };

//       verifyAuth();
//    }, []);
//    console.log('authStatus: ', authStatus);
//    const children = routeDefinitions.map(({ path, element, pageType, redirectPath }) => {

//       if (pageType === 'guest' && isAuthenticated()) { 
//          return {
//             path,
//             element: isAuthenticated() ? <Navigate to = { redirectPath } replace /> : element,
//          };
//       } else if (pageType === 'private') {
//          return {
//             path,
//             element: isAuthenticated() ? element : <Navigate to={redirectPath} replace />,
//          };
//       } else return { path, element };
//    });

//    console.log('isAuthenticated: ', isAuthenticated().then( result => result ))
//    children.unshift({
//       index: true,
//       element: <Navigate to = { isAuthenticated() ? "/profile" : "/login" } replace />
//    });   

//    children.push({
//       path: '*',  
//       element: <NotFound />,
//    });

//    return createBrowserRouter([
//       {
//          path: '/',
//          element: <App/>,
//          children: children,
//       },
//    ]);
// };


















// // function routesConfig () {

// //    return createBrowserRouter([{
// //       path: '/',
// //       element: App,
// //       element: <RouteLayout 
// //             Page = { App } 
// //             pageType = 'index'
// //          />,
// //       children: [ 
// //          {
// //             path: 'login',
// //             element: <RouteLayout 
// //                   Page = { LogIn } 
// //                   pageType = 'guest'
// //                   redirectPath = '/carslist'
// //                />,
// //          },
// //          {
// //             path: 'signup',
// //             element: <RouteLayout 
// //                   Page = { SignUp } 
// //                   pageType = 'guest'
// //                   redirectPath = '/carslist'
// //                />,
// //          },
// //          {
// //             path: 'carslist',
// //             element: <RouteLayout 
// //                   Page = { CarsList } 
// //                   pageType = 'private'
// //                   redirectPath = '/login'
// //                />,
// //          },
// //          {
// //             path: 'profile',
// //             element: <RouteLayout 
// //                   Page = { Profile } 
// //                   pageType = 'private'
// //                   redirectPath = '/login'
// //                />,
// //          },
// //          {
// //             path: '*',
// //             element: <NotFound />,
// //          }
// //       ]
// //    }])
// // };

// export default routesConfig;

