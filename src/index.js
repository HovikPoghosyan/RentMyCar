import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'index.css';

import routesConfig from 'RoutesConfig/RoutesConfig';

import configureReduxStore from 'store/configureReduxStore';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
const store = configureReduxStore();
root.render(
   <Provider store = { store }>
      <RouterProvider router = { routesConfig() }/>
   </Provider> 
);

