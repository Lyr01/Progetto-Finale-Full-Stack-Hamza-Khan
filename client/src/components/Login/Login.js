import React, { useState } from 'react';
import Register from '../Register/Register'
import axios from 'axios';
import './Login.css';


export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [display, setDisplay] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = { "username": username, "password": password };

    if (!username || !password) {
      alert("Username or Password is blank")
    } else {
      axios.post("http://localhost:8080/api/login", formData)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          localStorage.setItem("accessToken", res.data);
          localStorage.setItem("username", username);
          window.location.reload(true);
        }
      });
    }

};

  return(display? <Register /> :
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>

        <label>
          <p>Username:</p>
          <input type="text" 
          onChange={e => setUserName(e.target.value)}
          placeholder="(Ex. John123...)" 
          />
        </label>

        <label>
          <p>Password:</p>
          <input type="password" 
          onChange={e => setPassword(e.target.value)}
          placeholder="Your Password..." 
          />      
        </label>
        
      </form>
      <button type="submit" onClick={onSubmit}>Log In</button>
      <h3>Don't have an account? <button onClick={() => {setDisplay(true)}}>Register</button></h3>
    </div>
  )
}
