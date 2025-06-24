import React, { useEffect, useState } from 'react';

import styles from './List.module.scss';
import 'aos/dist/aos.css';

import ListCard from 'components/commons/ListCard/ListCard';
import ListMenuToggle from 'components/commons/ListMenuToggle/ListMenuToggle';

import ToTopBtn from 'components/commons/ToTopBtn/ToTopBtn';
import AddCarPopup from '../AddCarPopup/AddCarPopup';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { useSelector } from 'react-redux';

function List({ data, isPrivate = false, columns = 4 }) {
   const loading = useSelector( store => store.list.loading );
   
   return (
      <div className = { styles.list }>
         <div className = { styles.listMenu }>
            <ListMenuToggle name = "favorite" valueOne = "All" valueTwo = "Favorites" startValue = "All"/>
            <ListMenuToggle name = "price" valueOne = "Cheaper" valueTwo = "More Expensive"/>
         </div>
         <div className = { styles.listGrid }>
            {
               loading 
                  ? 
                     <LoadingCircle />
                  : 
                     !data.length 
                        ? 
                           <p className = { styles.noCarsMessage }>There aren`t any car yet</p> 
                        :
                           data.map(( car, id ) => (
                              <div key = { id }
                                 data-aos="zoom-out-up"
                                 data-aos-offset="20"
                                 data-aos-anchor-placement="top-bottom">
                                 <ListCard data = { car } isPrivate = { isPrivate } />
                              </div>
                  ))   
            }
            {
               
               
            }
         </div>
         <ToTopBtn />
         <AddCarPopup />
      </div>
   )
}

export default List;