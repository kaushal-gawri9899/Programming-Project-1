// import "./styles.css";
import React, { useEffect, useState, useContext, useProps} from "react";
import { makeStyles } from "@material-ui/core/styles";
import profile from './profile.png'
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Radio } from '@material-ui/core';
import {AppBarEmployee} from './AppBarEmployee'
import axios from "axios";
import { SessionProvider, SessionContext} from '../context/SessionContext'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#2160A0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  HeaderButton: {
    margin: "0 2% 0 2%",
  },
  formStyles: {
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    flexDirection:'column',
    margin: '3%'
  },
  imgStyles: {
    width: '35%',
    marginLeft: '2.5%',
    borderRadius: '150px',
  },
  formInputs: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    marginBottom: '2%',
  },
  input: {
    margin: '5%',
    marginRight: '50%',
    padding: '3%',
    borderRadius:'10px',
    fontSize: '1.25rem',
},
  input2: {
    margin: '5%',
    padding: '5%',
    borderRadius:'10px',
    fontSize: '1.25rem',
    marginLeft: '5%'
  },
  formRadios: {
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: '80%'
},
  textStylingRadios: {
    padding: '0',
    margin:'3%',
    marginLeft: '100%',
    width: '100%',
    color:'rgb(0, 0, 0, 60%)',
    textAlign: 'center',
  },
  textStylingInputs: {
    padding: '0',
    margin:'1%',
    marginLeft: '15%',
    color:'rgb(0, 0, 0, 60%)',
    textAlign: 'center',
  }
}));
    

export default function Profile() {
  const classes = useStyles();
  const state = useContext(SessionContext)
    const [colorsData, setColorsData] = useState([]);

  useEffect(() => {
    axios
    .get("http://0.0.0.0:5000/Userprofile", {
        headers: {
            Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    .then((res) => {
        console.log(res.data);
        setColorsData(res.data);
        console.log(colorsData)
        
    })
    .catch((err) => {
        console.log(err);
    });
}, []);

  return (
      <div>
        <AppBarEmployee/>
       
    <div className={classes.root}>
      
      <section className='profile-page'>
        <form className={classes.formStyles}>
        <div id='aviurl' className={classes.formInputs}>
          <img src={profile} alt='' className={classes.imgStyles} />
        </div>
        <div className={classes.formInputs}>
          <label><p className={classes.textStylingInputs}>Email</p>
            <input name='name' type='text'value={colorsData.email}
            className={classes.input} />
          </label>

          <div className={classes.formInputs}>
          <label><p className={classes.textStylingInputs}>UserType</p>
            <input name='name' type='text'value={colorsData.usertype}
            className={classes.input} />
          </label>
          </div>

         

        
        <Button variant="contained" size="medium" color="primary" className={classes.margin}>
          Upload Resume
        </Button>
        
          
        </div>
        </form>
      </section>
    </div>
    </div>
  );
}