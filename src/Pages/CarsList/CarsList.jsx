import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import filterCarsList from 'CONSTANTS/FilteCarsList';

import List from 'components/features/List/List';
import MenuAside from 'components/features/MenuAside/MenuAside';

import styles from './CarsList.module.scss';

function CarsList() {
   const allCars = useSelector( store => store.list.allCars );
   const [ carsData, setCarsData ] = useState( [ ...allCars ] );
   const sorting = useSelector( store => store.list.sorting );
   const filters = useSelector( store => store.menu.selectedValues );
   
   useEffect( () => {
      setCarsData( filterCarsList( { ...sorting, ...filters }, allCars ) );
   }, [ sorting, filters, allCars ])
   return (
      <main className = { styles.main }>
         <div className = { classNames( 'container', styles.container ) }>
            <MenuAside />
            <List data = { carsData }/>
         </div>
      </main>
   )
}

export default CarsList;