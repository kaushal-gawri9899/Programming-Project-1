import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Hire from "./Components/Hire";
import CreatePost from "./Components/CreatePost";
import Login from "./Components/Login";
import UploadFile from "./Components/UploadFile";
import Button from "./Components/Button";
import { SessionProvider } from "./context/SessionContext";

function App() {
  return (
    <div className="App">
      <SessionProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/upload" component={UploadFile}></Route>
            <Route path="/hire" component={Hire}></Route>
            <Route path="/button" component={Button}></Route>

            <Route path="/createPost" component={CreatePost}></Route>
          </Switch>
        </BrowserRouter>
      </SessionProvider>
    </div>
  );
}

export default App;
