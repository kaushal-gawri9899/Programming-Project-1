import React,{useEffect,useState,useProps} from 'react';
import axios from 'axios';
import HireTable from './HireTable';

// import Colors from './Colors'


export default function Jobs() {


    const [Data,setData]=useState({
        Company:'',
        Description:''
    })
    const [colorsData,setColorsData]=useState([])
    useEffect(()=>{
        axios.get('http://0.0.0.0:5000/jobs')
            .then(res=>{
                console.log('Response from main API: ',res)
                console.log('Home Data: ',res.data)

                console.log('Colors Data: ',res.data)
                setColorsData(res.data.Items)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    return(
        <>
            {/* <h1>{Data.Company}</h1> */}
            {/* <p>{Data.Description}</p> */}
        <HireTable data={colorsData}/>
        </>
    )
}