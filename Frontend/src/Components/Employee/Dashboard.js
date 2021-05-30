/*
Functional component which handles the dashboard of the employee user type. Shows all the jobs to the user
in cards
*/

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';


import { SessionContext} from '../../context/SessionContext'

import EmployeeNavbar from './Navbar'
import JobsList from './JobsList'
import JobFilters from './JobFilters'

export default function EmployeeDashboard() {
    const state = useContext(SessionContext);
    const history = useHistory();

    const [jobs, setJobs] = useState([]);

    const [filterJobType, setFilterJobType] = useState('');
    const [filterJobLocation, setFilterJobLocation] = useState('');

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_DEPLOYED_URL}` + "/getAlljobs", {
            headers: {
                Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            setJobs(res.data);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    const handleFilter = () => {
        axios.post(`${process.env.REACT_APP_DEPLOYED_URL}` + "/getSearchedjobs", 
        {
            searchedJobType: filterJobType,
            searchJobLocation: filterJobLocation,
            headers: {
                headers: {
                    Authorization: state.session,
                }
            }
        }).then((res) => {
            setJobs(res.data)
        }).catch((err) => {
            history.push({
                pathname:  "/employee/dashboard",
                state: {
                    response: "No jobs found with the following filter"
                }
            });
            console.log(err);
        });
    }

    return (
        <>
            <EmployeeNavbar active="dashboard" />

            { jobs.length == 0 && 
                <Typography align="center">
                    <br/><br/>
                    {/* Sorry, there aren't any jobs open at the moment. Check back in again later */}
                </Typography>
            }

            {jobs.length > 0 &&
                <>
                <JobFilters 
                    filterJobType={filterJobType}
                    filterJobLocation={filterJobLocation}
                    handleJobTypeChange={setFilterJobType}
                    handleJobLocationChange={setFilterJobLocation}
                    handleFilter={handleFilter}
                />

                <JobsList jobs={jobs} />
                </>
            }
        </>
    );
}