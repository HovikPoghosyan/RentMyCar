import React, { useEffect, Suspense } from 'react';
import { Outlet, useOutlet } from 'react-router-dom';
import Aos from 'aos';

import Header from 'components/Layouts/Header/Header';
import Footer from 'components/Layouts/Footer/Footer';

import LoadingCircle from 'components/features/LoadingCircle/LoadingCircle';

import { getPosts } from 'CONSTANTS/Axios';

function App() {
   useEffect( () => { Aos.init() }, [] );
   return (
      <div className = "wrapper">
         <Header />
         <Suspense fallback = { <LoadingCircle /> }>
            <Outlet />
         </Suspense>
         <Footer />
      </div>
   )
}

export default App;

