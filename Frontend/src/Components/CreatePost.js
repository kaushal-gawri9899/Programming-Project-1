import React, {useState, useContext, useEffect  } from 'react'
import Box from '@material-ui/core/Box';
import SplitPane, { Pane } from 'react-split-pane';
import 'date-fns';
import { Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme,makeStyles,withStyles} from "@material-ui/core/styles";
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
import {SessionContext} from '../context/SessionContext'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useHistory } from "react-router";
import ChipInput from 'material-ui-chip-input'
import {
    useParams,
    useLocation
  } from "react-router-dom";
  


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
  
export default function CreatePost(props) {
    const [page, setPageNumber] = useState(1);
    const [selectedValue, setSelectedValue] = useState('a');
    const state = useContext(SessionContext)
    const [jobTitle, setTitle] = useState();
    const [jobDescription, setDescription] = useState();
    const [location, setLocation] = useState();
    const [workExperince, setWorkExperince] = useState();
    let jobSelectedType = " ";

    console.log(state.session)
    console.log(selectedValue);
    console.log(page)
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const history = useHistory();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const [chips,setChips] = useState([])

    const onBeforeAdd = (chip) => {
        return chip.length >= 3
      }
    
    const  handleAdd = (chip) => {
        console.log(chips)
        setChips(chip);
    }


        
    const handleDelete  = (deletedChip) => {
        if (deletedChip !== 'react') {
          this.setState({
            chips: this.state.chips.filter((c) => c !== deletedChip)
          })
        } else {
          alert('Why would you delete React?')
        }
    }
    let { id } = useParams();
    const search = props.location.search; 
    const params = new URLSearchParams(search);
    const foo = params.get("mode");
    console.log(foo)

    const handleSubmit = (e) => {
        
        e.preventDefault()
        const userObject = {

            jobTitle: jobTitle,
            jobDescription: jobDescription,
            location: location,
            jobType: selectedValue,
            workExperince: workExperince,
            sessionId: state.session


        };
        const editUserObject = {

            jobTitle: jobTitle,
            jobDescription: jobDescription,
            location: location,
            jobType: selectedValue,
            workExperince: workExperince,
            sessionId: state.session,
            id: id


        };
        console.log(userObject)
        
        if( id == null){ 
            console.log(id)
        
            axios.post('http://0.0.0.0:5000/create', userObject)
            .then((res) => {
                console.log(res.data)
                history.push({
                    pathname:  "/Hire",
                    state: {
                    response: "messageFromServer "
                    } 
                });
            }).catch((error) => {
                console.log(error)
            });      
        }  
        else {
            axios.post('http://0.0.0.0:5000/edit_job_posting', editUserObject)
            .then((res) => {
                console.log(res.data)
                history.push({
                    pathname:  "/Hire",
                    state: {
                    response: "messageFromServer "
                    } 
                });
            }).catch((error) => {
                console.log(error)
            });   
        }
    }
   
    // let query = useQuery();
    // const name = query.get("mode")
   
    // useEffect(() => {
        
    //     console.log(id)

    
    // },[]);
    useEffect(() => {

        const job_id = {
            job_id: id,
            
        
        };
        console.log(id)
        const headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': state.session
            }
            
        }
        axios
        .post("http://0.0.0.0:5000/filtered_jobs_id",{
            job_id:id,
            headers: headers
        })
        .then((res) => {
            console.log(res.data.Items);
            // setColorsData(res.data);
            setTitle(res.data.Items.jobTitle);
            setDescription(res.data.Items.jobDescription);
            setLocation(res.data.Items.location);
            setSelectedValue(res.data.Items.jobType);
            setWorkExperince(res.data.Items.workExperince);
        
            
            
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    

    if(activeStep === 0) {
            
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
                                          {/* {activeStep === steps.length - 1 ? 'CREATE JOB': 'Next'} */}
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
                                        onChange={() => setSelectedValue('Part Time')}
                                    
                                        name="radio-button-demo"
                                        jobSelectedType = "Part Time"
                                        inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <Typography variant="h7">PART-TIME</Typography>
                                    <GreenRadio
                                        checked={{selectedValue} === 'b'}
                                        onChange={() => setSelectedValue('Full Time')}
                                        jobSelectedType = "Full Time"
                                        name="radio-button-demo"
                                        inputProps={{ 'aria-label': 'B' }}
                                    />
                                    <Typography variant="h7">FULL-TIME</Typography>
                                </Box>
                                <Box mt={7} ml={5}>
                                  
                                    <Typography>JOB DESCRIPTION</Typography>
                                    <ChipInput
                                    defaultValue={chips}
                                    onChange={(e) => handleAdd(e)}
                                    />

                                </Box>
                                <Box mt={2} ml={5}>
                                <TextField
                                    required
                                    id="outlined-required"
                                   
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
                                    defaultValue=""
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
                                    defaultValue=""
                                    variant="outlined"
                                    style = {{width: 500}}
                                    />
                        </Box>
                        <Box mt={4} ml={5}>

                       
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="flex-start">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Start Date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                    }}
                                    />
                                
                                </Grid>
                            </MuiPickersUtilsProvider>
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
                                
                                 onClick={handleSubmit} 
                                 variant="contained" 
                                 color="primary" 
                                 size="large"
                                    >
                                 {/* <Button
                                   variant="contained"
                                   color="primary"
                                   onClick={handleNext}
                                   className={classes.button}
                                   size="large" 
                                 //   onClick={() => handleNext}
                                   value={1}
                                 > */}
                                   {activeStep === steps.length - 1 ? 'POST JOB' : 'Next'}
                                   {/* {id !== " " ? 'EDIT JOB' : 'POST JOB' } */}
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

                        <Box mt={4} ml={5}>
                                <TextField               
                                    id="standard-disabled"  
                                    disabled
                                    value = {jobTitle}          
                                   
                                    style = {{width: 500}}
                                    />
                        </Box>

                        <Box mt={4} ml={5}>
                       
                            <Typography variant="h7">JOB DESCRIPTION</Typography>
                         
                        </Box>
                        <Box mt={4} ml={5}>
                                <TextField               
                                    id="standard-disabled"  
                                    disabled
                                    value = {jobDescription}          
                                    multiline
                                    rows={3}
                               
                                   
                                    style = {{width: 500}}
                                    />
                        </Box>
                        <Box mt={4} ml={5}>
                       
                            <Typography variant="h7">JOB TYPE</Typography>
                    
                        </Box>
                        <Box mt={4} ml={5}>
                                <TextField               
                                    id="standard-disabled"  
                                    disabled
                                    value = {selectedValue}          
                                    style = {{width: 500}}
                                />
                        </Box>
                        <Box mt={4} ml={5}>
                       
                            <Typography variant="h7">LOCATION</Typography>
               
                        </Box>
                        <Box mt={4} ml={5}>
                            <TextField               
                               id="standard-disabled"  
                               disabled
                               value = {location}          
                               style = {{width: 500}}
                            />
                        </Box>
                        <Box mt={4} ml={5}>
                       
                            <Typography variant="h7">WORK EXPERINCE </Typography>
          
                        </Box>
                        <Box mt={4} ml={5}>
                            <TextField               
                                id="standard-disabled"  
                                disabled
                                value = {workExperince}          
                                style = {{width: 500}}
                            />
                        </Box>
                        <Box mt={4} ml={5}>
                       
                       <Typography variant="h7">START DATE</Typography>
          
                        </Box>
                        <Box mt={4} ml={5}>
                            <TextField               
                                id="standard-disabled"  
                                disabled
                                value = {selectedDate}          
                                style = {{width: 500}}
                            />
                        </Box>
                   </div>
                {/* <form onSubmit={handleSubmit}>
                <Box mt={4} ml={5}>
                    <MuiThemeProvider theme={greenTheme}>

                        <Button onClick={handleSubmit} variant="contained" color="primary" size="large">POST JOB</Button>
                    </MuiThemeProvider>
                </Box>
                </form> */}
                </SplitPane>
            </div>
        )
    }
    
    
    
}  
