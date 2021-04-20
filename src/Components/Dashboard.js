import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    CardMedia,
    CardActions
} from '@material-ui/core/'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(6),
        // maxHeight: 350,
        // maxWidth: 350
    }
}))

const defaultProps = {
    bgcolor: 'background.paper',
    m: 0,
    style: { width: '5rem', height: '5rem' },
    borderColor: 'text.primary',
};
export default function Dashboard() {
    const classes = useStyles()
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ]
    var cardStyle = {
        display: 'block',
        width: '70vw',
        transitionDuration: '0.3s',
        height: '10vw'
    }
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
               
            >
                {data.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)} >
                      
                        <Card style={cardStyle}>
                            <CardHeader
                                title={`quarter : ${elem.quarter}`}
                                subheader={`earnings : ${elem.earnings}`}
                                
                            />
                            <CardContent 
                            >
                              
                                
                                <Typography variant="h5" gutterBottom>
                                    Hello World
                                </Typography>
                            </CardContent>
                            <Box component="span" m={1}>
                                <Button />
                            </Box>
                        </Card>
        
                     </Grid>
                   
                ))}
            </Grid>
        </div>
    )
}

