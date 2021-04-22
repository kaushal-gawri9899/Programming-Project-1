import { Component } from "react";
import React from 'react';
import JOB from './JobCard'
import SEARCH from './SearchBar'
import {AppBarEmployee} from './AppBarEmployee'

export default class EmployeeDashboard extends Component {
    render() {
        return (
            <div>
                
                
                <AppBarEmployee/>
                <br/>
                <br/>
                <br/>
                <SEARCH/>
                <JOB/>
            </div>
        );
    }
}