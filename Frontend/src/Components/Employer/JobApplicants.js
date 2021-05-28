import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import EmployerNavbar from './Navbar'
import JobDetails from '../Common/JobDetails';

import { SessionContext} from '../../context/SessionContext'
import { transparent } from 'material-ui/styles/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
    },
    button: {
        marginRight: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
        background: transparent
    },
    icon: {
        fontSize: '1rem',
        marginRight: theme.spacing(1)
    }
}));

export default function JobApplicants() {
    let { id } = useParams();
    const history = useHistory();

    const classes = useStyles();
    const state = useContext(SessionContext);

    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        
        axios
        .post("http://0.0.0.0:5000/get_applicant",{
            job_id: id,
            headers: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': state.session
                }
            }
        })
        .then((res) => {
            if (res.data != "None"){
                setApplicants(res.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    const handleEdit = () => {
        history.push({
            pathname:  "/edit-post/" + id
        });
    }

    const handleDelete = () => {
        axios.delete("http://0.0.0.0:5000/delete_job", {
            data: {
                id: id,
                sessionId: state.session
            }
        })
        .then((res) => {
            history.push({
                pathname:  "/employer/dashboard",
                state: { detail: `Your job has been successfully deleted` }
            });
         
        }).catch((error) => {
            console.log(error)
        });   
    }

    const handleClick = (applicantEmail) => {
        axios.post("http://0.0.0.0:5000/downloadResume",{
            user_email: applicantEmail,
            headers: {
                Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then((res) => {
            console.log(res);				
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <EmployerNavbar />
            <JobDetails action={
                <Grid item xs={12} lg={4}>
                    <Button variant="contained" color="secondary" onClick={handleEdit} className={classes.button}>
                        <EditIcon className={classes.icon} />
                        Edit
                    </Button>
                    <Button variant="contained" color="neutral" onClick={handleDelete}>
                        <DeleteIcon className={classes.icon} />
                        Delete
                    </Button>
                </Grid>
            } />

            <Container className={classes.root}>
                <Typography variant="h2">
                    Applicants
                </Typography>

                

                
                <TableContainer className={classes.table}>
                    <Typography variant="body2">
                        {/* No applications have been received for this role yet. */}
                    </Typography>

                    { applicants.length > 0 && 
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell >Email</TableCell> 
                                <TableCell>Experience </TableCell>
                                <TableCell >Match Percentage</TableCell>
                                <TableCell>Download Applicant Resume </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applicants &&
                                applicants.map((applicant) => {
                                    return (
                                        
                                        <TableRow key={applicant.id}>

                                            <TableCell>{applicant.name}</TableCell>
                                            <TableCell>{applicant.email}</TableCell>
                                            <TableCell>{applicant.experience}</TableCell>
                                            <TableCell>{applicant.matchingPercentage}</TableCell>
                                            <TableCell>
                                                <GetAppIcon button onClick={() => handleClick(applicant.email)} />
                                            </TableCell>
                                        
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    }
                </TableContainer>
                
            </Container>
        </>
    );
}