import React from 'react';

import classNames from 'classnames';

import { signUpUser } from 'store/modules/userReducer';

import DescriptionAside from 'components/features/DescriptionAside/DescriptionAside';
import FormAside from 'components/features/FormAside/FormAside';

import styles from './SignUp.module.scss';

function SignUp() {
   
   return (
      <main className = { styles.main }> 
         <div className = { classNames( 'container', styles.container ) }>
            <DescriptionAside 
               title = "Join RentMyCar – Your Next Adventure Starts Here!"
               paragraph = "Ready to get behind the wheel? Signing up with RentMyCar is fast and easy! By creating an account, you'll unlock exclusive offers, customize your rental experience, and gain access to a wide range of vehicles suited to your needs. From weekend getaways to epic road trips, we’ve got the perfect car for every journey. 
               Fast & Easy Booking: Browse, book, and get on the road in minutes.
               Personalized Preferences: Save your favorite cars and rental details for a smooth experience every time.
               New here? No problem! Signing up takes just a minute, and you’ll be ready to explore the road with us. Start your adventure now — the perfect ride awaits!"
            />
            <FormAside
               title = "SignUp"
               method = "POST"
               submitFunction = { signUpUser }
               inputes = {{
                  name: { placeholder: "Account Name" },
                  email: { placeholder: "Email Address" },
                  password: { placeholder: "Password" },
               }}
            />
         </div>
      </main>   )
}

export default SignUp;