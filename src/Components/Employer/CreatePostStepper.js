import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    stepper: {
		marginTop: theme.spacing(4),
        background: 'transparent'
    },
    actionsContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return [
        {title: 'Add Job Details', description: 'Enter a job description (required) in the text box along with other details about the job.'},
        {title: 'Add Skills', description: 'Specify the list of skills needed for the job to best match applicants.'},
    ];
}

export default function CreatePostStepper(props) {

    const classes = useStyles();

    const [page, setPageNumber] = useState(props.page);

    const steps = getSteps();

    useEffect(() => setPageNumber(props.page), [props.page]);


    const handleNext = () => {
        let nextStep = page + 1;
        setPageNumber(nextStep);

        if(nextStep === steps.length) {
            props.handleSubmit()
        }
        else {
            props.handlePageChange(nextStep);
        }

    };

    const handleBack = () => {
        let prevStep = page - 1;
        setPageNumber(prevStep);
        props.handlePageChange(prevStep);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={page} className={classes.stepper} orientation="vertical">
            {
                steps.map((step, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{step.title}</StepLabel>
                            <StepContent>
                                <Typography variant="body2">{step.description}</Typography>

                                <div className={classes.actionsContainer}>
                                    <Button 
                                        disabled={page === 0} 
                                        onClick={handleBack} 
                                        className={classes.button}
                                        color="default"
                                        size="small" 
                                    >Back
                                    </Button>

                                    <Button 
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleNext}
                                        className={classes.button}
                                        size="small" 
                                    >{page === steps.length - 1 ? 'Post Job' : 'Next'}
                                    </Button>
                                </div>

                            </StepContent>
                        </Step>
                    )
                })
            }
            </Stepper>
        </div>
    );
}