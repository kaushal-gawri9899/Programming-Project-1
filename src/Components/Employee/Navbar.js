import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Logo from '../../logo.svg';

const isActive = (active, page) => {
	return active === page ? "primary" : "textSecondary"
}

export default function EmployeeNavbar(props) {
	return (
		<AppBar  position="static" color="inherit">
			<Toolbar elevation={0}>
				<Container>
					<Grid container direction="row" alignItems="center" spacing={1}>
						<Grid item>
							<img src={Logo} width="40px;"/>
						</Grid>
						<Grid item xs={4}>
							<Link href="/employee/dashboard" underline="none">
								<Typography variant="h2">Jobs Matcher</Typography>
							</Link>
						</Grid>
						<Grid item xs={1}>
							<Link href="/employee/dashboard" underline="none">
								<Typography variant="body1" color={isActive(props.active, "dashboard")}>
									Dashboard
								</Typography>
							</Link>
						</Grid>
						<Grid item xs={1}>
							<Link href="https://video-conference.dxfzj9xfwcl73.amplifyapp.com/#/" underline="none">
								<Typography variant="body1" color="textSecondary">+ Meeting</Typography>
							</Link>
						</Grid>
						<Grid item xs={4}>
							<Link href="/employee/resume" underline="none">
								<Typography variant="body1" color={isActive(props.active, "resume")}>
									Upload Resume
								</Typography>
							</Link>
						</Grid>
						<Grid item>
							<Link href="/" underline="none">
								<Typography variant="body1" color="textSecondary">Logout</Typography>
							</Link>
						</Grid>
					</Grid>
				</Container>
			</Toolbar>
		</AppBar>
	)
}



