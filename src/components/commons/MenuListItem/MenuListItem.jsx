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
         <span className = "ListItemName">{ name }</span> 
         {
            type == 'check'
               ?
                  <FontAwesomeIcon className = "ListItemIcon" icon = { faCheck } color = { selected ? "rgb(72, 191, 238)" : null }/>
               :
            type == 'select' && selected
               ?
                  <FontAwesomeIcon className = "ListItemIcon" icon = { faCheckCircle } color = "rgb(72, 191, 238)"/>
               :
                  null
         }
         
      </div>
   )
}

export default MenuListItem;