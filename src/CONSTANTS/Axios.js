import axios from "axios";

import { setAllCars, setOwnCars, setLoading } from "store/modules/listReducer";

const API_BASE = 'https://retmycar-production.up.railway.app/api';
const URLS = {
   login: `${API_BASE}/auth/login`,
   register: `${API_BASE}/auth/register`,
   posts: `${API_BASE}/posts`,
   countries: `${API_BASE}/countries`,
   models: `${API_BASE}/marks`,
   deletPost: `${API_BASE}/posts/`,
};

const ajax = async ( url, { method = 'get', headers = {}, data = {} } ) => {
   try {
      const response = await axios({
         url,
         method,
         data,
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers,
         },
      });

      return response.data;
   } catch ( axiosError ) {
      console.error('AJAX Error:', axiosError );
      return {
         isFailed: true,
         errors: {
            message: axiosError?.response?.data?.message || axiosError.message || 'Unknown Error',
            list: axiosError?.response?.data?.errors ? { ...axiosError.response.data.errors } : null,
         },
      };
   }
};



const fetchLogInUser = async ( userData ) => {
   const data = await ajax( URLS.login, {
      method: 'post',
      data: {
         email: userData?.email,
         password: userData?.password,
      },
   });

   return data;
};

const fetchSignUpUser = async ( userData ) => {
   const data = await ajax( URLS.register, {
      method: 'post',
      data: {
         ...userData,
         password_confirmation: userData.password,
      },
   });

   return data;
};

const fetchPosts = async ( user ) => {
   const data = await ajax( URLS.posts, {
      headers: {
         'Authorization': `Bearer ${ user.token }`,
      },
      method: 'get',
   });

   return data;
};

const deletPost = async ( user, id ) => {
   const data = await ajax( URLS.deletPost + id , {
      headers: {
         'Authorization': `Bearer ${ user.token }`,
      },
      method: 'DELETE',
   });

   if ( data.isFailed )  return data;

   return data;
};

const addFavorite = async ( user, id ) => {
   const data = await ajax( `${ URLS.posts }/${ id }/favorite`, {
      headers: {
         'Authorization': `Bearer ${ user.token }`,
      },
      method: 'post',
   });
   
   if ( data.isFailed ) {
      return data;
   };
   
   return data;
};

const removeFavorite = async ( user, id ) => {
   const data = await ajax( `${ URLS.posts }/${ id }/favorite`, {
      headers: {
         'Authorization': `Bearer ${ user.token }`,
      },
      method: 'DELETE',
   });

   if ( data.isFailed ) {
      return data;
   };
   
   return data;
};

const fetchCountries = async ( ) => {
   const data = await ajax( URLS.countries, {
      method: 'get'
   });

   if ( data.isFailed ) return data;

   return data;
};

const fetchModels = async ( ) => {
   const data = await ajax( URLS.models, {
      method: 'get'
   } );

   if ( data.isFailed ) return data;

   return data;
};

const fetchAddNewCar = async ( user, newCarData ) => {
   const data = await ajax( URLS.posts, {
      method: 'post',
      headers: {
         'Content-Type': 'multipart/form-data', 
         'Authorization': `Bearer ${ user.token }`,
      },
      data: {
         ...newCarData,
      }
   } );

   return data;
};

const fetchUpdateCar = async ( user, updatedCarData ) => {

   const data = await ajax( `${ URLS.posts }/${ updatedCarData.id }`, {
      method: 'post',
      headers: {
         'Content-Type': 'multipart/form-data', 
         'Authorization': `Bearer ${ user.token }`,
      },
      data: {
         ...updatedCarData,
         _method: 'PUT',
      }
   } );

   return data;
};

export {
   fetchLogInUser,
   fetchSignUpUser,
   fetchPosts,
   fetchCountries,
   fetchModels,
   fetchAddNewCar,
   fetchUpdateCar,
   deletPost,
   addFavorite,
   removeFavorite,
};
export default ajax;
