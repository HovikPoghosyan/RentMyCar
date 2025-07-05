import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { openAddCarPopup } from 'store/modules/listReducer';

import NavButton from 'components/commons/NavButton/NavButton';

import styles from './Navigation.module.scss';

function Navigation() {
   const dispatch = useDispatch();
   const { pathname } = useLocation();
   
   let navigationData = [];
   
   switch ( pathname ) {
      case '/':
         navigationData = [];
         break;
      case '/login':
         navigationData = [{ textContent: 'SignUp', link: '/signup' }];
         break;
      case '/signup':
         navigationData = [{ textContent: 'LogIn', link: '/login' }];
         break;
      case '/carslist':
         navigationData = [
            { textContent: 'Profile', link: '/profile' },
            { textContent: 'Add Car', functionality: () => dispatch( openAddCarPopup() ) },
         ];
         break;
      case '/profile':
         navigationData = [
            { textContent: 'List', link: '/carslist' },
            { textContent: 'Add Car', functionality: () => dispatch( openAddCarPopup() ) },
         ];         
         break;
      default:
         navigationData = [{ textContent: 'LogIn', link: '/login' }];
   }

   return (
      <nav className = { styles.navBar }>
         <ul>
            {
               navigationData.map( buttonData => (
                  <NavButton 
                     key = { buttonData.textContent }
                     info = { buttonData }
                  /> 
               ))
            }
         </ul>
      </nav>
   )
}

export default Navigation;