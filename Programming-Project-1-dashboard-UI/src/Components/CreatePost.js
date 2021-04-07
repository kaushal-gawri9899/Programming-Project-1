import React, { Component,useState, useEffect  } from 'react'
import Box from '@material-ui/core/Box';
import SplitPane, { Pane } from 'react-split-pane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import { Typography } from '@material-ui/core';
import { MuiThemeProvider, ThemeProvider, createMuiTheme,makeStyles,withStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {StyleSheet,View } from 'react-native';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

const greenTheme = createMuiTheme({
    palette: {
      primary: { main: "#008000", contrastText: "#fff" },
    //   secondary: { main: "#03a9f4", contrastText: "#fff" }
    }
});
// const greenTheme = createMuiTheme({ palette: { primary: green, contrastText: "#fff" } })
const styles = {
    background: '#E1E1E1',
    width: '2px',
    cursor: 'col-resize',
    margin: '0 1px',
    height: '100%',
};

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
}));
  

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
  
const stylesBorder = StyleSheet.create({
    viewStyleForLine: {
        borderBottomColor: "black", 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        alignSelf:'stretch',
        width: "100%"
      }
})
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.5
        }}
    />
);
const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Josefin Sans',
        'sans-serif',
      ].join(','),
},});

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}
  
function getStepContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much`;
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
}
  
export default function CreatePost() {
    const [page, setPageNumber] = useState(1);
    const [selectedValue, setSelectedValue] = useState('a');

    const [jobTitle, setTitle] = useState();
    const [jobDescription, setDescription] = useState();
    const [location, setLocation] = useState();
    const [workExperince, setWorkExperince] = useState();

  
    console.log(selectedValue);
    console.log(page)
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    
    const handleSubmit = (e) => {
        
        e.preventDefault()
        const userObject = {
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            location: location,
            jobType: selectedValue,
            workExperince: workExperince

        };
        console.log(userObject)

        axios.post('http://0.0.0.0:5000/create', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        

        
    }

    if(activeStep === 0) {
            
        return (
           
           
                <div>
                   
                    <SplitPane split="vertical" minSize={100}
                                defaultSize={300}
                                resizerStyle={styles}>
                        
                             {/* <div >
                                <Box mt={5} ml={5}>
                                    <h2 style={{ color: '#3E3F3F' }}>Posting Setup</h2>
                                </Box>
            
                                <Box mt={0} ml={7}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <LooksOneIcon fontSize="large" style={{ color: 'green' }} />
                                        <h3 style={{ color: '#A6A6A6' }}>&nbsp;&nbsp;Description</h3>
                                    </div>  
                                   
                                </Box>
                                <Box mt={0} ml={7}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <LooksTwoIcon fontSize="large"/>
                                        <h3 style={{ color: '#A6A6A6' }}>&nbsp;&nbsp;Location</h3>
                                    </div>  
                                    {/* <h3 style={{ color: '#A6A6A6' }}>Location</h3> */}
                                {/* </Box>
                                <Box mt={0} ml={7}>
                                <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <Looks3Icon fontSize="large"/>
                                        <h3 style={{ color: '#A6A6A6' }}>&nbsp;&nbsp;Question</h3>
                                    </div>  
                                    {/* <h3 style={{ color: '#A6A6A6' }}>Question</h3> */}
                                {/* </Box>
                                
                            </div>   */}
                            <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                              {steps.map((label, index) => (
                                <Step key={label}>
                                  <StepLabel>{label}</StepLabel>
                                  <StepContent>
                                    <Typography>{getStepContent(index)}</Typography>
                                    <div className={classes.actionsContainer}>
                                      <div>
                                        <Button
                                          disabled={activeStep === 0}
                                          onClick={handleBack}
                                          className={classes.button}
                                        >
                                          Back
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={handleNext}
                                          className={classes.button}
                                          size="large" 
                                        //   onClick={() => handleNext}
                                          value={1}
                                        >
                                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                        
                                      </div>
                                    </div>
                                  </StepContent>
                                </Step>
                              ))}
                            </Stepper>
                            {activeStep === steps.length && (
                              <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                  Reset
                                </Button>
                              </Paper>
                            )}
                          </div>
                            <div >
                                <Box mt={5} ml={5}>
                                    <Typography variant="h3">Write Your Job Posting</Typography>
                                </Box>
                                {/* <ColoredLine color="black" /> */}
                                <Box ml={2} mt={1}> 
                                    <View
                                        style={{
                                        borderBottomColor: '#E1E1E1',
                                        borderBottomWidth: 2,
                                        width: "95%",
                                        alignItems:'left',
                                    }}
                                
                                /></Box>
                                <Box mt={4} ml={5}>
                                    <Typography variant="h7">JOB TITLE</Typography>
                                </Box>
                                <Box mt={2} ml={5}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    value = {jobTitle}
                                    onChange={(e) => setTitle(e.target.value) }
                                    variant="outlined"
                                    style = {{width: 500}}
                                    />
                                </Box>
            
                                <Box mt={-11.3} ml={90}>
                                    <Typography variant="h7">JOB TYPE</Typography>
                                </Box>
                                <Box mt={1} ml={89}>
                                    <GreenRadio
                                        checked={{selectedValue} === 'a'}
                                        onChange={() => setSelectedValue('a')}
                                    
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <Typography variant="h7">PART-TIME</Typography>
                                    <GreenRadio
                                        checked={{selectedValue} === 'b'}
                                        onChange={() => setSelectedValue('b')}
                                        
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'B' }}
                                    />
                                    <Typography variant="h7">FULL-TIME</Typography>
                                </Box>
                                <Box mt={7} ml={5}>
                                    <Typography>JOB DESCRIPTION</Typography>
                                </Box>
                                <Box mt={2} ml={5}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    value = {jobDescription}
                                    onChange={(e) => setDescription(e.target.value) }
                                    multiline
                                    rows={15}
                                    variant="outlined"
                                    style = {{width: 1000}}
                                    />
                                </Box>
                                
                                <Box ml={2} mt={6}> 
                                    <View
                                        style={{
                                        borderBottomColor: '#E1E1E1',
                                        borderBottomWidth: 2,
                                        width: "95%",
                                        alignItems:'left',
                                    }}
                                
                                /></Box>
                                <Box ml={120} mt={1}>
                                    <MuiThemeProvider theme={greenTheme}>
            
                                        <Button variant="contained" color="primary" size="large" onClick={() => setPageNumber(2)}
                                        value={1}>CONTINUE</Button>
                                    </MuiThemeProvider>
                                </Box>
                                
                                
            
                            
                            </div>
                        </SplitPane>
                     
                </div>
        )
    }
    
    // console.log(jobTitle);
    if(activeStep === 1) {
        return (
            <div>
            <SplitPane split="vertical" minSize={100}
                        defaultSize={300}
                        resizerStyle={styles}>
                
                     
                     <div className={classes.root}>
                     <Stepper activeStep={activeStep} orientation="vertical">
                       {steps.map((label, index) => (
                         <Step key={label}>
                           <StepLabel>{label}</StepLabel>
                           <StepContent>
                             <Typography>{getStepContent(index)}</Typography>
                             <div className={classes.actionsContainer}>
                               <div>
                                 <Button
                                   disabled={activeStep === 0}
                                   onClick={handleBack}
                                   className={classes.button}
                                 >
                                   Back
                                 </Button>
                                 <Button
                                   variant="contained"
                                   color="primary"
                                   onClick={handleNext}
                                   className={classes.button}
                                   size="large" 
                                 //   onClick={() => handleNext}
                                   value={1}
                                 >
                                   {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                 </Button>
                                 
                               </div>
                             </div>
                           </StepContent>
                         </Step>
                       ))}
                     </Stepper>
                     {activeStep === steps.length && (
                       <Paper square elevation={0} className={classes.resetContainer}>
                         <Typography>All steps completed - you&apos;re finished</Typography>
                         <Button onClick={handleReset} className={classes.button}>
                           Reset
                         </Button>
                       </Paper>
                     )}
                   </div>
                    <div>
                        {/* <Box mt={5} ml={5}>
                            <Typography variant="h3">Where will be they working?</Typography>
                        </Box> */}
                        
                        <Box ml={2} mt={1}> 
                            <View
                                style={{
                                borderBottomColor: '#E1E1E1',
                                borderBottomWidth: 2,
                                width: "95%",
                                alignItems:'left',
                            }}
                                    
                        /></Box>
                        <Box mt={4} ml={5}>
                       
                            <Typography variant="h7">LOCATION</Typography>
                              
                        </Box>
                        <Box mt={4} ml={5}>
                                <TextField
                                    required
                                    id=""
                                    label="Required"
                                    value = {location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    defaultValue="Location"
                                    variant="outlined"
                                    style = {{width: 500}}
                                    />
                        </Box>
                        <Box mt={4} ml={5}>
                       
                       <Typography variant="h7">WORK EXPERINCE</Typography>
                         
                        </Box>
                        <Box mt={4} ml={5}>
                                <TextField
                                    required
                                    id=""
                                    label="Required"
                                    value = {workExperince}
                                    onChange={(e) => setWorkExperince(e.target.value)}
                                    defaultValue="Work Experince"
                                    variant="outlined"
                                    style = {{width: 500}}
                                    />
                        </Box>
                        <Box ml={2} mt={48}> 
                            <View
                                style={{
                                borderBottomColor: '#E1E1E1',
                                borderBottomWidth: 2,
                                width: "95%",
                                alignItems:'left',
                            }}
                                
                        /></Box>
                        <Box ml={120} mt={1}>
                            <MuiThemeProvider theme={greenTheme}>
    
                                <Button variant="contained" color="primary" size="large" onClick={() => setPageNumber(3)}
                                value={1}>CONTINUE</Button>
                            </MuiThemeProvider>
                        </Box>
                    </div>
                    </SplitPane>
            </div>
        )
    }
    // console.log(location)
    if(activeStep === 2) {
        return (
            <div>
                
            <SplitPane split="vertical" minSize={100}
                        defaultSize={300}
                        resizerStyle={styles}>
                
                     
                     <div className={classes.root}>
                     <Stepper activeStep={activeStep} orientation="vertical">
                       {steps.map((label, index) => (
                         <Step key={label}>
                           <StepLabel>{label}</StepLabel>
                           <StepContent>
                             <Typography>{getStepContent(index)}</Typography>
                             <div className={classes.actionsContainer}>
                               <div>
                                 <Button
                                   disabled={activeStep === 0}
                                   onClick={handleBack}
                                   className={classes.button}
                                 >
                                   Back
                                 </Button>
                                 <Button
                                   variant="contained"
                                   color="primary"
                                   onClick={handleNext}
                                   className={classes.button}
                                   size="large" 
                                 //   onClick={() => handleNext}
                                   value={1}
                                 >
                                   {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                 </Button>
                                 
                               </div>
                             </div>
                           </StepContent>
                         </Step>
                       ))}
                     </Stepper>
                     {activeStep === steps.length && (
                       <Paper square elevation={0} className={classes.resetContainer}>
                         <Typography>All steps completed - you&apos;re finished</Typography>
                         <Button onClick={handleReset} className={classes.button}>
                           Reset
                         </Button>
                       </Paper>
                     )}
                   </div>
                <form onSubmit={handleSubmit}>
                <Box ml={120} mt={1}>
                    <MuiThemeProvider theme={greenTheme}>

                        <Button onClick={handleSubmit} variant="contained" color="primary" size="large">POST JOB</Button>
                    </MuiThemeProvider>
                </Box>
                </form>
                </SplitPane>
            </div>
        )
    }
    
    
    
}  
