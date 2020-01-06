import React from 'react';

import NavBar from './components/NavBar'
import Users from './components/Users'
import Exercises from './components/Exercises'

import { Route } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Route exact path="/" render={props => <Exercises />} />
        <Route path="/users" render={props => <Users />} />
    </div>
  );
}

export default App;
