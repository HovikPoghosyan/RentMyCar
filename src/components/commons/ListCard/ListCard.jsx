import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeFavorite, deletFavorite, deletCar, openAddCarPopup } from 'store/modules/listReducer';

import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faMapLocationDot,
   faPhone,
   faEnvelope,
   faHeart,
   faPen,
} from '@fortawesome/free-solid-svg-icons';

import { setSelectedCar } from 'store/modules/listReducer';

import { deletPost, addFavorite, removeFavorite  } from 'CONSTANTS/Axios';

import Button from '../Button/Button';

import styles from './ListCard.module.scss';

function  ListCard({ data, isPrivate = false }) {
   const dispatch = useDispatch();
   const authUser = useSelector( store => store.user );

   const { 
      id, 
      model, 
      seats, 
      price, 
      location, 
      images, 
      fuel, 
      gear, 
      description, 
      user, 
      isFavorite, 
      aosStyle 
   } = data;

   const handleCall = ( phoneNumber ) => window.location.href = `tel:${ phoneNumber }`;
   const handleEmail = ( email ) => window.location.href = `mailto:${ email }`;
   const openMap = ( location ) => window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent( location.name ), '_blank');
   const handeleIsFavorite = ( ) => {
      if ( isFavorite ) {
         dispatch( deletFavorite( id ) );
         removeFavorite( authUser, id );
      } else {
         dispatch( makeFavorite( id ) );
         addFavorite( authUser, id );
      }
   }

   return (
      <div 
         className = { styles.carCard } 
         data-aos = { aosStyle }
         onClick = { () => dispatch( setSelectedCar( data )) }
      >
         {
            isPrivate
               ?
                  <Button 
                     style = { styles.likeBtn }
                     functionality = { event => {
                        event.stopPropagation();
                        dispatch( openAddCarPopup( data ) );
                     }}
                     name = { <FontAwesomeIcon icon = { faPen }/> }
                  />
               :
                  <Button 
                     style = { classNames( styles.likeBtn, {[ styles.likeBtnSelected ] : isFavorite }) }
                     functionality = { event => {
                        event.stopPropagation();
                        handeleIsFavorite();
                     }}
                     name = { <FontAwesomeIcon icon = { faHeart }/> }
                  />
                  
         }
         <img 
            src = { images[ 0 ]?.path  } 
            alt = "Car Image"
            className = { styles.photo }
         />
         <div className = { styles.details }>
         <h3 className = { styles.name }>{ model.name }</h3>
         <p className = { styles.info }>{ `${ gear } | ${ seats } | ${ fuel }` }</p>
         <span className = { styles.price }>{ price }</span>

         <div className = { styles.infoButtonsRow }>
            <FontAwesomeIcon 
               className = { styles.infoButton } 
               icon = { faMapLocationDot } 
               color = '#ccc' 
               onClick = { event => {
                  event.stopPropagation();
                  openMap( location );
               }}/>|
            <FontAwesomeIcon 
               className = { styles.infoButton } 
               icon = { faPhone } 
               color = '#ccc' 
               onClick = { event => {
                  event.stopPropagation();
                  handleCall( '098 08 03 05' );
               }}/>|
            <FontAwesomeIcon 
               className = { styles.infoButton } 
               icon = { faEnvelope } 
               color = '#ccc' 
               onClick = { event => {
                  event.stopPropagation();
                  handleEmail( user.email );
               } }/>
         </div>

      
         <Button 
            name = { isPrivate ? "Remove" : "Rent Now" } 
            style = { classNames( styles.btn, isPrivate ? styles.removeBtn : styles.rentBtn ) }
            functionality = { 
               isPrivate 
                  ? 
                     event => { 
                        event.stopPropagation();
                        deletPost( authUser, id );
                        dispatch( deletCar( id ) );
                     } 
                  : 
                     () => console.log('Renting')}
         />
         </div>
      </div>
   )      
};

export default ListCard;