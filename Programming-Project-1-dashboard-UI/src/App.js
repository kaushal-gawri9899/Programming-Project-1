import React from 'react'
import {MyAppBar} from './Components/AppBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Hire from './Components/Hire';
import CreatePost from './Components/CreatePost';
import JobsTable from './Components/JobsTable'
import Login from './Components/Login'


function App() {
  
    return (
  
      <div className="App">
        <MyAppBar  />
        <BrowserRouter>
       
           <Switch>
           <Route path="/hire" component={Hire}></Route>      
           <Route path="/createPost" component={CreatePost}></Route> 
           <Route path="/jobs" component={JobsTable}></Route>  
           <Route path="/" component={Login}></Route>  

           {/* <Route path="/jobs" component={Home}></Route>    */}
           {/* <Route path="/jobs" component={Table}></Route>   */}
   
        
                  
            </Switch>
        </BrowserRouter> 
      </div>
    );
}
  
export default App;
