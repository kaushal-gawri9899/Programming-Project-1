import React from 'react'
import {MyAppBar} from './Components/AppBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Hire from './Components/Hire';
import CreatePost from './Components/CreatePost';


// class App extends Component{
  
//     render() {
//         return (
//             <div>
//                 <MyAppBar/>
          
//             </div>
//         )
    
//     }
  
// }
function App() {
  
    return (
  
      <div className="App">
        <MyAppBar  />
        <BrowserRouter>
       
           <Switch>
           <Route path="/hire" component={Hire}></Route>      
           <Route path="/createPost" component={CreatePost}></Route>    
        
                  
            </Switch>
        </BrowserRouter> 
      </div>
    );
}
  
export default App;
