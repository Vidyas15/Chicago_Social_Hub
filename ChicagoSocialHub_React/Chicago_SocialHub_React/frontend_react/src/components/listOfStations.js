import React, { Component } from "react";
import { Row, Col, Button, Card} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUp, faBicycle, faChartLine, faHome } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import { Table } from "reactstrap"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import {Redirect} from 'react-router-dom'

const heatMapData = [
    {lat: 41.884728, lng: -87.668597},
 {lat: 41.77599, lng: -87.668597},
 {lat: 41.77599, lng: -87.668597},
 {lat: 41.77599, lng: -87.668597},
 {lat: 41.850321, lng: -87.717446},
 {lat: 41.850321, lng: -87.717446},
 {lat: 41.777061, lng: -87.711565},
 {lat: 41.777061, lng: -87.711565},
 {lat: 41.777061, lng: -87.711565},
 {lat: 41.777061, lng: -87.711565},
 {lat: 41.777061, lng: -87.711565},
 {lat: 41.777061, lng: -87.711565},
 {lat: 41.777061, lng: -87.711565},
 {lat: 41.776931, lng: -87.638812},
 {lat: 41.776931, lng: -87.638812},
 {lat: 41.776931, lng: -87.638812},
 {lat: 41.881113, lng: -87.756863},
 {lat: 41.901964, lng: -87.741017},
 {lat: 41.901964, lng: -87.741017},
 {lat: 41.901964, lng: -87.741017},
 {lat: 41.810038, lng: -87.711251},
];

const covideHeatmapData = [
    {lat: 41.77599, lng: -87.668597},
     {lat: 41.77599, lng: -87.668597},
     {lat: 41.77599, lng: -87.668597},
     {lat: 41.77599, lng: -87.668597},
     {lat: 41.850321, lng: -87.717446},
     {lat: 41.850321, lng: -87.717446},
     {lat: 41.777061, lng: -87.711565},
     {lat: 41.777061, lng: -87.711565},
     {lat: 41.777061, lng: -87.711565},
     {lat: 41.777061, lng: -87.711565},
     {lat: 41.777061, lng: -87.711565},
     {lat: 41.777061, lng: -87.711565},
     {lat: 41.777061, lng: -87.711565},
     {lat: 41.776931, lng: -87.638812},
     {lat: 41.776931, lng: -87.638812},
     {lat: 41.776931, lng: -87.638812},
     {lat: 41.881113, lng: -87.756863},
     {lat: 41.901964, lng: -87.741017},
     {lat: 41.901964, lng: -87.741017},
     {lat: 41.901964, lng: -87.741017},
     {lat: 41.810038, lng: -87.711251},
    ];

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
    console.log("hello.....+++++++++++", arr);

    return arr;
}



