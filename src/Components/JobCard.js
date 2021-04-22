import React from "react";
import { Box, Typography, Grid, Button, makeStyles } from "@material-ui/core";

const skills = ["Javascript", "React.js", "Node.js", "Css", "HTML"];

const useStyles = makeStyles((theme) => ({

    wrapper: {
        border: '1px solid #e8e8e8',
        cursor: "pointer",
        transition: '0.3s',

        "&:hover": {
            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
            borderLeft: "6px solid #4D64E4",
        }
    },

    companyName: {
        fontSize: "13.5px",
        backgroundColor: "#000000",
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
        color: "#fff",
    },

    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        // transition: "0.3s",
        cursor: "pointer",
        fontWeight: 600,
        backgroundColor: "#FF0000",        
        color: "#fff",
    }

}))

export default (props) => {
    const classes = useStyles()
  return (
      <div>
    <Box p={2} className= { classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">Frontend Dev</Typography>
          <Typography className={classes.companyName} variant="subtitle1">Google</Typography>
        </Grid>

        <Grid item container xs>
          {skills.map((skill) => (
            <Grid key={skill} item className= {classes.skillChip}>
              {skill}
            </Grid>
          ))}
        </Grid>

        <Grid item container direction="column" alignItems="flex-end" xs>
          <Typography variant="caption">
            2577 min ago | FullTime | Remote
          </Typography>
          <Box mt={2}>
            <Button variant="outlined">Check</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};