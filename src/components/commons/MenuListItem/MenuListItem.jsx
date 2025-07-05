import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCheck,
   faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

import styles from './MenuListItem.module.scss';

function MenuListItem({ name, type, functionality = () => {}, selected = false }) {
   
   return (
      <div className = { styles.item }
         onClick = { functionality }
      >
         <span>{ name }</span> 
         {
            type == 'check'
               ?
                  <FontAwesomeIcon icon = { faCheck } color = { selected ? "rgb(72, 191, 238)" : null }/>
               :
            type == 'select' && selected
               ?
                  <FontAwesomeIcon icon = { faCheckCircle } color = "rgb(72, 191, 238)"/>
               :
                  null
         }
         
      </div>
   )
}

export default MenuListItem;