import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedCar } from 'store/modules/listReducer';
import { makeFavorite, deletFavorite } from 'store/modules/listReducer';

import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faHeart,
} from '@fortawesome/free-solid-svg-icons';

import { addFavorite, removeFavorite  } from 'CONSTANTS/Axios';

import DescriptionRow from 'components/commons/DescriptionRow/DescriptionRow';
import Slider from 'components/commons/Slider/Slider';
import Button from 'components/commons/Button/Button';

import styles from './SelectedCarPopup.module.scss';
import "react-alice-carousel/lib/scss/alice-carousel.scss";

function SelectedCarPopup() {
   const dispatch = useDispatch();
   const selectedCar = useSelector( store => store.list.selectedCar );
   const authUser = useSelector( store => store.user );
   const [ isFavorite, setIsFavorite] = useState( false );

   useEffect(() => {
      setIsFavorite( selectedCar?.isFavorite )
   }, [ selectedCar ])

   const handeleIsFavorite = ( ) => {
      if ( isFavorite ) {
         setIsFavorite( false );
         dispatch( deletFavorite( selectedCar.id ) );
         removeFavorite( authUser, selectedCar.id );
      } else {
         setIsFavorite( true );
         dispatch( makeFavorite( selectedCar.id ) );
         addFavorite( authUser, selectedCar.id );
      }
   }

   if ( !selectedCar ) return null;

   return (
      <div 
         className = { styles.background }
         onClick = { event => {
            if ( event.target.className === styles.background ) {
               dispatch( setSelectedCar( false ) );
            }
         }}
      >
         <div className = { styles.modal }>
            <div className = { styles.gallery }>
               <Slider imagesList = { selectedCar.images.map( image => image.path ) }/>
            </div>
            <div className = { styles.description }>
               <h2 className = { styles.descriptionTitle }>Description</h2>
               <div className = { styles.paragraphBlock }>
                  <DescriptionRow 
                     title = { 'Model' }
                     value = { `${ selectedCar.model.mark.name } ${ selectedCar.model.name }` }
                  />
                  <DescriptionRow 
                     title = { 'Fuel' }
                     value = { selectedCar.fuel }
                  />
                  <DescriptionRow 
                     title = { 'Gears' }
                     value = { selectedCar.gear }
                  />
                  <DescriptionRow 
                     title = { 'Seats' }
                     value = { selectedCar.seats }
                  />
                  <DescriptionRow 
                     title = { 'Location' }
                     value = { `${ selectedCar.location.country.name } ${ selectedCar.location.name }` }
                  />
                  <DescriptionRow 
                     title = { 'Phone' }
                     value = { '+374 (98) 08-03-05' }
                  />
                  <DescriptionRow 
                     title = { 'Email' }
                     value = { selectedCar.user.email }
                  />
                  <DescriptionRow 
                     title = { 'Price' }
                     value = { `${ selectedCar.price } / day` }
                  />
               </div>
               <div className = { styles.btnsBlock }>
                  <Button 
                     style = { styles.rentBtn }
                     name = { 'Rent' }
                  />
                  <Button 
                     style = { styles.closeBtn }
                     functionality = { () => dispatch( setSelectedCar( false ) ) }
                     name = "Close"
                  />
               </div>
               
               <Button 
                  style = { classNames( styles.likeBtn, {[ styles.likeBtnSelected ] : isFavorite }) }
                  functionality = { handeleIsFavorite }
                  name = { <FontAwesomeIcon icon = { faHeart }/> }
               />
            </div>
         </div>
      </div>
   )
}

export default SelectedCarPopup;