import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';


import { SessionContext} from '../../context/SessionContext'

const getTruncatedText = (str, n, useWordBoundary) => {
    if (str.length <= n) {
        return str;
    }
    const subString = str.substr(0, n - 1);
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + String.fromCharCode(8230);
};

const useStyles = makeStyles((theme) => ({
	description: {
        width: 500
    }
}));


export default function AdminJobsTable() {
    const state = useContext(SessionContext)
    const history = useHistory();

    const classes = useStyles();

    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        axios.get("http://0.0.0.0:5000/jobsForAdmin", {
            headers: {
                Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            if (res.data != " "){
                setJobs(res.data);
            }
            
        })
        .catch((err) => {
            history.push({
                pathname:  "/",
                state: {
                    response: "You've have been logged out. Please log-in again"
                }
            });
            console.log(err);
        });
    }, []);

    const handleClick = (id, event) => {
        history.push({
            pathname:  "/employer/job/" + id
        });
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Job Title</TableCell>
                        <TableCell >Location</TableCell>
                        <TableCell >Job Description</TableCell>
                        <TableCell>Experience</TableCell>
                        <TableCell >Job Type</TableCell>
                        <TableCell >Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                { jobs && jobs.map((job) => {
                    return (
                        
                        <TableRow key={job.Id} className={classes.row}>
                            <TableCell>{job.jobTitle}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell className={classes.description}>{ getTruncatedText(job.jobDescription, 200, true) }</TableCell>
                            <TableCell>{job.workExperince}</TableCell>
                            <TableCell>{job.jobType}</TableCell>
                            <TableCell align="left">
                                {/* <EditIcon button />  */}
                                
                                <Button variant="outlined" color="secondary" size="small" onClick={(e) => handleClick(job.Id, e)} >
                                    View
                                </Button> 
                            </TableCell>
                        </TableRow>
                    );
                })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
