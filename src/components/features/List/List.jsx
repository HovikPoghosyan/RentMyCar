import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'aos/dist/aos.css';

import { setSorting } from 'store/modules/listReducer';

import ListCard from 'components/commons/ListCard/ListCard';
import ListMenuToggle from 'components/commons/ListMenuToggle/ListMenuToggle';
import ToTopBtn from 'components/commons/ToTopBtn/ToTopBtn';
import AddCarPopup from '../AddCarPopup/AddCarPopup';
import SelectedCarPopup from '../SelectedCarPopup/SelectedCarPopup';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

import styles from './List.module.scss';


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
         case 'withoutPrice':
            dispatch( setSorting({ cheaper: false, moreExpensive: false }) );
            break;
         default:
            console.log("Unknown filter");
      }

   }
   
   return (
      <div className = { styles.list }>
         <div className = { styles.listMenu }>
            <ListMenuToggle name = "favorite" valueOne = "All" valueTwo = "Favorites" startValue = "All" onToggle = { toggleSorting } uncheckedValue = "All"/>
            <ListMenuToggle name = "price" valueOne = "Cheaper" valueTwo = "More Expensive" onToggle = { toggleSorting } uncheckedValue = "withoutPrice"/>
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
                           data.map(( car, id ) => {
                              return <div key = { id }
                                 data-aos="zoom-out-up"
                                 data-aos-offset="20"
                                 data-aos-anchor-placement="top-bottom">
                                 <ListCard data = { car } isPrivate = { isPrivate } />
                              </div>}
                  )   
            }
            {
               
               
            }
         </div>
         <ToTopBtn />
         <AddCarPopup />
         <SelectedCarPopup />
      </div>
   )
}

export default List;