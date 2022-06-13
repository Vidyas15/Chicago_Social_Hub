import React, { Component } from "react";
import { Row, Col, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import { Table } from "reactstrap"
import {Redirect} from 'react-router-dom'


class ListofPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToHome: false,
            movetoStations: false,
            moveToYelp: false,
            stations: []
        }
    }

    moveToHomePage() {
        this.setState({
            moveToHome: true
        })
    }

    moveToYelpReviewChart() {
        this.setState({
            moveToYelp: true
        })
    }

    moveToListOfStations(key) {
        let comp = this
        
        var axios = require('axios');
        var data = JSON.stringify({
        "find": this.props.location.state.find,
        "where": this.props.location.state.where,
        "placeName": key.name
        });

        var config = {
        method: 'post',
        url: 'http://localhost:4000/stations/find',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        //{"stations_found":"Successfully Retrieved"}
        if(response.data.stations_found === "Successfully Retrieved") {
            var axios = require('axios');

            var config = {
            method: 'get',
            url: 'http://localhost:4000/stations',
            headers: { }
            };
            
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            comp.setState({
                    stations: response.data, 
                    movetoStations: true
                })
            })
            .catch(function (error) {
            console.log(error);
            });        
        }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    render() {
        return (
            <div>
                {this.state.moveToHome? <Redirect to = "/find" />: null}
                {this.state.movetoStations? <Redirect to = {{
                    pathname: "/list_of_stations",
                    state: { stations: this.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where}
                }} 
                /> :null }

                {this.state.moveToYelp? <Redirect to = {{
                    pathname: "/yelp_review_chart",
                    state: { places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where}
                }}
                /> : null }


                <Header />
                <div style = {{textAlign: "left"}}>
                    {/* <Form> */}
                    <Row>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToHomePage.bind(this)}>Home <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faHome} /></span></Button>
                        </Col>
                        <Col md = {3} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToYelpReviewChart.bind(this)}>Yelp Reviews Chart <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faChartBar} /></span></Button>
                        </Col>
                    </Row>

                     <hr />
                     <div style = {{padding: "20px"}}>
                        <Table bordered={false}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Closed</th>
                                    <th>Rating</th>
                                    <th>Review Count</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.location.state.places.map((rowData, index) => (
                                <tr key = {index}>
                                    <td>{rowData.name}</td>
                                    <td>{rowData.display_phone}</td>
                                    <td>{rowData.address1}</td>
                                    <td>{String(rowData.is_closed)}</td>
                                    <td>{rowData.rating}</td>
                                    <td>{rowData.review_count}</td>
                                    <td> <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToListOfStations.bind(this, rowData)}>Divvy Near By </Button></td>
                                </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                        <hr />
                    {/* </Form> */}
                </div >
            </div>

        );
    }
}

export default (ListofPlaces);