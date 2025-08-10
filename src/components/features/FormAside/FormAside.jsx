import React, { 
   useEffect,
   useState,
   useTransition,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './FormAside.module.scss';

import { toggleRememberMe } from 'store/modules/userReducer';

import formValidationTest, {
   conditions,
} from 'formValidationTest.js';

import FormInput from 'components/commons/FormInput/FormInput';
import ToggleButton from 'components/commons/ToggleButton/ToggleButton';


function FormAside({ title, inputes, submitFunction }) {
   const dispatch = useDispatch();
   const [ isOnline, setIsOnline ] = useState( navigator.onLine );
   const [ buttonIsDisable, setButtonIsDisable ] = useState( true );
   const [ errorMessage, setErrorMessage ] = useState( null );
   const [ loading, setloading ] = useState( false );
   const [ errorsList, setErrorsList ] = useState( Object.keys(inputes).reduce(( formData, inputName ) => ({ ...formData, [ inputName ]: undefined }), {}) );
   const [ formData, setFormData ] = useState( Object.keys(inputes).reduce(( formData, inputName ) => ({ ...formData, [ inputName ]: '' }), {}) );
   const rememberMe = useSelector( store => store.user.rememberMe );
   
   useEffect(() => {
      const isAllChecked = Object.values( errorsList ).every( value => value === 'checked' );
      setButtonIsDisable( !isAllChecked );
   }, [ errorsList ]);

   useEffect(() => {
      setErrorMessage( null );
   }, [ formData ])
   useEffect(() => {
      if ( !isOnline ) setErrorMessage( 'Network Error' );
      else setErrorMessage( null );
   }, [ isOnline ])
   
   useEffect(() => {
      const handleOnline = () => setIsOnline( true );
      const handleOffline = () => setIsOnline( false );

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
         window.removeEventListener('online', handleOnline);
         window.removeEventListener('offline', handleOffline);
      };
   }, []);
   
   const handleInputChange = ( event, inputName ) => {
      event.preventDefault();
      const newValue = event.target.value.split(' ').join('');
      setErrorsList({ ...errorsList, [ inputName ]: formValidationTest( newValue, inputName )});
      setFormData(( formData ) => ({
         ...formData,
         [ inputName ]: newValue,
      }));
   };

   const submitData = ( event ) => {
      event.preventDefault();
      setloading( true );
      setButtonIsDisable( true );
      dispatch( submitFunction( formData ) )
      .then( ({ payload }) => {
         if( payload.isFailed ) setErrorMessage( payload.errors.message );

         if ( payload.isFailed && title == 'LogIn' && payload.errors?.list ) {
            setErrorsList({ ...errorsList, ...Object.fromEntries( Object.keys( payload.errors.list ).map( key => [ key, 'fail' ])) });
         } else if ( payload.isFailed && title == 'SignUp' && payload.errors?.list )  {
            setErrorsList({ ...errorsList, ...Object.fromEntries( Object.keys( payload.errors.list ).map( key => [ key, 'fail' ])) });
         } 
         if ( !payload.isFailed && rememberMe ) {
            localStorage.setItem('user', JSON.stringify({
               token: payload.token,
               ...formData,
            }));
            sessionStorage.removeItem('user');
         } else {
            sessionStorage.setItem('user', JSON.stringify({
               ...formData,
            }));
            localStorage.removeItem('user');
         }
         setloading(false);
      });
   };

   return ( 
      <aside className = { styles.formAside }>
         <form className = { styles.form } onSubmit = { submitData }>
            <h2 className = { styles.formTitle }>{ title }</h2>
            <p className = { styles.errorMessage }>{ errorMessage }</p>
            {  Object.keys( inputes ).map(( input ) => {
                  const { placeholder, type = 'text' } = inputes[ input ];
                  
                  return (
                        <FormInput 
                           key = { `${ input }_input` }
                           name = { input }
                           value = { formData[ input ] }
                           placeholder = { placeholder }
                           status = { errorsList[ input ] }
                           type = { type }
                           conditions = { conditions[ input ] }
                           onChange = { ( event ) => handleInputChange( event, input ) }
                        />  
                  );
            })}
            <ToggleButton 
               isChecked = { rememberMe } 
               onToggle = { () => dispatch( toggleRememberMe( ) ) }
            >Remember Me</ToggleButton>
            <button
               disabled = { buttonIsDisable }
               type = "submit"
               className = { styles.submitBtn }
            >{ loading ? "Loading..." : "Submit" }</button>
         </form>
      </aside>
   )
}

export default FormAside;