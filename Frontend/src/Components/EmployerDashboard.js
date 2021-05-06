import React, { useEffect, useState, useContext, useProps} from "react";
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
import TextTruncate from 'react-text-truncate';
import LinesEllipsis from 'react-lines-ellipsis'
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import {MyAppBar} from './AppBar';
import JobsTable from "./JobsTable";

export default function EmployerDashboard(props) {
    const state = useContext(SessionContext)
    const [applicants, setApplicants] = useState([]);
    const history = useHistory();

    const search = props.location.search; 
    const params = new URLSearchParams(search);

    useEffect(() => {
        axios
        .get("http://0.0.0.0:5000/get_applicant", {
            headers: {
                Authorization: state.session,
                    "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            console.log(res.data);
            setApplicants(res.data);
            
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <MyAppBar/>
            
            <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell >Match Percentage</TableCell>
                <TableCell>Name</TableCell>
                <TableCell >Email</TableCell> 
                <TableCell>Experience </TableCell>
               
            </TableRow>
            </TableHead>
            <TableBody>
            {applicants &&
                applicants.map((d) => {
                return (
                    
                    <TableRow  key={d.name}>
                   
                    <TableCell >{d.matchingPercentage}</TableCell>
                    
                    <TableCell style={{ color: 'blue',}}  component="th" scope="row">{d.name}</TableCell>
                 
                    <TableCell >{d.email}</TableCell>
        
                    <TableCell >{d.experience}</TableCell>

                    
                    
                    
                    
                    {/* <TableCell ><EditIcon button onClick={() => handleClick(d.Id)}/> <DeleteIcon button onClick={() => handleDelete(d.Id)}/></TableCell> */}
                    {/* <TableCell ><DeleteIcon button onClick={() => handleClick(d.Id)}/></TableCell> */}
                    </TableRow>
                );
                })}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    );
}
