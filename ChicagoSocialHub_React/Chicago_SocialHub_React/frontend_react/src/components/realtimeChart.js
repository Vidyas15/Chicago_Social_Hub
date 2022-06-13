import React, { Component } from "react";
import { Row, Col, Button, Input} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import { Table } from "reactstrap"
import {Redirect} from 'react-router-dom'
import { Line } from "react-chartjs-2";




class RealTimeChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToHome: false,
            movetoStations: false,
            stations: [],
            data: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                  {
                    label: 'Real-Time Data',
                    fill: false,
                    lineTension: 0.1,
                    data: [65, 59, 80],
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderColor: 'rgba(255, 165, 0)',
                  },
                ],
            },
            hour: '1 HOUR'
        }
    }

    componentDidMount() {
        let comp = this
        let data =  this.props.location.state.realTimeChartData

        let labels = []
        let availableDocks = []

        for (let i=0; i< data.length; i++) {
            labels.push(data[i].lastCommunicationTime.toString().substring(11, 19))
            availableDocks.push(data[i].availableDocks)
        }

        labels.reverse()
        availableDocks.reverse()

        comp.setState({
            data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Real-Time Data',
                    fill: false,
                    lineTension: 0.1,
                    data: availableDocks,
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderColor: 'rgba(255, 165, 0)',
                  },
                ],
            }
        })
    }

    handleHourChange(e) {
        const value = e.target.value

        console.log(value)
        let comp = this
    
        var axios = require('axios');
        var data = JSON.stringify({
        "placeName":this.props.location.state.stationName,
        "timeRange": value
        });

        var config = {
        method: 'post',
        url: 'http://localhost:4000/stations/getdocks',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));

        let labels = []
        let availableDocks = []

        for (let i=0; i< response.data.length; i++) {
            labels.push(response.data[i].lastCommunicationTime.toString().substring(11, 19))
            availableDocks.push(response.data[i].availableDocks)
        }

        labels.reverse()
        availableDocks.reverse()

        comp.setState({
            hour: value,
            data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Real-Time Data',
                    fill: false,
                    lineTension: 0.1,
                    data: availableDocks,
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderColor: 'rgba(255, 165, 0)',
                  },
                ],
            }
        })
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    moveToHomePage() {
        this.setState({
            moveToHome: true
        })
    }

    moveToListOfStations() {
        this.setState({
            movetoStations: true
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                {this.state.moveToHome? <Redirect to = "/find" />: null}
                {this.state.movetoStations? <Redirect to = {{
                    pathname: "/list_of_stations",
                    state: { stations: this.props.location.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where} 
                }} 
                /> :null }
                <Header />
                <div style = {{textAlign: "left"}}>
                    <Row>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToHomePage.bind(this)}>Home<span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faHome} /></span></Button>
                        </Col>
                        <Col md = {8}></Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToListOfStations.bind(this)}>Go Back <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faArrowLeft} /></span></Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Input type = "select" value = {this.state.hour} style = {{border: "none", borderBottom: "1px solid black"}} name="hour" onChange = {this.handleHourChange.bind(this)}  placeholder = "Hour">
                                <option value = "1 HOUR">Past Hour</option>
                                <option value = "24 HOUR">Last 24 Hours</option>
                                <option value = "7 DAY">Last 7 Days</option>
                            </Input>
                        </Col>
                    </Row>

                     <div>
                     <div style = {{padding: "20px"}}>
                         <h6>Divvy Dock Station: {this.props.location.state.stationName}</h6>

                    <Row>
                        <Col md = {8} xs = {12}>
                        <div>
                            <Line
                            data = {this.state.data}
                            // Height of graph
                            height={600}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                yAxes: [
                                    {
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Available Docks'
                                        },
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                        gridLines: {
                                            display: true
                                        },
                                    },
                                    
                                ],
                                xAxes: [
                                    {
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Time'
                                        },
                                        gridLines: {
                                            display: true
                                        },
                                    }
                                ]
                                },
                                legend: {
                                labels: {
                                    fontSize: 15,
                                },
                                },
                            }}
                            />
                        </div>
                        </Col>
                    </Row>
                    
                    </div>
                    </div>
                </div >
            </div>

        );
    }
}

export default (RealTimeChart);