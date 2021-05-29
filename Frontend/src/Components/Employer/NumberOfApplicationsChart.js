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


    useEffect(() => {
        axios.get("http://0.0.0.0:5000/getApplicantsChartData", {
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

    return (
        <div>
            <Typography variant="h2">Number of Applications</Typography>
            <LineChart
                data={data}
                height={200}
                width={900}
                margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="applications"
                    stroke={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="matches" stroke={theme.palette.success.main} />
            </LineChart>
        </div>
    );
}