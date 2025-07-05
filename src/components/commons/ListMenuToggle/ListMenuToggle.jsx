import React from 'react';

import classNames from 'classnames';

import styles from './ListMenuToggle.module.scss';

function ListMenuToggle({ name, valueOne, valueTwo, startValue, onToggle }) {

   return (
      <div 
         className = { styles.toggle }
         >
         <input
            name = { name }
            type = 'radio'
            id = { valueOne }
            className = { styles.toggleInput }
            onClick = { ( ) => onToggle( valueOne ) }
            defaultChecked = { valueOne === startValue }
         />
         <label htmlFor = { valueOne }
            className = { classNames( styles.toggleBtn, styles.leftBtn ) }  
         >{ valueOne }</label>
         <input
            name = { name }
            type = 'radio'
            id = { valueTwo }
            className = { styles.toggleInput }  
            onClick = { ( ) => onToggle( valueTwo ) }
            defaultChecked = { valueTwo === startValue }
         />
         <label htmlFor = { valueTwo }
            className = { classNames( styles.toggleBtn, styles.rightBtn ) }  
         >{ valueTwo }</label>
      </div>
   )
};

export default ListMenuToggle;