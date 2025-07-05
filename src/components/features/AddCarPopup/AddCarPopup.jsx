import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import { 
   faCarRear,
   faGasPump,
   faMapLocationDot,
   faSuitcaseRolling,
   faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { addNewCar, updateCar } from 'CONSTANTS/Axios';

import { closeAddCarPopup, setEditingCar } from 'store/modules/listReducer';

import TransmissionSVG from 'assets/icons/Transmission';
import PassengerSVG from 'assets/icons/Passenger';
import DropZone from 'components/commons/DropZone/DropZone';
import Button from 'components/commons/Button/Button';

import MenuRowHOC from 'components/commons/MenuRowHOC/MenuRowHOC';

import styles from './AddCarPopup.module.scss';

function AddCarPopup( ) {
   const dispatch = useDispatch();
   const [ loading, setLoading ] = useState( false );
   const [ descriptionLength, setDescriptionLength ] = useState( 0 );
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
   const isAddCarPopupOpen = useSelector( state => state.list.isAddCarPopupOpen );
   const editingCar = useSelector( state => state.list.editingCar );
   const countries = useSelector( store => store.menu.countries );
   const carModels = useSelector( store => store.menu.models );
   const user = useSelector( store => store.user );
   
   useEffect(() => {
      if ( editingCar ) {
         setNewCar( editingCar );
         setDescriptionLength( editingCar.description.length );
      }
   }, [ editingCar ]);

   const handleDescription = ( event ) => {
      const newValue = event.target.value.replace(/\s{2,}/g, ' ');
      setNewCar( previous => ({
         ...previous,
         description: newValue,
      }));
      setDescriptionLength( newValue.length );
   }

   const addCar = ( ) => { 
      setLoading( true );
      addNewCar( user, { 
         model_id: newCar.model.id,
         city_id: newCar.location.id,
         seats: newCar.seats,
         price: newCar.price,
         transmission: newCar.gear,
         fuel: newCar.fuel,
         images: newCar.images,
      }, dispatch )
      .then(() => {
         setLoading( false );
         dispatch( closeAddCarPopup() );
      });
   };

   const editCar = () => {
      setLoading( true );
      updateCar( user, { 
         id: editingCar.id,
         model_id: newCar.model.id,
         city_id: newCar.location.id,
         seats: newCar.seats,
         price: newCar.price,
         transmission: newCar.gear,
         fuel: newCar.fuel,
         images: newCar.images.filter( current => { if ( current instanceof File ) return current }),
         save_image_ids: newCar.images.filter( current => current?.id ).map( current => current.id ),
      }, dispatch )
      .then(() => {
         setLoading( false );
         dispatch( closeAddCarPopup() );
      });
   }
   
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
            <MenuRowHOC 
               title = "Model"  
               type = "select" 
               showValue = { true }
               returnData = { getData }
               icon = { <FontAwesomeIcon icon = { faCarRear }/> }
               itemsList = { carModels.map( car => { return { type: 'list', title: car.brand, list: car.models, listType: 'select' }}) }
               selectedValue = { editingCar ? { title: editingCar.model.mark.name, value: { id: editingCar.model.id, mark_id: editingCar.model.mark.id, name: editingCar.model.name }} : false } 
            />
            <MenuRowHOC
               title = "Fuel"
               type = "select"
               showValue = { true }
               returnData = { getData }
               icon = { <FontAwesomeIcon icon = { faGasPump }/> } 
               itemsList = {[
                  { type: "select", name: "Dizel",  functionality: () => {} }, 
                  { type: "select", name: "Petrol",  functionality: () => {} }, 
                  { type: "select", name: "Gaz",  functionality: () => {} }, 
                  { type: "select", name: "LPG",  functionality: () => {} },
               ]}
               selectedValue = { editingCar ? { value: editingCar.fuel } : false }
            />
            <MenuRowHOC 
               title = "Gear"
               type = "select"
               showValue = { true } 
               returnData = { getData }   
               icon = { <TransmissionSVG /> } 
               itemsList = {[
                  { type: "select", name: "Manual",  functionality: () => {} }, 
                  { type: "select", name: "Automatic",  functionality: () => {} }, 
               ]}
               selectedValue = { editingCar ? { value: editingCar.gear } : false }
            />
            <MenuRowHOC 
               title = "Seats"
               type = "select"
               showValue = { true }
               returnData = { getData }
               icon = { <PassengerSVG /> } 
               itemsList = { Array.from({ length: 22 }, (_, i) => ({ type: "select", name: i + 1 + ' Person', functionality: () => {} })) }
               selectedValue = { editingCar ? { value: editingCar.seats } : false }
            />
            <MenuRowHOC 
               title = "Price"
               type = "select"
               showValue = { true }
               returnData = { getData }
               icon = { <FontAwesomeIcon icon = { faHandHoldingDollar }/> }
               itemsList = { Array.from({ length: 22 }, (_, i) => ({ type: "select", name: (( i + 1 ) * 10 ) + '$', functionality: () => {} })) }
               selectedValue = { editingCar ? { value: editingCar.price } : false }
            />
            <MenuRowHOC 
               title = "Bags"
               type = "select"
               showValue = { true } 
               returnData = { getData }   
               icon = { <FontAwesomeIcon icon = { faSuitcaseRolling }/> } 
               itemsList = { Array.from({ length: 20 }, (_, i) => ({ type: "select", name: i + 1, functionality: () => {} })) }
               selectedValue = { editingCar ? { value: editingCar.bags } : false }
            />
            <MenuRowHOC
               title = "Location"
               type = "select"
               showValue = { true } 
               returnData = { getData }   
               icon = { <FontAwesomeIcon icon = { faMapLocationDot }/> } 
               itemsList = { countries.map( location => { return { type: 'list', title: location.county, list: location.cities, listType: 'select' }}) }
               selectedValue = { editingCar ? { title: editingCar.location.country.name, value: { id: editingCar.location.country.id, country_id: editingCar.location.country.id, name: editingCar.location.name }} : false } 
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
            <DropZone 
               returnImages = { getData }
               selectedImages = { editingCar?.images.map( ({ id, path }) => ({
                     preview: path,
                     name: path.split('/').pop(),
                     id: id,
               }))}
            />
            <div className = { styles.btns }>
               <Button 
                  name = { editingCar ? "Edit" : "Add" } 
                  isDisable = { !( _.every(_.values( newCar ), value => value !== undefined ) && !loading && ( descriptionLength >= 40 ) ) || ( editingCar ? ( _.isEqual( newCar, editingCar ) ) : false ) }
                  style = { styles.btn }
                  functionality = { editingCar ? editCar : addCar }/>
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