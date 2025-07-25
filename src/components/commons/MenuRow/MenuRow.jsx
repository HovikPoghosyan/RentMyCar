import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faCaretDown,
   faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

import styles from './MenuRow.module.scss';

function MenuRow({ title, icon, children, fullView = true, }) {
   const [ isOpen, setIsOpen ] = useState( false );

   useEffect(() => {
      if ( !fullView ) setIsOpen( false );
   }, [ fullView ])
    
   return (
      <div className = { styles.menuAsideRow }
      >
         <div className = { classNames( styles.menuAsideRowMain, {[ styles.menuAsideRowMainOpen ]: isOpen }) }
            onClick = { () => setIsOpen( !isOpen ) }
         >
            <div className = { styles.logo }>
               { icon }
            </div>
            <div 
               className = { classNames( styles.content, {[ styles.displayFlex ]: fullView }) }
            >
               { title }
               <FontAwesomeIcon className = { styles.openBtn } icon = { isOpen ? faCaretUp : faCaretDown }/>
            </div>
         </div>
         <div className = { classNames( styles.menuAsideRowModal, {[ styles.menuAsideRowModalOpen ]: isOpen }) }
         >
            { children }
         </div>
      </div>
   )
}

export default MenuRow;