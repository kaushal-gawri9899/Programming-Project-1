import React, { Component,useState, useEffect  } from 'react'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { forwardRef } from 'react';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


  
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type()': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    table: {
        minWidth: 700,
    },
  });
  
export default function Hire() {
    const classes = useStyles();
    // const bull = <span className={classes.bullet}>•</span>;
    
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    var deleteIcon =
    (<IconButton onClick={console.log("delete")}>
      <DeleteIcon color="secondary" />
    </IconButton>
    );
  
    const editIcon = (
      <IconButton onClick={console.log("edited")}>
        <EditIcon color="primary" />
      </IconButton>
    );
    
    return (
        
        
        <Box m={15} >
            <Card className={classes.root}>

                <div style={{
                display: 'flex',
                alignItems: 'center'
                }}>
                    <Box ml={2} mt={2}>
                        <Typography variant="h4" component="h2">
                            Job Posting
                        </Typography>
                    </Box>

                    <Box ml={90}  mt={2}>
                        <CardActions>
                        <  Button size="large" style={{border: '1px solid grey',fontWeight: "bold"}}>VIEW</Button>
                        </CardActions>
                    </Box>
                    <Box ml={0}  mt={2}>
                        <CardActions>
                        <Button size="large"  style={{border: '1px solid grey',fontWeight: "bold"}} href="CreatePost">CREATE POSTING</Button>
                        </CardActions>
                    </Box>
                </div>
                <Box mt={2}>
               
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>

                            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                            <StyledTableCell align="right">Calories</StyledTableCell>
                            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                            <StyledTableCell align="right">Active&nbsp;</StyledTableCell>
                            <StyledTableCell align="right"> Action</StyledTableCell>
                          
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="right"> 
                                <Switch
                                    checked={state.checkedA}
                                    onChange={handleChange}
                                    name="checkedA"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="right"> 
                            {deleteIcon}
                            {editIcon}
                            </StyledTableCell>
                           
                           
                          
                            </StyledTableRow>  
                        ))}
                       
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
       
            </Card>
      </Box>
    );
  }
  