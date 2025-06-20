import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
   faCarRear,
   faGasPump,
   faCircleUser,
   faMapLocationDot,
   faSuitcaseRolling,
   faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import styles from './AddCarPopup.module.scss';

import { closeAddCarPopup } from 'store/modules/domReducer';

import MenuRowHOC from 'components/commons/MenuRowHOC/MenuRowHOC';

import TransmissionSVG from 'assets/icons/Transmission';
import PassengerSVG from 'assets/icons/Passenger';
import DropZone from 'components/commons/DropZone/DropZone';
import Button from 'components/commons/Button/Button';

import { addNewCar, deletPost } from 'CONSTANTS/Axios';
import DescriptionAside from '../DescriptionAside/DescriptionAside';

function AddCarPopup() {
   const dispatch = useDispatch();
   const [ loading, setLoading ] = useState( false );
   const [ descriptionLength, setDescriptionLength ] = useState( '0' );
   const isAddCarPopupOpen = useSelector( state => state.dom.isAddCarPopupOpen );
   const countries = useSelector( store => store.menu.countries );
   const carModels = useSelector( store => store.menu.models );
   const user = useSelector( store => store.user );
   const [ newCar, setNewCar ] = useState({
      model: undefined,
      seats: undefined,
      price: undefined,
      bags: undefined,
      location: undefined,
      images: undefined,
      fuel: undefined,
      gear: undefined,
      description: undefined,
   });

   const handleDescription = ( event ) => {
      const newValue = event.target.value.replace(/\s{2,}/g, ' ');
      setDescriptionLength( newValue.length );
      setNewCar( previous => ({
         ...previous,
         description: newValue,
      }))
   }

   const addCar = ( ) => { 
      setLoading( true );
      addNewCar( dispatch, user.token , { 
         model_id: newCar.model.id,
         city_id: newCar.location.id,
         seats: newCar.seats,
         price: newCar.price,
         transmission: newCar.gear,
         fuel: newCar.fuel,
         images: newCar.images,
      })
      .then(() => {
         setLoading( false );
         dispatch( closeAddCarPopup() );
      });
   };
   
   const getData = ( newValues ) => {
      if ( newValues ) {
         const name = newValues.category.toLowerCase();
         const value = newValues.values;
         setNewCar({ ...newCar, [ name ]: value });
      }
   };
   
   if ( isAddCarPopupOpen == false ) return null;
   
   return (
      <div
         className = { styles.addCarPopupBack }
         onClick = { event => {
            if ( event.target.className == styles.addCarPopupBack ) {
               dispatch( closeAddCarPopup( ) );
            }
         }}
      >
         <div className = { styles.modal } 
         data-aos = "zoom-in">   
            <h2 className = { styles.title }>Description</h2>
            <MenuRowHOC showValue = { true } returnData = { getData } title = "Model" type = "select" icon = { <FontAwesomeIcon icon = { faCarRear }/> }
               itemsList = { carModels.map( car => { return { type: 'list', title: car.brand, list: car.models, listType: 'select' }}) }
            />
            <MenuRowHOC showValue = { true } returnData = { getData } title = "Fuel" type = "select" icon = { <FontAwesomeIcon icon = { faGasPump }/> } 
               itemsList = {[
                  { type: "select", name: "Dizel",  functionality: () => {} }, 
                  { type: "select", name: "Petrol",  functionality: () => {} }, 
                  { type: "select", name: "Gaz",  functionality: () => {} }, 
                  { type: "select", name: "LPG",  functionality: () => {} },
               ]}
            />
            <MenuRowHOC showValue = { true } returnData = { getData } title = "Gear" type = "select" icon = { <TransmissionSVG /> } 
               itemsList = {[
                  { type: "select", name: "Manual",  functionality: () => {} }, 
                  { type: "select", name: "Automatic",  functionality: () => {} }, 
               ]}
            />
            <MenuRowHOC showValue = { true } returnData = { getData } title = "Seats" type = "select" icon = { <PassengerSVG /> } 
               itemsList = { Array.from({ length: 22 }, (_, i) => ({ type: "select", name: i + 1 + ' Person', functionality: () => {} })) }
            />
            <MenuRowHOC showValue = { true } returnData = { getData } title = "Price" type = "select" icon = { <FontAwesomeIcon icon = { faHandHoldingDollar }/> }
               itemsList = { Array.from({ length: 22 }, (_, i) => ({ type: "select", name: (( i + 1 ) * 10 ) + '$', functionality: () => {} })) }
            />
            <MenuRowHOC showValue = { true } returnData = { getData } title = "Bags" type = "select" icon = { <FontAwesomeIcon icon = { faSuitcaseRolling }/> } 
               itemsList = { Array.from({ length: 20 }, (_, i) => ({ type: "select", name: i + 1, functionality: () => {} })) }
            />
            <MenuRowHOC showValue = { true } returnData = { getData } title = "Location" type = "select" icon = { <FontAwesomeIcon icon = { faMapLocationDot }/> } 
               itemsList = { countries.map( location => { return { type: 'list', title: location.county, list: location.cities, listType: 'select' }}) }
            />
            <div className = { styles.descriptionBlock }>
               <textarea 
                  value = { newCar.description || '' }
                  rows = { 4 } 
                  placeholder = "Description..." 
                  className = { styles.descriptionArea }
                  onChange = { handleDescription }
               />
               <span className = { styles.descriptionCount } >{ `${ descriptionLength } / 40`}</span>
            </div>
            <DropZone returnImages = { getData } />
            <div className = { styles.btns }>
               <Button 
                  name = "Add" 
                  isDisable = { !( _.every(_.values( newCar ), value => value !== undefined ) && !loading && ( descriptionLength > 40 ) ) }
                  style = { styles.btn }
                  functionality = { addCar }/>
               <Button 
                  isDisable = { loading }
                  name = "Close" 
                  style = { styles.btn }
                  functionality = { ( ) => dispatch( closeAddCarPopup() )}/>
            </div>
         </div>
      </div>
   )  
}

export default AddCarPopup;