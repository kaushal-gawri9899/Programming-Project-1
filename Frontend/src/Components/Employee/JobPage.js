import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import Alert from '@material-ui/lab/Alert';

import { SessionContext } from '../../context/SessionContext';

import EmployeeNavbar from './Navbar';
import JobDetails from '../Common/JobDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
    },
    alerts: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    card: {
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(1)
    },
    cardContent: {
        padding: theme.spacing(4)
    },
    media: {
        maxWidth: 345,
    },
    avatar: {
        marginTop: theme.spacing(2),
        background: theme.palette.primary.main
    },
    chips: {
        display: 'flex',
        marginTop: theme.spacing(0.5),
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));


export default function JobPage() {
    let { id } = useParams();

    const classes = useStyles();
    const state = useContext(SessionContext);

    const [job, setJob] = useState({});
    const [applied, setApplied] = useState(localStorage.getItem(id));
    const [success, setSuccessMessage] = useState('');
    const [error, setErrorMessage] = useState('');

    useEffect(() => {
        axios
        .post("http://0.0.0.0:5000/filtered_jobs_id",{
            job_id: id,
            headers: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': state.session
                }
            }
        })
        .then((res) => {
            setJob(res.data.Items);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    const handleApply = () => {
        axios.post("http://0.0.0.0:5000/applyjob",{
            job_id:id,
            headers: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': state.session
                }
            }
        }).then((res) => {
            localStorage.setItem(id, true);
            setApplied(true);
            setSuccessMessage('You have successfully applied for the role.')
            
        }).catch((err) => {
            setErrorMessage('Sorry, there was an error when applying for the role. Please try again.')
        });

        
    }

    return (
        <>
        <EmployeeNavbar />

            <Container className={classes.root}>
                { success && <Alert>{success}</Alert> }
                { error && <Alert severity="error">{error}</Alert> }
            </Container>

            <JobDetails action={
                <Grid item xs={12} lg={4}>
                { applied && 
                    <Button variant="contained" color="secondary">
                        <CheckIcon />
                        Applied
                    </Button>
                }

                {!applied &&
                    <Button variant="contained" color="primary" onClick={handleApply}>
                        <AddIcon />
                        Apply
                    </Button>
                }
                </Grid>
            } />
        </>
    );
}