import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faMapLocationDot,
   faPhone,
   faEnvelope,
   faHeart,
   faPen,
} from '@fortawesome/free-solid-svg-icons';

import styles from './ListCard.module.scss';

import { deletPost, addFavorite, removeFavorite  } from 'CONSTANTS/Axios';
import { makeFavorite, deletFavorite, deletCar, openAddCarPopup } from 'store/modules/listReducer';

import Button from '../Button/Button';

function  ListCard({ data, isPrivate = false }) {
   const dispatch = useDispatch();
   const authUser = useSelector( store => store.user );
   const { id, model, seats, price, bags, location, images, fuel, gear, description, user, isFavorite, aosStyle } = data;

   const handleCall = ( phoneNumber ) => window.location.href = `tel:${ phoneNumber }`;
   const handleEmail = ( email ) => window.location.href = `mailto:${ email }`;
   const openMap = ( location ) => window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent( location.name ), '_blank');
   const handeleIsFavorite = () => {
      if ( isFavorite ) {
         dispatch( deletFavorite( id ) );
         removeFavorite( authUser, id );
      } else {
         dispatch( makeFavorite( id ) );
         addFavorite( authUser, id );
      }
   }

return (
   <div className = { styles.carCard } data-aos = { aosStyle }>
      {
         isPrivate
            ?
               <span className = { styles.likeBtn }
                  onClick = { () => dispatch( openAddCarPopup( data ) ) }
               >
                  <FontAwesomeIcon icon = { faPen }/>
               </span>
            :
               <span className = { classNames( styles.likeBtn, {[ styles.likeBtnSelected ] : isFavorite }) }
                  onClick = { handeleIsFavorite }
               >
                  <FontAwesomeIcon icon = { faHeart }/>
               </span>
               
      }
      <img 
         src = { images[ 0 ].path  } 
         alt = "Car Image"
         className = { styles.photo }
      />
      <div className = { styles.details }>
      <h3 className = { styles.name }>{ model.name }</h3>
      <p className = { styles.info }>{ `${ gear } | ${ seats } | ${ fuel } | ${ bags } Bags` }</p>
      <span className = { styles.price }>{ price }</span>

      <div className = { styles.infoButtonsRow }>
         <FontAwesomeIcon className = { styles.infoButton } icon = { faMapLocationDot } color = '#ccc' onClick = { () => openMap( location ) }/>|
         <FontAwesomeIcon className = { styles.infoButton } icon = { faPhone } color = '#ccc' onClick = { () => handleCall( '098 08 03 05' ) }/>|
         <FontAwesomeIcon className = { styles.infoButton } icon = { faEnvelope } color = '#ccc' onClick = { () => handleEmail( user.email ) }/>
      </div>

   
      <Button 
         name = { isPrivate ? "Remove" : "Rent Now" } 
         style = { classNames( styles.btn, isPrivate ? styles.removeBtn : styles.rentBtn ) }
         functionality = { isPrivate ? () => { deletPost( authUser, id ); dispatch( deletCar( id ) ) } : () => console.log('Renting')}
      />
      </div>
   </div>
)      
};

export default ListCard;