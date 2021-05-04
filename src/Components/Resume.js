import React,{useEffect, useState, useContext, useProps } from "react";
import { Box, Typography, Grid, Button, makeStyles } from "@material-ui/core";
import { SessionProvider, SessionContext} from '../context/SessionContext'
import axios from "axios";

export default function Resume() {

    // const data = new FormData();
    const [selectedFiles, setSelectedFiles] = useState();

    const handleInputChange = (e) => {
        setSelectedFiles(e.target.files[0])

    }


    const state = useContext(SessionContext)
    const fileSubmit = () => {
        
        const data = new FormData();
        data.append('file', selectedFiles)
        // data.append('headerName', state.session)
        console.warn(selectedFiles)
        const id = {
            id: state.session,
            data: data
        }

        axios.post('http://0.0.0.0:5000/upload', data, {
            headers: {
                Authorization: state.session,
                "Content-Type": "application/x-www-form-urlencoded",
                },
        })
        .then((res) => {
            console.log(data)
            console.log("RESPONSE ==== : ", res);
        
        })
        .catch((err) => {

            console.log("ERROR: ====", err);
        })
    }
    // const handleUploadImage = (e) => {
    
    //     const user = {
    //         id: state.session
            
        
    // };    

    // data.append('file', this.uploadInput.files[0]);
    // data.append('filename', state.session);
    // // date.append('header', state.session)
    
    // console.log(data)
    
    // axios.post('http://0.0.0.0:5000/upload', data, user)
    // .then((res) => {
    // console.log("RESPONSE ==== : ", res);
    // })
    // .catch((err) => {
    // console.log("ERROR: ====", err);
    // })
    
    // };

    
        return (
          
          
        <div>
          {/* <input ref={(ref) => { uploadInput = ref; }} type="file" /> */}
          <label className="btn btn-default">
          <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
      </label>
        
        <div>
          {/* <input ref={(ref) => { fileName = ref; }} type="text" placeholder="Enter the desired name of file" /> */}
        </div>
        <br />
        <div>
          {/* <button>Upload</button> */}
          <button type="submit" className="btn btn-dark" onClick={()=>fileSubmit()}>Save</button>
        </div>
        </div>
      
        );
    
}