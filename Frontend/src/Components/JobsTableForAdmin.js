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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

export default function JobsTableForAdmin() {
    const state = useContext(SessionContext)
    const [colorsData, setColorsData] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios
        .get("http://0.0.0.0:5000/jobsForAdmin", {
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

    const handleDelete = (id) => {
        console.log(id)
        const currentJobs = colorsData;
        setColorsData(currentJobs.filter(d => d.Id !== id))
        // this.setState({
        //     circuits: currentCircuits.filter(circuit => circuit.id !== circuitID),
        //   });
        const deleteJob = {
            id: id,
            sessionId: state.session
        }
        axios.delete("http://0.0.0.0:5000/delete_job",{
            data: deleteJob})
        .then((res) => {
            console.log(res)
            // setColorsData(colorsData);
            // useEffect();
         
        }).catch((error) => {
            console.log(error)
        });   
    }
    
    const handleClickForEmployer = (id) => {
        console.log(id);
       
        history.push({
            pathname:  "/employerDashboard/" + id + "?mode=edit",
        
          
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
                <TableCell >Job Applicants</TableCell>
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
                    
                    <TableCell ><EditIcon button onClick={() => handleClick(d.Id)}/> <DeleteIcon button onClick={() => handleDelete(d.Id)}/></TableCell>
                    <TableCell ><AssignmentIndIcon button onClick={() => handleClickForEmployer(d.Id)}/></TableCell>
                    </TableRow>
                );
                })}

            </TableBody>
        </Table>
        </TableContainer>
    );
}
