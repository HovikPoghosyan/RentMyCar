import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from './CarsList.module.scss';

import { getPosts } from 'CONSTANTS/Axios';

import List from 'components/features/List/List';
import MenuAside from 'components/features/MenuAside/MenuAside';

function CarsList() {
   const allCars = useSelector( store => store.list.allCars );

   return (
      <main className = { styles.main }>
         <div className = { classNames( 'container', styles.container ) }>
            <MenuAside />
            <List data = { allCars }/>
         </div>
      </main>
   )
}

export default CarsList;