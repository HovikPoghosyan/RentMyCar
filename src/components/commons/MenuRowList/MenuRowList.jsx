import React, { useState } from 'react';

import _ from 'lodash';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCaretUp,
   faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

import styles from './MenuRowList.module.scss';

import MenuListItem from 'components/commons/MenuListItem/MenuListItem'

function MenuRowList({ title, itemsList = [], type, selectedValues, returnValue }) {
   const [ isOpen, setIsOpen ] = useState( false );
   
   return (
      <div className = { styles.itemRow }>
         <span className = { classNames( styles.title, {[ styles.titleIsOpen ]: isOpen }) }
         onClick = { () => setIsOpen( !isOpen )}
         >
            { title } 
            <FontAwesomeIcon className = { classNames( styles.openBtn, {[ styles.openBtnActive ]: isOpen }) } icon = { isOpen ? faCaretUp : faCaretDown }/>
         </span> 
            
         
         <div className = { classNames( styles.modal, {[ styles.modalIsOpen ]: isOpen }) }>
            {
               itemsList.map(( item ) => {   
               return <MenuListItem 
                  key = { `${ title }_${ item.name }` } 
                  name = { item.name } 
                  type = { type }
                  functionality = { () =>  {
                     returnValue( item );
                  } }
                  selected = {( _.some( selectedValues, { title: title, value: item }) )}
               />})
            }
         </div>
      </div>
   )
}

export default MenuRowList;