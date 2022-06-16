import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron'
import {Button, Container} from '@mui/material';


function Jumbrotron(props) {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>Our favourite moments</h1>
                <img src={props.image} alt={props.title}/>
            </Container>
        </Jumbotron>
    )
}

export default Jumbrotron;