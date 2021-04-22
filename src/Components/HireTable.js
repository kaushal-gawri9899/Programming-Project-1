import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  	table: {
   		minWidth: 650,
  	},
});

function createData(name, calories, fat, carbs, protein) {
  	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const HireTable = ({ data }) => {
  	console.log(data);
  	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Job Title</TableCell>
						<TableCell align="right">Location</TableCell>
						<TableCell align="right">Job Description</TableCell>
						<TableCell align="right">Experience</TableCell>
						<TableCell align="right">Job Type</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.map((d) => {
						return (
							<TableRow key={d.jobDescription}>
								<TableCell component="th" scope="row">
									{d.jobTitle}
								</TableCell>
								<TableCell align="right">{d.location}</TableCell>
								<TableCell align="right">{d.jobDescription}</TableCell>
								<TableCell align="right">{d.workExperince}</TableCell>
								<TableCell align="right">{d.jobType}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
  	);
};

export default HireTable;
