import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        marginTop: '100vh'
    }
}));

export default function Footer() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                    Copyright © Jobs Matcher { new Date().getFullYear() }<br/>
                    Illustrations by Polina Golubeva from Icons8
                </Typography>
            </Box>
        </div>
    )

}