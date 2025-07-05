import React from 'react';

import Logo from 'components/commons/Logo/Logo';
import Navigation from 'components/features/Navigation/Navigation';

import styles from './Header.module.scss';

function Header() {
   
   return (
      <header className = { styles.header }>
         <div className = { `container ${ styles.container }` }>
            <Logo />
            <Navigation />
         </div>
      </header>
   )
}

export default Header;