import React, { useState, useEffect } from 'react';
import * as yup from "yup";

const Form = () => {



const [formState, setFormState] = useState({
  name: "",
  email: "",
  password: "",
  terms: ""
});

const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
  terms: ""
});

const [disableBtn, setDisableBtn] = useState(true)

const [users, setUsers] = useState([])

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    email: yup
      .string()
      .email("Must be a valid email address.")
      .required(),
    password: yup
      .string()
      .required()
      .min(6, 'Must be at least six characters.'),
    terms: yup.boolean().oneOf([true], "Please agree to terms."),
  });

  const validateForm = e => {
    yup
    .reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then(valid => {
      setErrors({...errors, [e.target.name]: ''});
    })
    .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
  };

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      console.log(valid);
      setDisableBtn(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    console.log("form submitted!");
    
  };

  const inputChange = e => {
    console.log("input changed!", e.target.value);
    e.persist()
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateForm(e)
    setFormState(newFormData);
  };

  return(
    <form className='user-form' onSubmit={formSubmit}>
      <label htmlFor='name'>
        Name
        <input id='name' type='text' name='name' onChange={inputChange} value={formState.name}>
        </input>
        {errors.name.length > 0 ? <p>{errors.name}</p> : null}
      </label>
      <label htmlFor='email'>
        Email
        <input id='email' type='text' name='email' onChange={inputChange} value={formState.email}>
        </input>
      </label>
      <label htmlFor='password'>
        Password
        <input id='password' type='text' name='password' onChange={inputChange} value={formState.password}>
        </input>
      </label>
      <label htmlFor='terms' className='terms'>
        Terms of Service
        <input id='terms' type='checkbox' name='terms' checked={formState.terms} onChange={inputChange}>
        </input>  
      </label>
      <button disabled={disableBtn} type='submit'>Submit</button>
    </form>
  )
}


export default Form;