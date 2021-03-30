import React, { Component } from 'react'
import './CSS/style.css'
import Footer from "./Footer";
import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            usertype:"Employer",
        }
        
        this.handleSubmitLogin=this.handleSubmitLogin.bind(this)
        this.handleSubmitSignUp=this.handleSubmitSignUp.bind(this)


    }
    userNamehandler = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    usertypehandler = (event) => {
        this.setState({
            usertype: event.target.value
        })
    }

    componentDidMount () {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        });
    }

    handleSubmitLogin = e => {
        e.preventDefault();
        let information
        const user = {
            email: this.state.email,
            password: this.state.password,
           
        };

        axios.post('http://0.0.0.0:5000/auth/login',user)
        .then(res=>{
            console.log('Response from main API: ',res)
            console.log('Home Data: ',res.data.userType)
            
            information=res.data;
            
            // this.state.userType=information.userType;
  
            console.log('Colors Data: ',information)

            if(information == 'Employee'){
                this.props.history.push({ 
                    pathname: '/EmployeeHome',
                });
            }
            else if(information == 'Employer'){
                this.props.history.push({ 
                    pathname: '/Home',
                });
            }

            console.log('Colors Data: ',res.data)

        })
        .catch(err=>{
            console.log(err);
        })

    }

    handleSubmitSignUp = e => {
        e.preventDefault();
        let information
        const user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            usertype: this.state.usertype
        };
        axios.post('http://0.0.0.0:5000/auth/signup',user)
        .then(res=>{
            console.log('Response from main API: ',res)
            console.log('Home Data: ',res.data.userType)
            const container = document.getElementById('container');
            container.classList.remove("right-panel-active");
            console.log('Colors Data: ',res.data.data)

        })
        .catch(err=>{
            console.log(err);
        })

    }


    render() {
        return (
            <div className="container" id="container">
	        <div className="form-container sign-up-container">
	
			
            <form id="login-form" onSubmit={this.handleSubmitSignUp} action="/auth/signup/" method="post" >
                <h1>Create Account</h1>
                <div class="inset">
                    <p>
                        <label for="email">Email Address</label>
                        <input type="email" id="email" value={this.state.email} onChange={this.emailhandler} name="Email" />
                    </p>
                    <p> <label for="username"> Username</label> <input type="text" id="email" value={this.state.username} onChange={this.userNamehandler} name="Username" /></p>
                    
                    <p>
                        <label for="password">Password</label>
                        <input type="password" id="password" value={this.state.password} onChange={this.passwordhandler}  name="Password" />
                    </p>
                    <p>
                        <label for="cars">Choose a UserType:</label>
        
                            <select name="usertype" id="cars" value={this.state.usertype} onChange={this.usertypehandler}>
                            <option value="Employer" selected='selected'>Employer</option>
                            <option value="Employee">Employee</option>
                            </select>
    
                    </p>
                    <button id="leftbutton" type="submit" class="ripple2">Sign Up</button>
    
                </div>
            </form>

	</div>
	<div className="form-container sign-in-container">
		<form id="login-forms" action="/auth/login" method="post" onSubmit={this.handleSubmitLogin}>
            <h1>Login</h1>

            <div class="inset">
                <p>
                    <label for="email">EMAIL ADDRESS</label>
                    <input type="email" id="email" value={this.state.email} onChange={this.emailhandler} name="Email" />
                </p>
                <p>
                    <label for="password">PASSWORD</label>
                    <input type="password" id="password" value={this.state.password} onChange={this.passwordhandler}  name="Password" />
                </p>
                
            </div>

            <p class="p-container">
                <button id="leftbutton" type="submit" class="ripple2">Login</button>

            </p>
        </form>
	</div>
	<div className="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello there!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
    <div>
    </div>
    <Footer />
    </div>
            
        )
    }
}
export default Login