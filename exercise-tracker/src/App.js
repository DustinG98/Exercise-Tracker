import React, { useState } from 'react';

import NavBar from './components/NavBar'
import Users from './components/Users'
import Exercises from './components/Exercises'

import { Route } from 'react-router-dom'

import './App.css';
import SignUp from './components/user-onboarding/SignUp';
import Login from './components/user-onboarding/Login'

function App() {
  const [token, setToken] = useState("")
  return (
    <div className="App">
        <NavBar token={token}/>
        <Route exact path="/" render={props => <Exercises />} />
        <Route path="/users" render={props => <Users />} />
        <Route path="/signup" render={props => <SignUp/>}/>
        <Route path="/login" render={props => <Login/>}/>
    </div>
  );
}

export default App;
