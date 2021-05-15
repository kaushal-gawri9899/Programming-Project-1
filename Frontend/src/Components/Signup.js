import React, { Component,useState, useEffect  } from 'react';
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
import axios from 'axios';
import { useHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));



export default function SignUp() {
  const history = useHistory();
  const classes = useStyles();
  const [userType, setUsertype] = useState('Employer');
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmitSignUp = e => {
    e.preventDefault();
    let information
    const user = {
        email: email,
        username: username,
        password: password,
        usertype: userType
    };
    console.log(user);
    axios.post('http://0.0.0.0:5000/auth/signup',user)
    .then(res=>{
        console.log('Response from main API: ',res)
        console.log('Home Data: ',res.data.userType)
        console.log('Colors Data: ',res.data.data);
        history.push({ 
          pathname: '/',
      });


    })
    .catch(err=>{
        console.log(err);
    })

}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value) }
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value) }
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
           
          </Grid>
        <Grid item xs={12}>
        <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">UserType</InputLabel>
        <Select
          native
          value={userType}
          onChange={(e) => setUsertype(e.target.value) }
          inputProps={{
            name: 'age',
            id: 'filled-age-native-simple',
          }}
        >
          <option value={'Employer'}>Employer</option>
          <option value={'Employee'}>Employee</option>
        </Select>
      </FormControl>
      
      </Grid>
      <Link>
      <FormControlLabel
            control={<Checkbox disabled={true} name="gilad" checked={"this.state.checkboxstate.get(g.gid)"} required />}
            label="I agree to privacy policies"
      />
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}