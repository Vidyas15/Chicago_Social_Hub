import React, { Component } from "react";
import { Row, Col, Button, Input} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import { Table } from "reactstrap"
import {Redirect} from 'react-router-dom'
import { Line } from "react-chartjs-2";

function movingAverage(data, hourinterval) {
    var arr = []
    data.map((row, index, total) => {

        const endindex = total.length - index - 1
        var startindex = endindex
        const endtime = total[endindex].lastCommunicationTime
        var starttime = new Date(endtime)
        starttime.setHours(starttime.getHours() - hourinterval)
        var timelimit = new Date(total[total.length - 1].lastCommunicationTime)
        timelimit.setHours(timelimit.getHours() - 168);
        var lastCommTime = total[startindex].lastCommunicationTime.toString();
        var lastCommTime_Date = new Date(lastCommTime);
        var end_time = total[endindex].lastCommunicationTime.toString();
        var end_time_Date = new Date(end_time);
        var sum = 0
        var count = 0
        while (total[startindex] != undefined && lastCommTime_Date > starttime) {
            sum += total[startindex].availableDocks
            count++
            startindex--
        }
        if (end_time_Date > timelimit) {
            var avg = sum / count
            if (total[startindex] != undefined) {
                startindex++
            }
            arr.push({ lastCommunicationTime: total[endindex].lastCommunicationTime, availableDocks: avg })
        }
    });
    // console.log("hello.....+++++++++++", arr);

    return arr;
}


class SMAChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToHome: false,
            movetoStations: false,
            stations: [],
            data: {
                labels: ["Time"],
                datasets: [
                  {
                    label: 'Real-Time Data',
                    fill: false,
                    lineTension: 0.1,
                    data: [65, 59, 80],
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderColor: 'rgba(255, 165, 0)',
                  },
                  {
                    label: 'SMA 1-hour',
                    fill: false,
                    lineTension: 0.1,
                    data: [40, 0.5,0.2],
                    backgroundColor: 'green',
                    borderColor: 'green',
                  },
                  {
                    label: 'SMA 24-hour',
                    fill: false,
                    lineTension: 0.1,
                    data: [20, 0, 0.8],
                    backgroundColor: 'red',
                    borderColor: 'red',
                  },
                ],
                hour: '1 HOUR'
            }
        }
    }

    componentDidMount() {
        let comp = this
        let realTimeChartData =  this.props.location.state.realTimeChartData
        let sma1ChartData =  this.props.location.state.sma1ChartData
        let sma24ChartData =  this.props.location.state.sma24ChartData

        let labels = []
        let availableDocks = []
        let sma1Value = []
        let sma24Value = []

        for (let i=0; i< realTimeChartData.length; i++) {
            labels.push(realTimeChartData[i].lastCommunicationTime.toString().substring(11, 19))
            availableDocks.push(realTimeChartData[i].availableDocks)
        }

        for (let i=0; i< sma1ChartData.length; i++) {
            sma1Value.push(sma1ChartData[i].availableDocks)
        }

        for (let i=0; i< sma24ChartData.length; i++) {
            sma24Value.push(sma24ChartData[i].availableDocks)
        }

        labels.reverse()
        availableDocks.reverse()
        sma1Value.reverse()
        sma24Value.reverse()

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
                    backgroundColor: 'rgb(255, 165, 0)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#3DAA1D',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3DAA1D',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                  },
                  {
                    label: 'SMA 1-hour',
                    fill: false,
                    lineTension: 0.1,
                    data: sma1Value,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#3DAA1D',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3DAA1D',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                  },
                  {
                    label: 'SMA 24-hour',
                    fill: false,
                    lineTension: 0.1,
                    data: sma24Value,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#3DAA1D',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3DAA1D',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                  },
                ],
            }
        })
    }

    handleHourChange(e) {
        let value = e.target.value
        let comp = this

        var axios = require('axios');
        var data = JSON.stringify({
        "placeName": this.props.location.state.stationName,
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
        // console.log(JSON.stringify(response.data));
        let sma1 = movingAverage(response.data, 1)
        let sma24 = movingAverage(sma1, 24)



        let labels = []
        let availableDocks = []
        let sma1Value = []
        let sma24Value = []

        for (let i=0; i< response.data.length; i++) {
            labels.push(response.data[i].lastCommunicationTime.toString().substring(11, 19))
            availableDocks.push(response.data[i].availableDocks)
        }

        for (let i=0; i< sma1.length; i++) {
            sma1Value.push(sma1[i].availableDocks)
        }

        for (let i=0; i< sma24.length; i++) {
            sma24Value.push(sma24[i].availableDocks)
        }

        labels.reverse()
        availableDocks.reverse()
        // sma1Value.reverse()
        sma24Value.reverse()


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
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#3DAA1D',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3DAA1D',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                  },
                  {
                    label: 'SMA 1-hour',
                    fill: false,
                    lineTension: 0.1,
                    data: sma1Value,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#3DAA1D',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3DAA1D',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                  },
                  {
                    label: 'SMA 24-hour',
                    fill: false,
                    lineTension: 0.1,
                    data: sma24Value,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#3DAA1D',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3DAA1D',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
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

export default (SMAChart);