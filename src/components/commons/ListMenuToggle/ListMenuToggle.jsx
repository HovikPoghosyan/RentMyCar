import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './ListMenuToggle.module.scss';

function ListMenuToggle({ name, valueOne, valueTwo, startValue }) {

return (
      <div className = { styles.toggle }>
         <input
            name = { name }
            type = 'radio'
            id = { valueOne }
            className = { styles.toggleInput }
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
            defaultChecked = { valueTwo === startValue }
         />
         <label htmlFor = { valueTwo }
            className = { classNames( styles.toggleBtn, styles.rightBtn ) }  
         >{ valueTwo }</label>
      </div>
   )
};

export default ListMenuToggle;