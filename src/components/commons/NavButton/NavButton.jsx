import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavButton.module.scss';

function NavButton({ info }) {
   const {   
      textContent = 'click', 
      link = undefined,
      functionality = () => {},
   } = info;

   return (
      <li>
         {
            link 
            ?
               <NavLink 
                  className = { styles.navLink }
                  to = { link }
                  onClick = { functionality }
               >{ textContent }</NavLink>
            :
               <button
                  className = { styles.navButton }
                  onClick = { functionality }
               >{ textContent }</button>
         }
         
      </li>
   )
}

export default NavButton;
