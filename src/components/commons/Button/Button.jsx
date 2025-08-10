import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

function Button({ name, functionality, style, isDisable = false }) {

   return (
      <button 
         disabled = { isDisable }
         className = { classNames( styles.btn, style )} 
         onClick = { functionality } 
      >{ name }</button>
   )
}

export default Button;