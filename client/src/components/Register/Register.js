import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './Register.css';



function Register() {
    
    const initialValues = {
      username: "",
      password: "",
    };
  
    const validationSchema = Yup.object().shape({
      username: Yup.string().min(3).max(15).required(),
      password: Yup.string().min(4).max(20).required(),
    });
  
  
    const onSubmit = async (data) => {

        axios.post("http://localhost:8080/api/register", data)
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            window.location.reload(true);
          }
        });
    };
  
    return(
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
        <Form className="register-wrapper">
          <h1>Please Register</h1>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreateUsername"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePassword"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
          <h3>Alredy have an account? <button onClick={()=>{window.location.reload(true)}}>Log in</button></h3>
        </Form>
      </Formik>

    </div>
  );
}

export default Register;
 