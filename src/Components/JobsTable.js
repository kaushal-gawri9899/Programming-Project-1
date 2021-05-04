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
import { useHistory } from "react-router-dom";

export default function JobsTable() {
    const state = useContext(SessionContext)
    const [colorsData, setColorsData] = useState([]);
    const history = useHistory();
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
            
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleCellClick = (e) => {
        console.log("Hello");
    }
    const maxChar = 200
   
    const handleClick = (id) => {
        console.log(id);
       
        history.push({
            pathname:  "/CreatePost/" + id + "?mode=edit",
        
          
            state: {
            response: "messageFromServer "
            } 
        });
    }

    return (
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell >Location</TableCell>
                <TableCell >Job Description</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell >Job Type</TableCell>
                <TableCell >Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {colorsData &&
                colorsData.map((d) => {
                return (
                    
                    <TableRow  key={d.Id}>
                   
              
                    <TableCell style={{ color: 'blue',}} onClick={handleCellClick} component="th" scope="row">{d.jobTitle}</TableCell>
                 
                    <TableCell >{d.location}</TableCell>
        
                    <TableCell >{d.jobDescription}</TableCell>

                    
                    <TableCell >{d.workExperince}</TableCell>
                    <TableCell >{d.jobType}</TableCell>
                    
                    <TableCell ><EditIcon button onClick={() => handleClick(d.Id)}/></TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
