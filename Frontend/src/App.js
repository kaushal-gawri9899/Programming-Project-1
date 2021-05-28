import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import { SessionProvider } from "./context/SessionContext";
import SignIn from './Components/SignIn'
import SignUp from './Components/Signup'

import EmployerDashboard from './Components/Employer/Dashboard';
import CreatePost from './Components/Employer/CreatePost';
import EmployerJobApplicants from './Components/Employer/JobApplicants';

import EmployeeDashboard from './Components/Employee/Dashboard';
import Resume from './Components/Employee/Resume';
import EmployeeJobPage from './Components/Employee/JobPage'
import Footer from "./Components/Footer"


function App() {
	return (
	<ThemeProvider theme={theme}>
		<CssBaseline />

		<SessionProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={SignIn}></Route>
					<Route exact path="/sign-up" component={SignUp}></Route>
					
					<Route  path="/employer/dashboard" component={EmployerDashboard}></Route>
					<Route  path="/employer/job/:id" component={EmployerJobApplicants}></Route>
					<Route path="/create-post" component={CreatePost}></Route>
					<Route path="/edit-post/:id" component={CreatePost}></Route>

					<Route  path="/employee/dashboard" component={EmployeeDashboard}></Route>
					<Route path="/employee/job/:id" component={EmployeeJobPage}></Route>
					<Route exact path="/employee/resume" component={Resume}></Route>
				</Switch>
			</BrowserRouter>
		</SessionProvider>
		<Footer />
	</ThemeProvider>
	);
}

export default App;
