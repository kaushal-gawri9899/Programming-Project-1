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

import EmployeeNavbar from './Navbar'

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

export default function Resume() {
    
    const history = useHistory();

    const classes = useStyles();
    const state = useContext(SessionContext);

    const inputFile = useRef(null) 

    const [resume, setResume] = useState({});

    const [success, setSuccessMessage] = useState('');
    const [error, setErrorMessage] = useState('');

    const handleUpload = (e) => {
        setResume(e.target.files[0])
    }

    const handleSubmit = (e) => {
        const data = new FormData();
        data.append('file', resume);

        axios.post('http://0.0.0.0:5000/upload', data, {
            headers: {
                Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            setSuccessMessage('Your resume was uploaded successfully. You can now apply to all roles with 1-click.')
            history.push({
                pathname:  "/employer/dashboard"
            });
        })
        .catch((err) => {
            setErrorMessage('There was an error uploading your resume. Please try again')
        })

    }

    return (
        <>
            <EmployeeNavbar active="resume"/>
            <Container className={classes.root} align="center" maxWidth="sm">

                { success && <Alert>{success}</Alert> }
                { error && <Alert severity="error">{error}</Alert> }

                <Box className={classes.box}>
                    <input 
                        type="file"  
                        className={classes.file} 
                        onChange={handleUpload} 
                        ref={inputFile}
                    />
                    <Typography className={classes.title} onClick={ () => inputFile.current.click() }>
                        { resume.name || 'Choose File' }
                    </Typography>
                </Box>

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    <PublishIcon />Upload Resume
                </Button>
            </Container>

        </>
    );
}