import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    avatar: {
        background: theme.palette.primary.main
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.grey[100]}`,
        width: '100%',
        cursor: 'pointer'
    },
    cardContent: {
        paddingTop: 0
    },
    cardBody: {
        whiteSpace: 'normal'
    },
    success: {
        color: theme.palette.success.main
    }
}));

const getTruncatedText = (str, n, useWordBoundary) => {
    if (str.length <= n) {
        return str;
    }
    const subString = str.substr(0, n - 1);
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + String.fromCharCode(8230);
};


export default function JobCard(props) {
    const history = useHistory();
    const classes = useStyles();
    const job = props.job;

    const handleCardClick = (id) => {
        history.push({
            pathname:  "/employee/job/" + id,
        })
    }

    return (
        <Card
            elevation={4}
            onClick={() => handleCardClick(job.Id)}
            className={classes.card}
        >
            <CardHeader
                title={job.jobTitle}
                titleTypographyProps={{ color: "secondary", variant: "h6" }}
                subheader={ `${job.companyName}, ${job.jobType}, ${job.location}` }
                avatar={
                    <Avatar src="data:image/jpeg;base64,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" />
                }
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" component="p" color="secondary" className={classes.cardBody}>
                    { getTruncatedText(job.jobDescription, 250, true) }
                </Typography>
            </CardContent> 

            {/* <CardHeader
                title="Graduate Diploma in Early Childhood Education                                    "
                titleTypographyProps={{ color: "secondary", variant: "h6" }}
                subheader="Royal Melbourne Institute of Technology                                    "
                avatar={
                    <Avatar className={classes.avatar}>{job.companyName[0]}</Avatar>
                }
                action={
                    localStorage.getItem(job.Id) ? <DoneAllIcon className={classes.success} /> : ''
                }
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" component="p" color="secondary">
                    { getTruncatedText("The GD204 Graduate Diploma in Early Childhood Education is designed to enable you to work as a professional teacher in early childhood education contexts.You will be equipped with the necessary critical and pedagogical strategies to become an effective teacher across a range of early childhood education contexts.", 250, true) }
                </Typography>
            </CardContent>  */}
        </Card>
    );

}