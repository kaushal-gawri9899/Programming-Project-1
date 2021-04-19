import React,{useEffect,useState,useProps} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



export default function JobsTable() {


    const [Data,setData]=useState({
        Company:'',
        Description:''
    })
    const [colorsData,setColorsData]=useState([])
    useEffect(()=>{
        axios.get('http://0.0.0.0:5000/jobs')
            .then(res=>{
                console.log('Response from main API: ',res)
                console.log('Home Data: ',res.data)

                console.log('Colors Data: ',res.data)
                setColorsData(res.data.Items)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    return(
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
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
                {
                colorsData && colorsData.map((d)=>{
               return(
                    // <div>
                        <TableRow key={d.jobDescription}>
                  <TableCell component="th" scope="row">
                    {d.jobTitle}
                  </TableCell>
                  <TableCell align="right">{d.location}</TableCell>
                  <TableCell align="right">{d.jobDescription}</TableCell>
                  <TableCell align="right">{d.workExperience}</TableCell>
                  <TableCell align="right">{d.jobType}</TableCell>
                  </TableRow>
                     
               )
           })
          } 
            </TableBody>
          </Table>
        </TableContainer>
            
    )
}



