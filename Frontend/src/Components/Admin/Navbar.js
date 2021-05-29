import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Logo from '../../logo.svg';

export default function AdminNavbar() {
	return (
		<AppBar  position="static" color="inherit">
			<Toolbar elevation={0}>
				<Container>
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<img src={Logo} width="40px;"/>
						</Grid>
						<Grid item xs={4}>
							<Link href="/admin/dashboard" underline="none">
								<Typography variant="h2">Jobs Matcher</Typography>
							</Link>
						</Grid>
						<Grid item xs={1}>
							<Link href="/admin/dashboard" underline="none">
								<Typography variant="body1" color="primary">Dashboard</Typography>
							</Link>
						</Grid>
						<Grid item xs={5}>
							<Link href="https://video-conference.dxfzj9xfwcl73.amplifyapp.com/#/" underline="none">
								<Typography variant="body1" color="textSecondary">+ Join Meeting</Typography>
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



