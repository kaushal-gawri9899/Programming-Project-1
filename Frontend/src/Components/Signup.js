import React, { useState  } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Navbar from "./Navbar"

const useStyles = makeStyles((theme) => ({
	root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        padding: theme.spacing(2)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
    },
	formControl: {
		width: '100%',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    image: {
        width: '500px'
    }
}));



export default function SignUp() {

  const history = useHistory();
  const classes = useStyles();

  const [userType, setUsertype] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmitSignUp = e => {
    e.preventDefault();

	const user = {
        email: email,
        username: username,
        password: password,
        usertype: userType
    };

    axios.post('http://0.0.0.0:5000/auth/signup', user)
    .then(res => {
        history.push({ 
          pathname: '/',
      	});
    })
    .catch(err => {
        setError("Unfortunately we couldn't sign you up. Please ensure all fields are filled and try again.")
    })

}

  return (
	<>
	<Navbar />
    <Container component="main" maxWidth="lg">
		<div className={classes.root}>
		<Grid container>
			<Grid item md={5} xs={12}>
				<Typography component="h1" variant="h5">Sign Up</Typography>
				
				<form className={classes.form} noValidate>

					{ error && <Alert severity="error">{error}</Alert> }

					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value) }
						label="Name"
						name="username"
						autoComplete="username"
					/>

					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value) }
						label="Email Address"
						name="email"
						autoComplete="email"
					/>

					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value) }
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>

					<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="user-type-label">User Type</InputLabel>
					<Select
						labelId="user-type-label"
						id="user-type"
						value={userType}
						onChange={(e) => setUsertype(e.target.value)}
						label="User Type"
					>
						<MenuItem value=""></MenuItem>
						<MenuItem value={'Employer'}>Employer</MenuItem>
						<MenuItem value={'Employee'}>Employee</MenuItem>
					</Select>
					</FormControl>
					<Link href="/privacy">
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" checked={true} />}
					
					></FormControlLabel> 
					I agree to the Privacy Policy
					</Link>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleSubmitSignUp}
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Link href="/" variant="body2">Already have an account? Sign in</Link>
				</form>
			</Grid>
			<Grid item md={1}></Grid>
            <Grid item md={6} xs={12}>
                <Hidden xsDown>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="53vh"
                >
                    <img src={process.env.PUBLIC_URL + '/sign-up.png'} className={classes.image}/>
                </Box>
                </Hidden>
            </Grid>
		</Grid>
		</div>
    </Container>
	</>
  );
}