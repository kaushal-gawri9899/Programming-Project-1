import React from 'react';
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

import JobsTable from './AdminJobsTable';
import AdminNavbar from './Navbar'



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
  
export default function AdminDashboard() {

	const history = useHistory();
	const location = useLocation();
	const classes = useStyles();

	return (
        <>
        <AdminNavbar />
		<div className={classes.root}>
			<main className={classes.content}>
				<div />
				<Container maxWidth="lg" className={classes.container}>
					
					{ location.state && location.state.detail && <Alert>{location.state.detail}</Alert> }

					<Grid container spacing={3}>

						
						<Grid item xs={40}>
							<Paper className={classes.paper}>
								<Typography variant="h2">All Postings</Typography>
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
  