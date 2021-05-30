import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    filters: {
        paddingTop: theme.spacing(6),
    },
    formControl: {
		width: '100%',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
    button: {
        marginTop: theme.spacing(4),
        width: 100,
        height: 60
    }
}));

export default function JobFilters(props) {

    const classes = useStyles();
    

    return (
        <Container>
            <Grid container spacing={4} className={classes.filters}>
                <Grid item xs={1} />
                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="job-type-label">Job Type</InputLabel>
					<Select
						labelId="job-type-label"
						id="job-type"
						value={props.filterJobType}
						onChange={(e) => props.handleJobTypeChange(e.target.value)}
						label="Job Type"
					>
						<MenuItem value=""></MenuItem>
						<MenuItem value="Part Time">Part Time</MenuItem>
						<MenuItem value="Full Time">Full Time</MenuItem>
					</Select>
					</FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="job-type-label">Location</InputLabel>
					<Select
						labelId="location-label"
						id="location"
						value={props.filterJobLocation}
						onChange={(e) => props.handleJobLocationChange(e.target.value)}
						label="Location"
					>
						<MenuItem value=""></MenuItem>
						<MenuItem value="Melbourne">Victoria</MenuItem>
                        <MenuItem value="New South Wales">New South Wales</MenuItem>
                        <MenuItem value="Queensland">Queensland</MenuItem>
                        <MenuItem value="Tasmania">Tasmania</MenuItem>
                        <MenuItem value="Western Australia">Western Australia</MenuItem>
                        <MenuItem value="Southern Australia">Southern Australia</MenuItem>
					</Select>
					</FormControl>
                </Grid>
                <Grid item xs={3}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={props.handleFilter}
                    >
                        Filter
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}