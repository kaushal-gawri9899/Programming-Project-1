import React,{useEffect, useState, useContext, useProps } from "react";
import { Box, Typography, Grid, Button, makeStyles } from "@material-ui/core";
import { SessionProvider, SessionContext} from '../context/SessionContext'
import axios from "axios";



export default function JobCard() {

    const state = useContext(SessionContext)
    const [colorsData, setColorsData] = useState([]);
    useEffect(() => {
        axios
        .get("http://0.0.0.0:5000/getjobs", {
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


  const classes = useStyles()
  return (
    <div>
    {colorsData && colorsData.map((d) => {
    return (
    <Box p={2} className= { classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{d.jobTitle}</Typography>
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
            2577 min ago | {d.jobType} | {d.location}
          </Typography>
          <Box mt={2}>
            <Button variant="outlined">Check</Button>
          </Box>
        </Grid>
      </Grid>
        </Box>
        );
    })}
    </div>
  );
};