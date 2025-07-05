import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './List.module.scss';
import 'aos/dist/aos.css';

import { setSorting } from 'store/modules/listReducer';

import ListCard from 'components/commons/ListCard/ListCard';
import ListMenuToggle from 'components/commons/ListMenuToggle/ListMenuToggle';

import ToTopBtn from 'components/commons/ToTopBtn/ToTopBtn';
import AddCarPopup from '../AddCarPopup/AddCarPopup';
import LoadingCircle from '../LoadingCircle/LoadingCircle';



function List({ data, isPrivate = false }) {
   const dispatch = useDispatch();
   const loading = useSelector( store => store.list.loading );
   
   const toggleSorting = ( value ) => {
      switch ( value ) {
         case 'All':
            dispatch( setSorting({ showFavorites: false }) );
            break;
         case 'Favorites':
            dispatch( setSorting({ showFavorites: true }) );
            break;
         case 'Cheaper':
            dispatch( setSorting({ cheaper: true, moreExpensive: false }) );
            break;
         case 'More Expensive':
            dispatch( setSorting({ cheaper: false, moreExpensive: true }) );
            break;
         default:
            console.log("Unknown filter");
      }

   }
   
   return (
      <div className = { styles.list }>
         <div className = { styles.listMenu }>
            <ListMenuToggle name = "favorite" valueOne = "All" valueTwo = "Favorites" startValue = "All" onToggle = { toggleSorting }/>
            <ListMenuToggle name = "price" valueOne = "Cheaper" valueTwo = "More Expensive" onToggle = { toggleSorting }/>
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