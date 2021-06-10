import React from 'react';

function useForm () {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: e.target.validationMessage});
    setIsValid(e.target.closest("form").checkValidity());
  };

  return {values, handleChange, errors, isValid, setValues};
}

export default useForm;