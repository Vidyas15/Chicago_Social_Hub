import React, { Component } from "react";
import { Row, Col, FormGroup, Input, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import {Redirect} from 'react-router-dom'


class Find extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToPlace: false,
            places: [],
            find: '',
            where: ''
        }
    }

    moveToListOfPlaces() {
        let data1 = this.state
        let comp = this
        var axios = require('axios');
        var data = JSON.stringify({
        "find": data1.find,
        "where": data1.where
        });

        var config = {
        method: 'post',
        url: 'http://localhost:4000/places/find',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        comp.setState({
                places: response.data, 
                    moveToPlace: true
                })
        })

        .catch(function (error) {
        console.log(error);
        });

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                {this.state.moveToPlace? <Redirect to = {{
                    pathname: "/list_of_places",
                    state: { places: this.state.places, find: this.state.find, where: this.state.where}
                }}
                />: null}
                <Header />
                <div style = {{marginTop: "40px"}}><hr /></div>
                <div style = {{textAlign: "left"}}>
                    {/* <Form> */}
                    <Row>
                        <Col md = {8} style = {{padding: "20px"}}>
                            <Input style = {{border: "none", borderBottom: "1px solid black"}} name="find" onChange = {this.handleChange.bind(this)}  placeholder = "Find"/>
                            <p style = {{textAlign: "left"}}>Restaurants, Bars, Cafe, ...</p>
                        </Col>
                        <Col md = {8} style = {{padding: "20px"}}>
                        <FormGroup>
                            <Input style = {{border: "none", borderBottom: "1px solid black"}} name="where" onChange = {this.handleChange.bind(this)}  placeholder = "Where"/>
                            <p>Near me, ...</p>
                        </FormGroup>
                        </Col>
                    </Row>

                    <hr />
                        <Col md = {12} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToListOfPlaces.bind(this)}>Go <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faSearch} /></span></Button>
                        </Col>
                        <hr />
                    {/* </Form> */}
                </div >
            </div>

        );
    }
}

export default (Find);