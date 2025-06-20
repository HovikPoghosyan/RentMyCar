import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';

import styles from './ToTopBtn.module.scss';

function ToTopBtn() {
   const [ isScrolled, setIsScrolled ] = useState( false );
   window.onscroll = () => {
      
      if ( !isScrolled && document.documentElement.scrollTop > 50 ) {
         setIsScrolled( true );
      }
      else if ( isScrolled && document.documentElement.scrollTop < 50 ) setIsScrolled( false );
   }
   const goTop = () => {
      document.documentElement.scrollTop = 0;
   };

   if ( !isScrolled ) return;

   return (
      <div 
         data-aos = "flip-right"
         onClick = { goTop }
         className = { styles.toTopBtn }
      >   
       <FontAwesomeIcon icon = { faUpLong }/>
      </div>
   )
}

export default ToTopBtn;