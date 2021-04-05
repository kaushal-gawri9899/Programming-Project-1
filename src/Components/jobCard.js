import React, { Component } from "react";
import { Card } from "react-bootstrap";
import {Button} from "react-bootstrap"
import './CSS/style.css'

// const skills = ["Java" , "Node js"]


class JobCard extends Component {
  render() {
 
    return (
      <div className="check">
      
        <Card className="card" style={{ width: "75rem", height: "16rem"} }>
          <Card.Body>
            <Card.Title><h1>Frontend Dev</h1></Card.Title>
            <Card.Text>
              <h3>
              Role
              </h3>
            </Card.Text>
            <Card.Text className="details">
            <h4>
            Looking for Business Information Systems/Technology Tutor
            </h4>
            </Card.Text>
            <Card.Text>
            <label className="move">Melbourne</label>
            <Button className="button">Apply</Button>
            </Card.Text>
            
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default JobCard;
