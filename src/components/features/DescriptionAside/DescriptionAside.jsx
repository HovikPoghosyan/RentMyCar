import React from 'react';

import styles from './DescriptionAside.module.scss';

function DescriptionAside({ title, paragraph }) {

   return(
      <aside className = { styles.description }>
         <h2 className = { styles.descriptionTitle }>{ title }</h2>
         <span className = { styles.descriptionParagraph }>{ paragraph }</span>
      </aside>
   )
}

export default DescriptionAside;