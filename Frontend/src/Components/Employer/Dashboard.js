/*

Functional component for an employer dashboard. Calls components containg line charts showing data
and jobs table with the jobs of the employer
Displaying error message if not successful
*/
import React, {useState, useEffect, useContext} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import NumberOfApplicationsChart from './NumberOfApplicationsChart';
import JobsTable from './JobsTable';
import EmployerNavbar from './Navbar'
import { SessionContext} from '../../context/SessionContext'



const useStyles = makeStyles((theme) => ({
    root: {
		display: 'flex'
    },
	content: {
		flexGrow: 1,
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	fixedHeight: {
		height: 240,
		padding: theme.spacing(2),
	},
	depositContext: {
		marginTop: 20,
		marginBottom: 60,
	},
	paper: {
		padding: theme.spacing(2)
	}
}));
  
export default function EmployerDashboard() {
	
	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();
    const state = useContext(SessionContext);
    const [highestMatchPercentage, setMatchPercentage] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DEPLOYED_URL}` + "/getApplicantsChartData", {
            headers: {
                Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => {
            

            // setTotalJobs(res.data.totalJobs)
            setMatchPercentage( res.data.heighestMatch)       
            console.log(res.data)

            
        })
        .catch((err) => {
            history.push({
                pathname:  "/",
                state: {
                    response: "You've have been logged out. Please log-in again"
                }
            });
            console.log(err);
        });
        // console.log(totalJobs)
    
        // console.log(jobs)
    }, []);


	return (
        <>
        <EmployerNavbar />
		<div className={classes.root}>
			<main className={classes.content}>
				<div />
				<Container maxWidth="lg" className={classes.container}>
					
					{ location.state && location.state.detail && <Alert>{location.state.detail}</Alert> }

					<Grid container spacing={3}>
						<Grid item xs={12} align="right">
							<Button 
								onClick={ () => history.push({ pathname:  "/create-post"}) }
								variant="contained"
                            	color="primary"
							>
								<AddIcon />
								Create Posting
							</Button>
						</Grid>
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={classes.fixedHeight}>
								<NumberOfApplicationsChart />
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={classes.fixedHeight}>
								<Typography variant="h2">Best Match Percentage</Typography>
								<div className={classes.depositContext}>
									<Typography component="p" variant="h4">
                                        {highestMatchPercentage} %
									</Typography>
									<Typography color="textSecondary">
										for Software Enginner
									</Typography>
								</div>
								
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Typography variant="h2">Your Postings</Typography>
								<JobsTable />
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		</div>
        </>
	);
}
  