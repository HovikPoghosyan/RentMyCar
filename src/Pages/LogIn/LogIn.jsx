import React from 'react';

import classNames from 'classnames';

import { loginUser } from 'CONSTANTS/Axios';

import DescriptionAside from 'components/features/DescriptionAside/DescriptionAside';
import FormAside from 'components/features/FormAside/FormAside';

import styles from './LogIn.module.scss';

function LogIn() {
   
   return (
      <main className = { styles.main }> 
         <div className = { classNames( 'container', styles.container ) }>
            <DescriptionAside 
               title = "Welcome Back! We’ve Missed You at RentMyCar!"
               paragraph = "Ready for your next adventure? Log in to unlock your bookings, personalize your preferences, and choose the perfect car for the journey ahead. 
                           Whether it’s a spontaneous weekend escape or a dream road trip, we’ve got the ideal ride waiting for you. Don’t wait — let’s get you on the road!
                           New here? No problem! Signing up takes just a minute, and you’ll be set to enjoy smooth, hassle-free rentals anytime, anywhere. Join now and start exploring — your adventure is waiting!"
            />
            <FormAside
               title = "LogIn"
               method = "GET"
               submitFunction = { loginUser }
               inputes = {{
                  email: { placeholder: "Email Address" },
                  password: { placeholder: "Password" },
               }}
            />
         </div>
      </main>
   )
}

export default LogIn;