import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './Profile.module.scss';

import MenuAside from 'components/features/MenuAside/MenuAside';
import List from 'components/features/List/List';

function Profile() {
   const ownCars = useSelector( store => store.list.ownCars );
   
   return (
      <main className = { styles.main }>
         <div className = { classNames( 'container', styles.container ) }>
            <MenuAside />
            <List data = { ownCars } isPrivate = { true } />
         </div>
      </main>
   )
}

export default Profile;