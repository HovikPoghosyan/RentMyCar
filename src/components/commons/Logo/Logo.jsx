import React from 'react';

import styles from './Logo.module.scss';

function Logo() {
    
   return (
      <span>
         <b className = { styles.logo }>Rent</b>
         <p className = { styles.logoThin }>My</p>
         <b className = { styles.logo }>Car</b>
      </span>
   )
}

export default Logo