class ListofStations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToHome: false,
            moveToPlace: false,
            moveToHeatMap: false,
            moveToCovidHeatMap: false,
            moveToDivvyTripsChart: false,
            moveToRealTimeChart: false,
            moveToSmaChart: false,
            markerLatitude: 41.882607,
            markerLongitude: -87.643548,
            label: 'You are Here',
            realTimeChartData: [],
            sma1ChartData: [],
            sma24ChartData: [],
            stationName: ''
        }
    }

    moveToHomePage() {
        this.setState({
            moveToHome: true
        })
    }

    moveToHeatMapPage() {
        this.setState({
            moveToHeatMap: true
        })
    }

    moveToCovidHeatMapPage() {
        this.setState({
            moveToCovidHeatMap: true
        })
    }

    moveToDivvyTripsChartPage() {
        this.setState({
            moveToDivvyTripsChart: true
        })
    }

    moveToRealTimeChartPage(key) {
        let comp = this
    
        var axios = require('axios');
        var data = JSON.stringify({
        "placeName": key.stationName,
        "timeRange": "1 HOUR"
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
        comp.setState({
            realTimeChartData: response.data,
            moveToRealTimeChart: true,
            stationName: key.stationName
        })
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    moveToSmaChartPage(key) {
        let comp = this
    
        var axios = require('axios');
        var data = JSON.stringify({
        "placeName": key.stationName,
        "timeRange": "1 HOUR"
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
        let sma1 = movingAverage(response.data, 1)
        let sma24 = movingAverage(sma1, 24)
        comp.setState({
            realTimeChartData: response.data,
            moveToSmaChart: true,
            sma1ChartData: sma1,
            sma24ChartData: sma24,
            stationName: key.stationName
        })
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    moveToPlacesPage() {
        this.setState({
            moveToPlace: true
        })
    }

    renderMarkers = (map, maps) => {

        let marker = new maps.Marker({
           position: { lat: parseFloat(this.state.markerLatitude), lng: parseFloat(this.state.markerLongitude) },
           map,
           title: this.state.label
        });
        return marker;
     };

    render() {
        const MapWithAMarkerClusterer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7sSn5S_wx5HMwrbsGO4lpKAknoJqxfZA&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: 41.882607, lng:  -87.643548 }}
            >
                {this.props.location.state.stations.map(marker => {
                    //const onClick = props.onClick.bind(this, marker)
                    return (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                        >
                            <InfoWindow>
                                <div>
                                    {marker.stationName}
                                </div>
                            </InfoWindow>
                        </Marker>
                    )
                })}
            </GoogleMap>
        );
        return (
            <div>
                {this.state.moveToHome? <Redirect to = "/find" />: null}
                {this.state.moveToPlace? <Redirect to = {{
                    pathname: "/list_of_places",
                    state: { places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where}
                }}
                />: null}

                {this.state.moveToHeatMap? <Redirect to = {{
                    pathname: "/heat_map",
                    state: { heatMapData: heatMapData, stations: this.props.location.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where} 
                }}
                 />: null}


                {this.state.moveToCovidHeatMap? <Redirect to = {{
                    pathname: "/covid_heat_map",
                    state: {covideHeatmapData: covideHeatmapData, stations: this.props.location.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where} 
                }}
                 />: null}

                {this.state.moveToDivvyTripsChart? <Redirect to = {{
                    pathname: "/divvy_trips_chart",
                    state: { stations: this.props.location.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where} 
                }}
                 />: null}

                {this.state.moveToRealTimeChart? <Redirect to = {{
                    pathname: "/real_time_chart",
                    state: { stationName: this.state.stationName, realTimeChartData: this.state.realTimeChartData, stations: this.props.location.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where} 
                }}
                 />: null} 

                {this.state.moveToSmaChart? <Redirect to = {{
                    pathname: "/sma_chart",
                    state: { stationName: this.state.stationName, realTimeChartData: this.state.realTimeChartData, sma1ChartData: this.state.sma1ChartData, sma24ChartData: this.state.sma24ChartData,
                        stations: this.props.location.state.stations, places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where} 
                }}
                 />: null} 


                <Header />
                <div style = {{textAlign: "left"}}>
                    {/* <Form> */}
                    <Row>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToHomePage.bind(this)}>Home <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faHome} /></span></Button>
                        </Col>
                        {/* <Col md = {1}></Col> */}
                        <Col md = {3} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToHeatMapPage.bind(this)}>Divvy Stations Heat Map <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faBicycle} /></span></Button>
                        </Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToCovidHeatMapPage.bind(this)}>Covid-19 Heat Map <span style = {{marginLeft: "10px"}}></span></Button>
                        </Col>
                        <Col md = {3} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToDivvyTripsChartPage.bind(this)}>Divvy Trips - Trends & Seasonality <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faChartLine} /></span></Button>
                        </Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToPlacesPage.bind(this)}>Go Back <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faArrowLeft} /></span></Button>
                        </Col>
                    </Row>

                     <hr />
                     <div>
                        <Table bordered={false}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Station Name</th>
                                    <th>availableBikes</th>
                                    <th>availableDocks</th>
                                    <th>is_renting</th>
                                    <th>lastCommunicationTime</th>
                                    <th>Latitude</th>
                                    <th>longitude</th>
                                    <th>status</th>
                                    <th>totalDocks</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.location.state.stations.map((rowData, index) => (
                                <tr>
                                <td>{rowData.id}</td>
                                <td>{rowData.stationName}</td>
                                <td>{rowData.availableBikes}</td>
                                <td>{rowData.availableDocks}</td>
                                <td>{String(rowData.is_renting)}</td>
                                <td>{rowData.lastCommunicationTime}</td>
                                <td>{rowData.latitude}</td>
                                <td>{rowData.longitude}</td>
                                <td>{rowData.status}</td>
                                <td>{rowData.totalDocks}</td>
                                <td><Button style = {{backgroundColor: "#191970"}} size="sm" onClick = {this.moveToRealTimeChartPage.bind(this, rowData)}>Real-Time Chart <span style = {{marginLeft: "5px"}}><FontAwesomeIcon icon = {faChartLine} /></span></Button></td>
                                <td> <Button style = {{backgroundColor: "#191970"}} size="sm" onClick = {this.moveToSmaChartPage.bind(this, rowData)}>SMA Chart <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faChartLine} /></span></Button></td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                    <Card className="w-full h-512 rounded-8 shadow-1">
                        <div style={{height: `400px`, width: '100%'}}>
                            <MapWithAMarkerClusterer />
                        </div>
                     </Card>
                        <hr />
                    {/* </Form> */}
                </div >
            </div>

        );
    }
}

export default (ListofStations);