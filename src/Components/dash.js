import React from "react";
// import bootstrap, { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import './CSS/dashboard.css';
import JobCard from "./jobCard";

// import styled from 'styled-components';

function Dash() {
  
    return (
      <div className="search-job text-center">
        <label>Keyword</label>
        <input type="text" className="form-control" name="Search" placeholder="Keyword" />
        <label>Job type</label>
        <input type="text" className="form-control" name="Search" placeholder="Select" />
        <label>Location</label>
        <input type="text" className="form-control" name="Search" placeholder="Location" />
        <Button className="btn-primary" variant="primary">Search</Button>
        
      </div>
    );
}

export default Dash;
