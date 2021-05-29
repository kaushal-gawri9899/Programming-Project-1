import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { SessionContext } from '../../context/SessionContext';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import SplitPane from 'react-split-pane';
import ChipInput from 'material-ui-chip-input';
import _ from 'underscore';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import EmployerNavbar from './Navbar'
import CreatePostStepper from '../Employer/CreatePostStepper'


const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        marginTop: theme.spacing(4),
        padding: theme.spacing(2)
    },
    error: {
        margin: theme.spacing(2)
    },
    formControl: {
		width: '100%',
        marginTop: theme.spacing(2),
	},
    skills: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
}));


export default function EditPost() {

    const state = useContext(SessionContext);
    const classes = useStyles();
    const history = useHistory();
    let { id } = useParams();

    const [page, setPage] = useState(0);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [location, setLocation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [jobType, setJobType] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [workExperience, setWorkExperince] = useState('');
    const [skills, setSkills] = useState(['Leadership Skills', 'Team Player', 'Java', 'Python']);
    const [error, setError] = useState('')

    useEffect(() => {
        axios
        .post(`${process.env.REACT_APP_DEPLOYED_URL}` + "/filtered_jobs_id",{
            job_id: id,
            headers: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': state.session
                }
            }
        })
        .then((res) => {
            setJobTitle(res.data.Items.jobTitle);
            setJobDescription(res.data.Items.jobDescription);
            setLocation(res.data.Items.location);
            setJobType(res.data.Items.jobType);
            setWorkExperince(res.data.Items.workExperince);
            setCompanyName(res.data.Items.companyName)
            setSkills([res.data.Items.degree]) 
        })
        .catch((err) => {
            console.log(err);
        });

    }, []);
    const handlePageChange = (page) => {
        setPage(page);
    }

    const handleSubmit = () => {

        const job = {
            sessionId: state.session,
            jobTitle: jobTitle,
            jobDescription: jobDescription,
            location: location,
            jobType: jobType,
            workExperince: workExperience,
            companyName: companyName,
            chips: skills
        };

        let jobURL = `${process.env.REACT_APP_DEPLOYED_URL}` + '/create';
        let successMessage = 'Your job has been successfully created'

        if(id != null) {
            job['id'] = id;
            jobURL = `${process.env.REACT_APP_DEPLOYED_URL}` + '/edit_job_posting';
            successMessage = 'Your job has been successfully updated'
        }

        axios.post(jobURL, job)
        .then((res) => {

            history.push({
                pathname:  "/admin/dashboard",
                state: { detail: successMessage }
            });

        }).catch((error) => {
            setError('Sorry there was an error creating your listing. Please try again.');
            setPage(0);
        });   
    }

    return (
        <>
        <EmployerNavbar />

        <SplitPane 
            split="vertical" 
            minSize={300}
            defaultSize={300}
            resizerStyle={{
                background: '#E1E1E1',
                width: '2px',
                cursor: 'col-resize',
                margin: '0 1px',
                height: '100%',
            }}
        >   
            <CreatePostStepper 
                page={page}
                handlePageChange={handlePageChange} 
                handleSubmit={handleSubmit} 
            />

            <div className={classes.root}>
                
                { error && 
                    <div className={classes.error}>
                        <Alert severity="error">{error}</Alert>
                    </div>
                }

                { 
                page == 0 &&
                <Container>
                    <Typography variant="h2">Create Posting</Typography><br/>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                id="job-title"
                                label="Job Title"
                            />    
                        </Grid>
                        
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                id="company-name"
                                label="Company Name"
                            />     
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="location-label">Location</InputLabel>
                            <Select
                                labelId="location-label"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                label="Location"
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="Melbourne">Victoria</MenuItem>
                                <MenuItem value="New South Wales">New South Wales</MenuItem>
                                <MenuItem value="Queensland">Queensland</MenuItem>
                                <MenuItem value="Tasmania">Tasmania</MenuItem>
                                <MenuItem value="Western Australia">Western Australia</MenuItem>
                                <MenuItem value="Southern Australia">Southern Australia</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="job-type-label">Employment Type</InputLabel>
                            <Select
                                labelId="location-label"
                                id="location"
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                                label="Location"
                            >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="Part Time">Part Time</MenuItem>
                                <MenuItem value="Full Time">Full Time</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
                        

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                id="job-description"
                                label="Job Description"
                                multiline
                                rows={10}
                            />   
                        </Grid>
                    </Grid>
                </Container>
                }

                {
                    page == 1 &&
                    <Container>
                        <Typography variant="h2">Create Posting</Typography><br/>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    clearable
                                    value={startDate}
                                    placeholder="10/10/2018"
                                    onChange={date => setStartDate(date)}
                                    minDate={new Date()}
                                    format="dd/MM/yyyy"
                                    label="Start Date"
                                />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <ChipInput
                                    variant="outlined"
                                    margin="normal"
                                    label="Skills"
                                    fullWidth
                                    value={skills}
                                    onAdd={(skill) => setSkills([...skills, skill])}
                                    onDelete={(skill) => setSkills(_.without(skills, skill))}
                                    helperText="Add a list of relevant skills"
                                    className={classes.skills}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="seniority-label">Seniority (Work Experience)</InputLabel>
                                <Select
                                    labelId="seniority-label"
                                    id="seniority"
                                    value={workExperience}
                                    onChange={(e) => setWorkExperince(e.target.value)}
                                    label="Seniority (Work Experience)"
                                >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="Entry Level">Entry Level</MenuItem>
                                    <MenuItem value="Mid-Senior Level">Mid-Senior Level</MenuItem>
                                    <MenuItem value="Expert Level">Expert Level</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Container>
                }
            </div>
            
        </SplitPane>
        </>
    );
}