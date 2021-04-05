import React from 'react'
import {MyAppBar} from './Components/AppBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Hire from './Components/Hire';
import CreatePost from './Components/CreatePost';
import Dash from './Components/dash';
import 'bootstrap/dist/css/bootstrap.min.css';
// import JobCard from './Components/jobCard';
import Resume from './Components/resume';
import JobCard from './Components/jobCard';

function App() {
  
    return (
  
      <div className="App">
        <MyAppBar  />
        

        <BrowserRouter>
           <Switch>
           <Route path="/Jobs" component={JobCard}></Route>
           <Route path="/Dash" component={Dash}></Route>
           <Route path="/hire" component={Hire}></Route>      
           <Route path="/createPost" component={CreatePost}></Route>   
           <Route path="/resume" component={Resume}></Route>
           </Switch>
        </BrowserRouter> 
      </div>
    );
}
  
export default App;
