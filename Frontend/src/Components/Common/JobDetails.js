import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';

import { SessionContext } from '../../context/SessionContext';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
    },
    card: {
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(1)
    },
    cardContent: {
        padding: theme.spacing(4)
    },
    media: {
        maxWidth: 345,
    },
    avatar: {
        marginTop: theme.spacing(2),
        background: theme.palette.primary.main
    },
    chips: {
        display: 'flex',
        marginTop: theme.spacing(0.5),
        flexWrap: 'wrap'
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));


export default function JobPage(props) {
    let { id } = useParams();

    const classes = useStyles();
    const state = useContext(SessionContext);

    const [job, setJob] = useState({});

    useEffect(() => {
        axios
        .post(`${process.env.REACT_APP_DEPLOYED_URL}` + "/filtered_jobs_id",{
            job_id: id,
            headers: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': state.session
                }
            }
        })
        .then((res) => {
            setJob(res.data.Items);
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Avatar className={classes.avatar}>{job.companyName ? job.companyName[0] : ''}</Avatar> 
                <Grid item xs={12} lg={7}>
                    <Typography variant="h1">
                        {job.jobTitle}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {job.companyName}
                    </Typography>
                </Grid>
                {props.action}
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={12} lg={7}>

                    <Card elevation={4} className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="body2" component="p" color="secondary">
                                { job.jobDescription }
                            </Typography>
                        </CardContent> 
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Card elevation={4} className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="h6" component="p" color="secondary">
                                Location
                            </Typography>
                            <Typography variant="body2" component="p" color="secondary">
                                {job.location}
                            </Typography><br/>

                            <Typography variant="h6" component="p" color="secondary">
                                Job Type
                            </Typography>
                            <Typography variant="body2" component="p" color="secondary">
                                {job.jobType}
                            </Typography><br/>

                            <Typography variant="h6" component="p" color="secondary">
                                Seniority
                            </Typography>
                            <Typography variant="body2" component="p" color="secondary">
                                {job.workExperience}
                            </Typography><br/>

                            <Typography variant="h6" component="p" color="secondary">
                                Start Date
                            </Typography>
                            <Typography variant="body2" component="p" color="secondary">
                                01/01/2020
                            </Typography><br/>

                            <Typography variant="h6" component="p" color="secondary">
                                Skills
                            </Typography>
                            <Typography variant="body2" component="p" color="secondary">
                                <div className={classes.chips}>
                                    <Chip label={job.degree} icon={<FaceIcon />} className={classes.chip} color="primary" />
                                    <Chip label="React" className={classes.chip} color="secondary"/>
                                    <Chip label="Java"  className={classes.chip}  color="secondary"/>
                                </div>
                            </Typography><br/>
                        </CardContent> 
                    </Card>
                </Grid>

            </Grid>
        </Container>
    );
}