import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import JobCard from './JobCard';

export default function JobsList(props) {

    return (
        <Container>
            <Grid container spacing={4}>
                {
                    props.jobs.map((job => (
                        <Grid item xs={12} lg={6}>
                            <JobCard job={job} />
                        </Grid>
                    )))
                }
            </Grid>
        </Container>
    );

}

