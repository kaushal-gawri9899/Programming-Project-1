import React from 'react';
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import './App.css';

import Login from './Components/Login';
import Home from './Components/Home';
import EmployeeHome from './Components/EmployeeHome'

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/Home" component={Home}></Route>
            <Route path="/EmployeeHome" component={EmployeeHome}></Route>
        </Switch>
      </BrowserRouter>

      
    </div>

  );
}

export default App;