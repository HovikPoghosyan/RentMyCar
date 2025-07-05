import React from 'react';

import styles from './ToggleButton.module.scss';

function ToggleButton({ children,  isChecked = false, onToggle }) {

   return (
      <div className = { styles.container }> 
         <label htmlFor = "toggle" className = { styles.toggleSwitch }>
            <input id = "toggle" checked = { isChecked } onChange = { onToggle } type = "checkbox" />
            <span className = { styles.slider }></span>
         </label>
         <span onClick = { onToggle } className = { styles.name }>{ children }</span>
      </div>
   )
}

export default ToggleButton;