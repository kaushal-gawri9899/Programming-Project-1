import React from 'react'
import {MyAppBar} from './Components/AppBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Hire from './Components/Hire';
import CreatePost from './Components/CreatePost';
import Login from './Components/Login'
import UploadFile from './Components/UploadFile'
import Button from './Components/Button'

function App() {
  
    return (
  
      <div className="App">
        
        <BrowserRouter>
        
           <Switch>
           <Route exact path="/upload" component={UploadFile}></Route> 
           <Route path="/hire" component={Hire}></Route>
           <Route path="/button" component={Button}></Route>

           <Route path="/" component={Login}></Route>       
           <Route path="/createPost" component={CreatePost}></Route>    
              

            </Switch>
        </BrowserRouter> 
        
      </div>
    );
}
  
export default App;