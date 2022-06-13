import React, { Component } from "react";
import { Row, Col, Button, Input} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import { Table } from "reactstrap"
import {Redirect} from 'react-router-dom'
import { Bar } from "react-chartjs-2";
import Loader from 'react-loader-spinner'




class DivvyTripsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToHome: false,
            movetoStations: false,
            startDate: '2018-10-08',
            endDate: '2018-10-14',
            loader: false,
            stations: [],
            data1: {
                labels: [],
                datasets: [
                  {
                    label: 'Monday',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            },
            data2: {
                labels: [],
                datasets: [
                  {
                    label: 'Tuesday',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            },
            data3: {
                labels: [],
                datasets: [
                  {
                    label: 'Wednesday',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            },
            data4: {
                labels: [],
                datasets: [
                  {
                    label: 'Thursday',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            },
            data5: {
                labels: [],
                datasets: [
                  {
                    label: 'Friday',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            },
            data6: {
                labels: [],
                datasets: [
                  {
                    label: 'Saturday',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            },
            data7: {
                labels: [],
                datasets: [
                  {
                    label: 'Sunday',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Divvy Trips'
                        },
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                    
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        },
                        barPercentage: 0.5
                    }
                ]
                },
                legend: {
                labels: {
                    fontSize: 15,
                },
                },
            }
        }
    }
    componentDidMount(){
        let comp = this
        var axios = require('axios');

         /* Monday*/
         var day1 = JSON.stringify({
            "day": 1,
            "selectedDate": "2018-10-01T00:00:00.000Z"
            });
    
            var config = {
            method: 'post',
            url: 'http://localhost:4000/countDivvyTripsPerDay',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : day1
            };
    
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.MONDAY === "Successfully Retrieved") {
                    var axios = require('axios');
                    let data1label = []
                    let data1Value = []
                    var config = {
                    method: 'get',
                    url: 'http://localhost:4000/getDivvyTripsCountsForMonday',
                    headers: { }
                    };
    
                    axios(config)
                    .then(function (response) {
                    //console.log(JSON.stringify(response.data));
                    for (let i = 0; i<response.data.length; i++){
                        data1label.push(response.data[i].hour_timestamp)
                        data1Value.push(response.data[i].total_trips)
                    }
                    comp.setState({ 
                        data1: {
                            labels: data1label,
                            datasets: [
                              {
                                label: 'Monday',
                                data: data1Value,
                                backgroundColor: 'rgb(60, 179, 113)',
                              }
                            ],
                        },
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

            // TUESDAY
        var day2 = JSON.stringify({
        "day": 2,
        "selectedDate": "2018-10-02T00:00:00.000Z"
        });

        var config = {
        method: 'post',
        url: 'http://localhost:4000/countDivvyTripsPerDay',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : day2
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        if(response.data.TUESDAY === "Successfully Retrieved") {
                var axios = require('axios');
                let data2label = []
                let data2Value = []
                var config = {
                method: 'get',
                url: 'http://localhost:4000/getDivvyTripsCountsForTuesday',
                headers: { }
                };

                axios(config)
                .then(function (response) {
                //console.log(JSON.stringify(response.data));
                for (let i = 0; i<response.data.length; i++){
                    data2label.push(response.data[i].hour_timestamp)
                    data2Value.push(response.data[i].total_trips)
                }
                comp.setState({ 
                    data2: {
                        labels: data2label,
                        datasets: [
                          {
                            label: 'Tuesday',
                            data: data2Value,
                            backgroundColor: 'rgb(60, 179, 113)',
                          }
                        ],
                    },
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

        // wednesday
        var day3= JSON.stringify({
            "day": 3,
            "selectedDate": "2018-10-03T00:00:00.000Z"
            });
    
            var config = {
            method: 'post',
            url: 'http://localhost:4000/countDivvyTripsPerDay',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : day3
            };
    
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.WEDNESDAY === "Successfully Retrieved") {
                    var axios = require('axios');
                    let data2label = []
                    let data2Value = []
                    var config = {
                    method: 'get',
                    url: 'http://localhost:4000/getDivvyTripsCountsForWednesday',
                    headers: { }
                    };
    
                    axios(config)
                    .then(function (response) {
                    //console.log(JSON.stringify(response.data));
                    for (let i = 0; i<response.data.length; i++){
                        data2label.push(response.data[i].hour_timestamp)
                        data2Value.push(response.data[i].total_trips)
                    }
                    comp.setState({ 
                        data3: {
                            labels: data2label,
                            datasets: [
                              {
                                label: 'Wednesday',
                                data: data2Value,
                                backgroundColor: 'rgb(60, 179, 113)',
                              }
                            ],
                        },
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
    
            // THURSDAY

            var day4 = JSON.stringify({
                "day": 4,
                "selectedDate": "2018-10-04T00:00:00.000Z"
                });
        
                var config = {
                method: 'post',
                url: 'http://localhost:4000/countDivvyTripsPerDay',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : day4
                };
        
                axios(config)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                if(response.data.THURSDAY === "Successfully Retrieved") {
                        var axios = require('axios');
                        let data2label = []
                        let data2Value = []
                        var config = {
                        method: 'get',
                        url: 'http://localhost:4000/getDivvyTripsCountsForThursday',
                        headers: { }
                        };
        
                        axios(config)
                        .then(function (response) {
                        //console.log(JSON.stringify(response.data));
                        for (let i = 0; i<response.data.length; i++){
                            data2label.push(response.data[i].hour_timestamp)
                            data2Value.push(response.data[i].total_trips)
                        }
                        comp.setState({ 
                            data4: {
                                labels: data2label,
                                datasets: [
                                  {
                                    label: 'Thursday',
                                    data: data2Value,
                                    backgroundColor: 'rgb(60, 179, 113)',
                                  }
                                ],
                            },
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
        
    //    FRIDAY

    var day5= JSON.stringify({
        "day": 5,
        "selectedDate": "2018-10-05T00:00:00.000Z"
        });

        var config = {
        method: 'post',
        url: 'http://localhost:4000/countDivvyTripsPerDay',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : day5
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        if(response.data.FRIDAY === "Successfully Retrieved") {
                var axios = require('axios');
                let data2label = []
                let data2Value = []
                var config = {
                method: 'get',
                url: 'http://localhost:4000/getDivvyTripsCountsForFriday',
                headers: { }
                };

                axios(config)
                .then(function (response) {
                //console.log(JSON.stringify(response.data));
                for (let i = 0; i<response.data.length; i++){
                    data2label.push(response.data[i].hour_timestamp)
                    data2Value.push(response.data[i].total_trips)
                }
                comp.setState({ 
                    data5: {
                        labels: data2label,
                        datasets: [
                          {
                            label: 'Friday',
                            data: data2Value,
                            backgroundColor: 'rgb(60, 179, 113)',
                          }
                        ],
                    },
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

        // SATURDAY

        var day6= JSON.stringify({
            "day": 6,
            "selectedDate": "2018-10-06T00:00:00.000Z"
            });
    
            var config = {
            method: 'post',
            url: 'http://localhost:4000/countDivvyTripsPerDay',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : day6
            };
    
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.SATURDAY === "Successfully Retrieved") {
                    var axios = require('axios');
                    let data2label = []
                    let data2Value = []
                    var config = {
                    method: 'get',
                    url: 'http://localhost:4000/getDivvyTripsCountsForSATURDAY',
                    headers: { }
                    };
    
                    axios(config)
                    .then(function (response) {
                    //console.log(JSON.stringify(response.data));
                    for (let i = 0; i<response.data.length; i++){
                        data2label.push(response.data[i].hour_timestamp)
                        data2Value.push(response.data[i].total_trips)
                    }
                    comp.setState({ 
                        data6: {
                            labels: data2label,
                            datasets: [
                              {
                                label: 'Saturday',
                                data: data2Value,
                                backgroundColor: 'rgb(60, 179, 113)',
                              }
                            ],
                        },
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
    
            // SUNDAY

            var day7 = JSON.stringify({
                "day": 0,
                "selectedDate": "2018-10-07T00:00:00.000Z"
                });
        
                var config = {
                method: 'post',
                url: 'http://localhost:4000/countDivvyTripsPerDay',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : day7
                };
        
                axios(config)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                if(response.data.SUNDAY === "Successfully Retrieved") {
                        var axios = require('axios');
                        let data2label = []
                        let data2Value = []
                        var config = {
                        method: 'get',
                        url: 'http://localhost:4000/getDivvyTripsCountsSunday',
                        headers: { }
                        };
        
                        axios(config)
                        .then(function (response) {
                        //console.log(JSON.stringify(response.data));
                        for (let i = 0; i<response.data.length; i++){
                            data2label.push(response.data[i].hour_timestamp)
                            data2Value.push(response.data[i].total_trips)
                        }
                        comp.setState({ 
                            data7: {
                                labels: data2label,
                                datasets: [
                                  {
                                    label: 'Sunday',
                                    data: data2Value,
                                    backgroundColor: 'rgb(60, 179, 113)',
                                  }
                                ],
                            },
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
        let comp = this
        this.setState({
            [e.target.name]: e.target.value,
            loader: true
        })

        setTimeout(function() {
            comp.setState({
                loader: false
            })
        }, 1000)
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
                {this.state.loader ?
                <Loader 
                type="Bars" 
                color="black" 
                height={80} 
                width={80}
                timeout={5000}
                style = {{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
             /> : null }
                <div style = {{textAlign: "left"}}>
                    <Row>
                        <Col md = {10}></Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToListOfStations.bind(this)}>Go Back <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faArrowLeft} /></span></Button>
                        </Col>
                    </Row>

                    <h6 style = {{textAlign: "center"}}>Choose a week</h6>


                    <Row>
                        <Col md = {4}></Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Input type = "date" value = {this.state.startDate} style = {{border: "none", borderBottom: "1px solid black"}} name="startDate" onChange = {this.handleChange.bind(this)} />
                        </Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Input type = "date" value = {this.state.endDate} style = {{border: "none", borderBottom: "1px solid black"}} name="endDate" onChange = {this.handleChange.bind(this)} />
                        </Col>
                    </Row>

                     <div>
                     <div style = {{padding: "20px"}}>
                    <Row>
                        <Col md = {2}></Col>
                        <Col md = {4} xs = {4}>
                        <Bar
                            data = {this.state.data1}
                            height={300}
                            options={this.state.options}
                            />
                        </Col>
                        <Col md = {4} xs = {4}>
                        <Bar
                            data = {this.state.data2}
                            height={300}
                            options={this.state.options}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md = {2}></Col>
                        <Col md = {4} xs = {4}>
                        <Bar
                            data = {this.state.data3}
                            height={300}
                            options={this.state.options}
                            />
                        </Col>
                        <Col md = {4} xs = {4}>
                        <Bar
                            data = {this.state.data4}
                            height={300}
                            options={this.state.options}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md = {2}></Col>
                        <Col md = {4} xs = {4}>
                        <Bar
                            data = {this.state.data5}
                            height={300}
                            options={this.state.options}
                            />
                        </Col>
                        <Col md = {4} xs = {4}>
                        <Bar
                            data = {this.state.data6}
                            height={300}
                            options={this.state.options}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md = {2}></Col>
                        <Col md = {4} xs = {4}>
                        <Bar
                            data = {this.state.data7}
                            height={300}
                            options={this.state.options}
                            />
                        </Col>
                    </Row>
                    
                    </div>
                    </div>
                </div >
            </div>

        );
    }
}

export default (DivvyTripsChart);