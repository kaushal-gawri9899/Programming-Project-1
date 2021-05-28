import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import Navbar from "./Navbar"

import { SessionContext } from '../context/SessionContext'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        padding: theme.spacing(2)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    image: {
        width: '500px'
    }
}));



export default function SignIn() {

    const state = useContext(SessionContext)
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const classes = useStyles();

    const handleSubmitLogin = e => {
        e.preventDefault();

        const user = {
            email: email,
            password: password,

        };

        axios.post('http://0.0.0.0:5000/auth/login', user)
        .then(res => {

            let token = res.data.idToken;
            state.setSession(token);

            if(res.data.userType == 'Employee'){
                history.push({
                    pathname:  "/employee/dashboard"
                });
            }
            else if(res.data.userType == 'Employer'){
                history.push({
                    pathname:  "/employer/dashboard"
                });
            } 
            else if(res.data.userType == 'Admin'){
                history.push({
                    pathname:  "/admin/dashboard"
                });
            }   
        })
        .catch(err => {
            setError('Incorrect email or password. Please try again')
        })
    }

    return (
        <>
        <Navbar />
        <Container component="main" maxWidth="lg">
            <div className={classes.root}>
            <Grid container>
                <Grid item md={5} xs={12}>
                <Typography variant="h5">Sign In</Typography>
                    <form className={classes.form} noValidate>
                        
                        { error && <Alert severity="error">{error}</Alert> }

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
                        <Link href="sign-up" variant="body2">Don't have an account? Sign Up</Link>
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
                        <img src={process.env.PUBLIC_URL + '/sign-in.png'} className={classes.image}/>
                    </Box>
                    </Hidden>
                </Grid>
            </Grid>
        </div>
        </Container>
        </>
    );
}