import React from 'react';

import styles from './Footer.module.scss';

function Footer() {
   
   return (
      <footer className = { styles.footer }>
         <div className = { `container ${ styles.container }` }>
            <section className = { styles.footerLeft }>
               <p>&#xA9; 2025 RentMyCar</p>
            </section>
            <section className = { styles.footerRight }></section>
         </div>
      </footer>
   )
}

export default Footer;