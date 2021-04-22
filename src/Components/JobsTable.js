import React, { useEffect, useState, useContext, useProps } from "react";
import axios from "axios";
import Link from '@material-ui/core/Link';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { SessionProvider, SessionContext} from '../context/SessionContext'

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { SessionProvider, SessionContext} from '../context/SessionContext'

export default function JobsTable() {
    const state = useContext(SessionContext)
    const [colorsData, setColorsData] = useState([]);
    useEffect(() => {
        axios
        .get("http://0.0.0.0:5000/jobs", {
            headers: {
                Authorization: state.session,
                    "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            console.log(res.data);
            setColorsData(res.data);
            
            console.log(res.data.Items)
            setColorsData(res.data.Items);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleCellClick = (e) => {
        console.log("Hello");
    }

    return (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Job Description</TableCell>
                <TableCell align="right">Experience</TableCell>
                <TableCell align="right">Job Type</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {colorsData &&
                colorsData.map((d) => {
                return (
                    
                    <TableRow  key={d.jobTitle}>
                   
              
                    <TableCell style={{backgroundColor:'Navy', color: 'white',}} onClick={handleCellClick} component="th" scope="row">{d.jobTitle}</TableCell>

                    <TableCell align="right">{d.location}</TableCell>
                    
                    <TableCell align="right">{d.jobDescription}</TableCell>

                    <TableCell align="right">{d.workExperince}</TableCell>
                   
                    <TableRow key={d.jobDescription}>
                    <TableCell component="th" scope="row">
                        {d.jobTitle}
                    </TableCell>
                    <TableCell align="right">{d.location}</TableCell>
                    <TableCell align="right">{d.jobDescription}</TableCell>
                    <TableCell align="right">{d.workExperience}</TableCell>
                    <TableCell align="right">{d.jobType}</TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
