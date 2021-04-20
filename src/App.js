import React from 'react'
import {MyAppBar} from './Components/AppBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Hire from './Components/Hire';
import CreatePost from './Components/CreatePost';
import Dashboard from './Components/Dashboard'


function App() {
  
    return (
  
      <div className="App">
        <MyAppBar  />
        <BrowserRouter>
       
           <Switch>
           <Route path="/hire" component={Hire}></Route>      
           <Route path="/createPost" component={CreatePost}></Route>  
           <Route path="/" component={Dashboard}></Route>    

        
                  
            </Switch>
        </BrowserRouter> 
      </div>
    );
}
  
export default App;
