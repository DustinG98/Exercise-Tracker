import React, { useState } from 'react';

import NavBar from './components/NavBar'
import Exercises from './components/Exercises'

import { Route, Redirect } from 'react-router-dom'

import './App.css';
import SignUp from './components/user-onboarding/SignUp';
import Login from './components/user-onboarding/Login'

function App() {
  const [token, setToken] = useState("")
  const [userID, setUserID] = useState("")

  function PrivateRoute({children, ...rest}) {
    return (
      <Route {...rest} render={({ location }) => 
        (token !== "") ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }}/>)
      } />
    )
  }

  return (
    <div className="App">
        <NavBar token={token} setToken={setToken}/>
        <PrivateRoute path="/exercises"><Exercises userID={userID} token={token}/></PrivateRoute>
        <Route path="/signup" render={props => <SignUp/>}/>
        <Route path="/login" render={props => <Login setToken={setToken} setUserID={setUserID}/>}/>
    </div>
  );
}

export default App;
