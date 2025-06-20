const regExpressions = {
   name: /^[a-zA-Z0-9_.]{3,16}$/,
   password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/,
   email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
}

const conditions = {
   name: `Username must be 3-16 characters long and can only contain letters, numbers, underscores, or periods.`,
   password: `Password must be 8-20 characters long, contain at least one lowercase letter, one uppercase letter, and one number.`,
   email: `Enter a valid email address (e.g., user@example.com). It must contain letters, numbers, or special characters like . _ % + - before the '@', followed by a domain (e.g., example.com).`,
}

const formValidationTest = ( newValue, inputName ) => {
   if( newValue.length == 0 ) return 'require';
   else if ( !regExpressions[ inputName ].test( newValue ) ) return 'fail';
   else return 'checked';
};

export { conditions };
export default formValidationTest;