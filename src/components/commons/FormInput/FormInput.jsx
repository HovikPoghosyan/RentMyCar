import React, {
   useRef,
} from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faInfoCircle,
   faXmarkCircle,
   faCheckCircle,
   faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

import styles from './FormInput.module.scss';


function FormInput({ name, placeholder, value, onChange, status, type, conditions }) {
   
   const indicatorStyle = {
      undefined: { icon: faCheckCircle, style: styles.defaultColor },
      checked: { icon: faCheckCircle, style: styles.checkedColor },
      require: { icon: faExclamationCircle, style: styles.requireColor },
      fail: { icon: faXmarkCircle, style: styles.failColor },
   };
   const { icon: faIcon, style: faStyle } = indicatorStyle[ status ] || {};
   const inputRef = useRef( null );
   
   return (
      <div className = { styles.formRow }>
         <input
            id = { name }
            placeholder = ' '
            type = { type }
            value = { value }
            ref = { inputRef }
            onChange = { onChange }
            onMouseEnter = { () => inputRef.current.focus() }
            className = { styles.formInput }
            autoComplete = "off"
         />
         <label 
            className = { styles.formLable }
         >{ placeholder }</label>
         <span className = { classNames( styles.formInputIndicator, faStyle ) }>
            <FontAwesomeIcon size = "2xl" icon = { faIcon }/>
         </span>
         <span className = { styles.formInputInfo }>
            <FontAwesomeIcon size = "2xl" icon = { faInfoCircle }/>
         </span>
         <div className = { styles.formInputConditions }>
            <strong className = { styles.formInputConditionsTitle }>Conditions</strong>
            <p className = { styles.formInputConditionsParagraph }>{ conditions }</p>
         </div>
      </div>
   )
}

export default FormInput;