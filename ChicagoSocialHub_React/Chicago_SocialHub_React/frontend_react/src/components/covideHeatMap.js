import React, { Component } from "react";
import { Row, Col, Button, Input, Card} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import {Redirect} from 'react-router-dom'
import { Map, GoogleApiWrapper, HeatMap } from "google-maps-react";

const data = [];

class HeatMapChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToHome: false,
            movetoStations: false,
            stations: [],
            data: [],   
            gradient: [],  
            center: {
                lat: 41.882607, 
                lng:  -87.643548
            }
        }
    }
 
    componentDidMount() {
        let comp = this

        var axios = require('axios');
        var data1 = JSON.stringify({
          "timeRange": "Past Hour",
          "newTimeRangeSelection": false
        });
        
        var config = {
          method: 'get',
          url: 'http://localhost:4000/heatmap',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data1
        };
        
        axios(config)
        .then(function (response) {
          //console.log(JSON.stringify(response.data));

          let gradient = []
          let covidheatmapData = []
                  for(let i=0; i< response.data[0].length; i++) {
        
                    const heatMapDict = {
                      lat: response.data[0][i].latitude, 
                      lng: response.data[0][i].longitude,
                      weight: response.data[0][i].ccvi
                    }
                      covidheatmapData.push(heatMapDict)
                      data.push(heatMapDict)
                      
                  }
                  console.log(data)
                  comp.setState({
                      data: covidheatmapData,
                      
                    //   gradient: gradient
                  })
        })
        .catch(function (error) {
          console.log(error);
        });
        

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
        //{console.log("heat map",this.state.data)}
        const gradient = [
            "rgba(0, 255, 255, 0)",
            "rgba(0, 255, 255, 1)",
            "rgba(0, 191, 255, 1)",
            "rgba(0, 127, 255, 1)",
            "rgba(0, 63, 255, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(0, 0, 223, 1)",
            "rgba(0, 0, 191, 1)",
            "rgba(0, 0, 159, 1)",
            "rgba(0, 0, 127, 1)",
            "rgba(63, 0, 91, 1)",
            "rgba(127, 0, 63, 1)",
            "rgba(191, 0, 31, 1)",
            "rgba(255, 0, 0, 1)"
          ];
        return (
            <div>
                {this.state.movetoStations? <Redirect to = {{
                    pathname: "/list_of_stations",
                    state: { stations: this.props.location.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where} 
                }} 
                /> :null }
                <Header />
                <div style = {{textAlign: "left"}}>
                    <Row>
                        <Col md = {10}></Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToListOfStations.bind(this)}>Go Back <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faArrowLeft} /></span></Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col md = {2} style = {{padding: "20px"}}> Time Range
                            <Input type = "select" style = {{border: "none", borderBottom: "1px solid black"}} name="find" onChange = {this.handleChange.bind(this)}  placeholder = "Find">
                                <option value = "PAST HOUR">Past Hour</option>
                                <option value = "LAST 24 HOURS">Last 24 Hours</option>
                                <option value = "LAST 7 DAYS">Last 7 Days</option>
                            </Input>
                        </Col>
                    </Row>


                     <div style = {{padding: "20px"}}>
                     <Card className="w-full h-512 rounded-8 shadow-1">
                        <div style={{height: `400px`, width: '100%'}}>
                        <Map
                            google={this.props.google}
                            className={"map"}
                            zoom={8}
                            initialCenter={this.state.center}
                            onReady={this.handleMapReady}
                            >
                            <HeatMap
                                gradient={gradient}
                                //positions={this.props.location.state.covidheatmapData}
                                positions={data}
                                opacity={1}
                                radius={10}
                            />
                            </Map>
                        </div>
                     </Card>
                    
                    </div>
                    </div>
                </div >

        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyD7sSn5S_wx5HMwrbsGO4lpKAknoJqxfZA",
    libraries: ["visualization"]
  })(HeatMapChart);

