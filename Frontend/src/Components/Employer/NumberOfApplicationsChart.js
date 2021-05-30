/*

Functional component which handles the data analysis. Allows employers to see their job data,
matched candidates and the heighest matchiing percentage. This gives bettet idea of how the jobs are 
performing.

*/
import React, { useState, useContext, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip  } from 'recharts';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import axios from 'axios';
import { SessionContext} from '../../context/SessionContext'


const data = [
    { name: "Job I", applications: 4000, matches: 2400 },
    { name: "Job II", applications: 3000, matches: 1398 },
    { name: "Job III", applications: 2000, matches: 9800 },
    { name: "Job IV", applications: 2780, matches: 3908 },
    { name: "Job V", applications: 1890, matches: 4800 },
];




export default function NumberOfApplicationsChart() {
    const theme = useTheme();
    const history = useHistory();
    const state = useContext(SessionContext);
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);

   




    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DEPLOYED_URL}` + "/getApplicantsChartData", {
            headers: {
                Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            

            setTotalJobs(res.data.totalJobs)
            setJobs( res.data.TotalNumberOfCandidates)       
            console.log(res.data)

            
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
        console.log(totalJobs)
    
        console.log(jobs)
    }, []);

 

    return (
        <div>
            <Typography variant="h2">Number of Applications</Typography>
            <LineChart
                data={jobs}
                height={200}
                width={900}
                margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
            >
                <XAxis dataKey="jobId" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="matchedCandidates"
                    stroke={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="totalCandidates" stroke={theme.palette.success.main} />
            </LineChart>
        </div>
    );
}