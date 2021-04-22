import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Hire from "./Components/Hire";
import CreatePost from "./Components/CreatePost";
import Button from "./Components/Resume";
import { SessionProvider } from "./context/SessionContext";
import SignIn from './Components/SignIn'
import SignUp from './Components/Signup'
import EmployeeDashboard from './Components/EmployeeDashboard'
import Resume from './Components/Resume'

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn}></Route>
            <Route exact path="/SignUp" component={SignUp}></Route>

            <Route path="/hire" component={Hire}></Route>
            <Route path="/button" component={Button}></Route>

            <Route path="/createPost" component={CreatePost}></Route>
            <Route exact path="/employee" component={EmployeeDashboard}></Route>
            <Route exact path="/resume" component={Resume}></Route>

          </Switch>
        </BrowserRouter>
      </SessionProvider>
    </div>
  );
}

export default App;
