/*

Functional component for a common appbar along all employer pages

*/
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Logo from '../logo.svg';

export default function Navbar() {
	return (
		<AppBar  position="static" color="inherit">
			<Toolbar elevation={0}>
				<Container>
					<Link href="/" underline="none">
						<Grid container direction="row" alignItems="center">
							<Grid item>
								<img src={Logo} width="40px;"/>
							</Grid>
							<Grid item>
								<Typography variant="h2">Jobs Matcher</Typography>
							</Grid>
						</Grid>
					</Link>
				</Container>
			</Toolbar>
		</AppBar>
	)
}



