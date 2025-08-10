import React, { 
   useEffect, 
   useState 
} from 'react';
import { 
   useDispatch, 
   useSelector
} from 'react-redux';
import { 
   faCarRear,
   faGasPump,
   faCircleUser,
   faMapLocationDot,
   faSuitcaseRolling,
   faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';

import { setSelectedValues } from 'store/modules/menuReducer';
import { signOut } from 'store/modules/userReducer';

// import { getCountries, getModels } from 'CONSTANTS/Axios';
import { getModels, getCountries } from 'store/modules/menuReducer';

import PassengerSVG from 'assets/icons/Passenger';
import TransmissionSVG from 'assets/icons/Transmission';

import MenuRowHOC from 'components/commons/MenuRowHOC/MenuRowHOC';

import styles from './MenuAside.module.scss';

function MenuAside() {
   const dispatch = useDispatch();
   const [ isHovered, setIsHovered ] = useState( false );
   const countries = useSelector( store => store.menu.countries );
   const carModels = useSelector( store => store.menu.models );
   const selectedCar = useSelector( store => store.list.selectedCar );
   const isAddCarPopupOpen = useSelector( state => state.list.isAddCarPopupOpen );
   const editingCar = useSelector( store => store.list.editingCar );
   
   useEffect( () => { 
      if ( !carModels.length ) dispatch( getModels() );
      if ( !countries.length ) dispatch( getCountries() );
   }, [])

   const getData = ( newValues ) => {
      const name = newValues?.category;
      
      if ( newValues.values.length != 0 ) {
         let isUpdated = false;
         newValues.values.map( item => {
            const title = item?.title;
            if ( title == 'Min' || title == 'Max' ) {
               isUpdated = true;
               return dispatch( setSelectedValues({[ `${ title.toLowerCase() }${ name }` ]: item.value.name }) );
            }
         }) 
         if ( !isUpdated ) {
            return dispatch( setSelectedValues({[ name.toLowerCase() ]: newValues.values.map( item => item.value ) }) )
         } 
      } else if ( [ 'seats', 'price', 'bags' ].includes( name.toLowerCase() ) ) dispatch( setSelectedValues({ [ 'min' + name ]: [], [ 'max' + name ]: [] }) );
      else dispatch( setSelectedValues({ [ name.toLowerCase() ]: [] }) );
   }
   
   return ( 
      <aside 
         className = { classNames( styles.menuAside, {[ styles.menuAsideIsHovered ]: isHovered }) }
         onMouseEnter = { () => ( isAddCarPopupOpen || editingCar || selectedCar ) ? null : setIsHovered( true ) }
         onMouseLeave = { () => ( isAddCarPopupOpen || editingCar || selectedCar ) ? null : setIsHovered( false ) }
      >
         <MenuRowHOC title = "Account" icon = { <FontAwesomeIcon icon = { faCircleUser }/> } isOpen = { isHovered }
            itemsList = {[{ name: 'Sign Out', functionality: () => { dispatch( signOut() ); localStorage.removeItem('user'); sessionStorage.removeItem('user') } }]}
         />
         <MenuRowHOC returnData = { getData } title = "Models" type = "check" icon = { <FontAwesomeIcon icon = { faCarRear }/> } isOpen = { isHovered }
            itemsList = { carModels.map( car => { return { type: 'list', title: car.brand, list: car.models, listType: 'check' }}) }
         />
         <MenuRowHOC returnData = { getData } title = "Fuel" type = "check" icon = { <FontAwesomeIcon icon = { faGasPump }/> } isOpen = { isHovered }
            itemsList = {[
               { name: "Dizel", type: "check",  functionality: () => {} }, 
               { name: "Petrol", type: "check",  functionality: () => {} }, 
               { name: "Gaz", type: "check",  functionality: () => {} }, 
               { name: "LPG", type: "check",  functionality: () => {} }
            ]}
         />
         <MenuRowHOC returnData = { getData } title = "Gears" type = "check" icon = { <TransmissionSVG /> } isOpen = { isHovered }
            itemsList = {[
               { name: "Manual", type: "check",  functionality: () => {} }, 
               { name: "Automatic", type: "check",  functionality: () => {} }, 
            ]}
         />
         <MenuRowHOC returnData = { getData } title = "Seats" type = "check" icon = { <PassengerSVG /> } isOpen = { isHovered }
            itemsList = {[
               { type: 'list', title: 'Min', list: Array.from({ length: 22 }, ( _, i ) => ({ name: i + 1 + ' Person' })), listType: 'select' },
               { type: 'list', title: 'Max', list: Array.from({ length: 22 }, ( _, i ) => ({ name: i + 1 + ' Person' })), listType: 'select' }
            ]}
         />
         <MenuRowHOC returnData = { getData } title = "Price" type = "check" icon = { <FontAwesomeIcon icon = { faHandHoldingDollar }/> } isOpen = { isHovered }
            itemsList = {[
               { type: 'list', title: 'Min', list: Array.from({ length: 20 }, ( _, i ) => ({ name: (( i + 1 ) * 10 ) + '$' }) ), listType: 'select' },
               { type: 'list', title: 'Max', list: Array.from({ length: 20 }, ( _, i ) => ({ name: (( i + 1 ) * 10 ) + '$' }) ), listType: 'select' }]}
         />
         <MenuRowHOC returnData = { getData } title = "Locations" type = "check" icon = { <FontAwesomeIcon icon = { faMapLocationDot }/> } isOpen = { isHovered }
            itemsList = { countries.map( location => { return { type: 'list', title: location.county, list: location.cities, listType: 'check' }}) }
         />
      </aside>
   )
}

export default MenuAside;
