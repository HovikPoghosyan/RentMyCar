import axios from "axios";

import { setAllCars, setOwnCars, setLoading } from "store/modules/listReducer";
import { setUser, setUserFalse } from "store/modules/userReducer";
import { addCountries, addModels } from "store/modules/menuReducer";

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



const loginUser = async ( userData, dispatch ) => {
   const data = await ajax( URLS.login, {
      method: 'post',
      data: {
         email: userData?.email,
         password: userData?.password,
      },
   });

   if ( data.isFailed ) {
      dispatch( setUserFalse() );
      return data;
   }
   
   dispatch( setUser({ ...userData, token: data.token, ...data.user }) );
   return data;
};

const signUpUser = async ( userData, dispatch ) => {
   const data = await ajax( URLS.register, {
      method: 'post',
      data: {
         ...userData,
         password_confirmation: userData.password,
      },
   });

   if (data.isFailed) {
      dispatch(setUserFalse());
      return data;
   }

   dispatch(setUser({ ...userData, token: data.token }));
   return data;
};

const getPosts = async ( user, dispatch ) => {
   dispatch( setLoading( true ));
   const data = await ajax( URLS.posts, {
      headers: {
         'Authorization': `Bearer ${ user.token }`,
      },
      method: 'get',
   });

   if ( data.isFailed ) {
      dispatch( setLoading( false ) );
      return data;
   };

   const allCars = data.map( car => ({
      id: car.id,
      model: car.model,
      seats: car.seats,
      price: car.price,
      bags: '3',
      location: car.city,
      images: car.images,
      fuel: car.fuel,
      gear: car.transmission,
      description: 'gtnvum e lav vijakum voch mi xndir chuni',
      isFavorite: car.is_favorite,
      user: car.user,
   }));
   
   const ownCars = allCars.filter( current => current.user.id === user.id );
   console.log('user: ', user)
   console.log('allCars: ', allCars)
   console.log('ownCars: ', ownCars)
   dispatch( setAllCars( allCars  ) );
   dispatch( setOwnCars( ownCars ) ); 
   dispatch( setLoading( false ) );
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

const getCountries = async ( dispatch ) => {
   const data = await ajax( URLS.countries, {
      method: 'get'
   });

   if ( data.isFailed ) return data;

   dispatch( addCountries( data ) );
   return data;
};

const getModels = async ( dispatch ) => {
   const data = await ajax( URLS.models, {
      method: 'get'
   } );

   if ( data.isFailed ) return data;

   dispatch( addModels( data ) );
   return data;
};

const addNewCar = async ( user, newCarData, dispatch ) => {
   dispatch( setLoading( true ) );
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

   if ( data.isFailed ) {
      dispatch( setLoading( false ) );
      return data;
   };
   
   getPosts( user.name, dispatch );
   dispatch( setLoading( false ) );
   return data;
};

const updateCar = async ( user, updatedCarData, dispatch ) => {
   dispatch( setLoading( true ) );
   console.log('updatedCarData: ', { ...updatedCarData})
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

   if ( data.isFailed ) {
      dispatch( setLoading( false ) );
      return data;
   };
   
   getPosts( user.name, dispatch );
   dispatch( setLoading( false ) );
   return data;
};

export {
   loginUser,
   signUpUser,
   getPosts,
   getCountries,
   getModels,
   addNewCar,
   updateCar,
   deletPost,
   addFavorite,
   removeFavorite,
};
export default ajax;
