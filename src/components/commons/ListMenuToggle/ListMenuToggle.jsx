import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import styles from './ListMenuToggle.module.scss';

function ListMenuToggle({ name, valueOne, valueTwo, startValue, onToggle, uncheckedValue = null }) {
   const [ selectedValue, setSelectedValue ] = useState( null );

   useEffect(() => { setSelectedValue( startValue ) }, [])

   const toggle = ( value ) => {
      setSelectedValue( selectedValue === value ? startValue : value );
      onToggle( selectedValue === value ? uncheckedValue : value )
   }

   return (
      <div 
         className = { styles.toggle }
         >
         <input
            name = { name }
            type = 'radio'
            id = { valueOne }
            className = { styles.toggleInput }
            onClick = { ( ) => toggle( valueOne ) }
            checked = { selectedValue == valueOne }
            readOnly
         />
         <label htmlFor = { valueOne }
            className = { classNames( styles.toggleBtn, styles.leftBtn ) }  
         >{ valueOne }</label>
         <input
            name = { name }
            type = 'radio'
            id = { valueTwo }
            className = { styles.toggleInput }  
            onClick = { ( ) => toggle( valueTwo ) }
            checked = { selectedValue == valueTwo }
            readOnly
         />
         <label htmlFor = { valueTwo }
            className = { classNames( styles.toggleBtn, styles.rightBtn ) }  
         >{ valueTwo }</label>
      </div>
   )
};

export default ListMenuToggle;