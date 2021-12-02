import React from 'react';
import Login from '../Login/Login';


export default function Dashboard() {
  if (!localStorage.getItem("accessToken")) {
    return <Login />
  }
  return(
    <h2>Dashboard</h2>
  );
}