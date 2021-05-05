import React from "react";
import { Box, Button, Select, MenuItem, makeStyles } from "@material-ui/core";

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
const classes = useStyles();
return (
<Box p={2} mt={-5} mb={2} className={classes.wrapper}>
<Select variant="filled" defaultValue="Fulltime">
<MenuItem value="Fulltime">Full Time</MenuItem>
<MenuItem value="Parttime">Part Time</MenuItem>
<MenuItem value="contract">Contract</MenuItem>
</Select>

<Select variant="filled" defaultValue="Location">
<MenuItem value="Location">Location</MenuItem>
<MenuItem value="Melbourne">Victoria</MenuItem>
<MenuItem value="New South Wales">New South Wales</MenuItem>
<MenuItem value="Queensland">Queensland</MenuItem>
<MenuItem value="Tasmania">Tasmania</MenuItem>
<MenuItem value="Western Australia">Western Australia</MenuItem>
<MenuItem value="Southern Australia">Southern Australia</MenuItem>
</Select>

<Button variant="contained" color="primary" disableElevation>
Search
</Button>
</Box>
);
};