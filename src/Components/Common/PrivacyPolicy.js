import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

import Navbar from '../Navbar'

import { SessionContext} from '../../context/SessionContext'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
    },
    button: {
        marginTop: theme.spacing(4),
    },
    box: {
        width: 500,
        height: 200,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        background: theme.palette.primary.light,
        border: `1px dashed ${theme.palette.text.secondary}`
    },
    file: {
        width: 500,
        height: 200,
        opacity: 0
    },
    title: {
        marginTop: -1 * theme.spacing(15),
    }
}));

export default function Privacy() {
    
    const history = useHistory();

    const classes = useStyles();
    



    const handleSubmit = (e) => {
        history.push({
            pathname:  "/sign-up"
        });
    }

    return (
        <>
            <Navbar active="resume"/>
            <Container className={classes.root} align="center" maxWidth="sm">



                <Box className={classes.box}>
                    
                    <Typography className={classes.title} >
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                      We only collect your information which is needed to be passed on to our Hiring Managers so they can know what you are all about and how you  fit in
                      their given requirements. No subjective information is disclosed and your information is kept confidential, unless you agree that your information can be passed on.
                      Your information is only passed to hiring managers, when you click on the apply button. We always put your needs first and always take care of your information
                      and it is never shared with 3rd party. Happy job hunting!
                    </Typography>
                </Box>

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    <PublishIcon />Back to Sign Up
                </Button>
            </Container>

        </>
    );
}