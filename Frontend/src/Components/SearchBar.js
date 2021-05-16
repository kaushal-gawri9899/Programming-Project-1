import React, {useContext} from "react";
import { Box, Button, Select, MenuItem, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {SessionContext, SessionProvider} from '../context/SessionContext'

    const useStyles = makeStyles({
    wrapper: {
    background: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "& > *": {
    flex: 1,
    height: "45px",
    margin: "8px",
    },
    },
    });

    

    

export default (props) => {
    const history = useHistory();
    const state = useContext(SessionContext)
    const classes = useStyles();
    const [jobType, setType] = React.useState();
    const [location, setLocation] = React.useState();

   

    const handleSubmit = e => {
        const data = {
            Type: jobType,
            Joblocation: location
        }
        history.push({
          pathname:  "/searchedJobs",
          state: data
      });
      }

    return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
    <Select variant="filled" onChange={(e) => setType(e.target.value)} value={jobType} defaultValue="Full Time" >
        <MenuItem value="Full Time">Full Time</MenuItem>
        <MenuItem value="Part Time">Part Time</MenuItem>
    </Select>

    <Select variant="filled" onChange={(e) => setLocation(e.target.value)} value={location} defaultValue="Location">
        <MenuItem value="Location">Location</MenuItem>
        <MenuItem value="Melbourne">Victoria</MenuItem>
        <MenuItem value="New South Wales">New South Wales</MenuItem>
        <MenuItem value="Queensland">Queensland</MenuItem>
        <MenuItem value="Tasmania">Tasmania</MenuItem>
        <MenuItem value="Western Australia">Western Australia</MenuItem>
        <MenuItem value="Southern Australia">Southern Australia</MenuItem>
    </Select>

    <Button onClick={handleSubmit} variant="contained" color="primary" disableElevation>
        Search
    </Button>
    </Box>
    );
};