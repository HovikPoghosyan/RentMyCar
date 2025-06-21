import React, { 
   useEffect,
   useState,
   useTransition,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './FormAside.module.scss';

import formValidationTest, {
   conditions,
} from 'formValidationTest.js';

import FormInput from 'components/commons/FormInput/FormInput';
import ToggleButton from 'components/commons/ToggleButton/ToggleButton';
import { toggleRememberMe } from 'store/modules/userReducer';


function FormAside({ title, inputes, submitFunction }) {
   const [ isOnline, setIsOnline ] = useState( navigator.onLine );
   const [ buttonIsDisable, setButtonIsDisable ] = useState( true );
   const [ errorMessage, setErrorMessage ] = useState( null );
   const [ loading, setloading ] = useState( false );
   const [ errorsList, setErrorsList ] = useState( Object.keys(inputes).reduce(( formData, inputName ) => ({ ...formData, [ inputName ]: undefined }), {}) );
   const [ formData, setFormData ] = useState( Object.keys(inputes).reduce(( formData, inputName ) => ({ ...formData, [ inputName ]: '' }), {}) );
   const dispatch = useDispatch();
   const rememberMe = useSelector( store => store.user.rememberMe );
   
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
      submitFunction( formData, dispatch )
      .then(( result ) => {
         console.log('result: ', result);

         if( result.isFailed ) setErrorMessage( result.errors.message );

         if ( result.isFailed && title == 'LogIn' && result.errors?.list ) {
            setErrorsList({ ...errorsList, ...Object.fromEntries( Object.keys( result.errors.list ).map( key => [ key, 'fail' ])) });
         } else if ( result.isFailed && title == 'SignUp' && result.errors?.list )  {
            setErrorsList({ ...errorsList, ...Object.fromEntries( Object.keys( result.errors.list ).map( key => [ key, 'fail' ])) });
         } 
         if ( !result.isFailed && rememberMe ) {
            localStorage.setItem('user', JSON.stringify({
               token: result.token,
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

   return ( 
      <aside className = { styles.formAside }>
         <form className = { styles.form } onSubmit = { submitData }>
            <h2 className = { styles.formTitle }>{ title }</h2>
            <p className = { styles.errorMessage }>{ errorMessage }</p>
            {  Object.keys( inputes ).map(( input ) => {
                  const { placeholder } = inputes[ input ];

                  return (
                        <FormInput 
                           key = { `${ input }_input` }
                           name = { input }
                           value = { formData[ input ] }
                           placeholder = { placeholder }
                           status = { errorsList[ input ] }
                           conditions = { conditions[ input ] }
                           onChange = { ( event ) => handleInputChange( event, input ) }
                        />  
                  );
            })}
            <ToggleButton 
               isChecked = { rememberMe } 
               onToggle = { () => dispatch( toggleRememberMe() ) }
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