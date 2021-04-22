import React, { Component,useContext,useState } from 'react'
import axios from 'axios';
// import './CSS/login.css'
import {SessionContext, SessionProvider} from '../context/SessionContext'
import { useHistory } from "react-router";

export default function Login({ props}) {

    // const { session, setSession } = useContext(SessionContext);
    const state = useContext(SessionContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const handleSubmit = e => {
                e.preventDefault();
            
                const user = {
                    email: email,
                    password: password,
                
                };
        
                axios.post('http://0.0.0.0:5000/auth/login',user)
                .then(res=>{
                    console.log('Response from main API: ',res)
                    console.log('Home Data: ',res.data.userType)
                    console.log('idToken', res.data.idToken)
                    let token = res.data.idToken;
                    // this.context = res.data.idToken
                    // console.log("f",information)
                    state.setSession(token);
                
                    // console.log('Colors Data: ',information)
        
                    if(res.data.userType == 'Employee'){
                        history.push({
                            pathname:  "/",
                            state: {
                            response: "messageFromServer "
                            } 
                        });
                    }
                    else if(res.data.userType == 'Employer'){
                        history.push({
                            pathname:  "/Hire",
                            state: {
                            response: "messageFromServer "
                            } 
                        });
                    }
        
                    console.log('Colors Data: ',res.data)
                    
                    // console.log(this.context)
        
                })
                .catch(err=>{
                    console.log(err);
                })
        
            }
            console.log( state.session)
    return (
    
        <form onSubmit={handleSubmit} method="post" >
            
        <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)}/>
        <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)}/>
        <button type="submit">Submit</button>

        </form>
    );

}


