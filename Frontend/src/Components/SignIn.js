import React, { Component,useState, useEffect ,useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import axios from 'axios';
// import './CSS/login.css'
import {SessionContext, SessionProvider} from '../context/SessionContext'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));




export default function SignIn() {
  const state = useContext(SessionContext)
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();

  const handleSubmitLogin = e => {
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
        
        state.setSession(token);
    
  
        if(res.data.userType == 'Employee'){
            history.push({
                pathname:  "/employee",
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value) }
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmitLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
           
            <Grid item>
              <Link href="SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}