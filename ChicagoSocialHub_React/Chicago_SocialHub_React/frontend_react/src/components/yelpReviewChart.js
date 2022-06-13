import React, { Component } from "react";
import { Row, Col, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartBar, faHome } from "@fortawesome/free-solid-svg-icons";
import Header from "./header";
import { Table } from "reactstrap"
import {Redirect} from 'react-router-dom'
import { Bar } from "react-chartjs-2";




class YelpReviewChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moveToHome: false,
            movetoStations: false,
            stations: [],
            data: {
                labels: [],
                datasets: [
                  {
                    label: 'Count',
                    data: [],
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            }
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.places)

        let comp = this
        let data = this.props.location.state.places

        let labels = []
        let dataCount = []

        for(let i=0; i< data.length; i++) {
            labels.push(data[i].name)
            dataCount.push(data[i].review_count)
        }

        comp.setState({
            data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Count',
                    data: dataCount,
                    backgroundColor: 'rgb(60, 179, 113)',
                  }
                ],
            }
        })
    }

    moveToHomePage() {
        this.setState({
            moveToHome: true
        })
    }

    

    render() {
        return (
            <div>
                {this.state.moveToHome? <Redirect to = {{
                    pathname: "/list_of_places",
                    state: { places: this.props.location.state.places, find: this.props.location.state.find, where: this.props.location.state.where}
                }}
                />: null}
                <Header />
                <div style = {{textAlign: "left"}}>
                    <Row>
                        <Col md = {10}></Col>
                        <Col md = {2} style = {{padding: "20px"}}>
                            <Button style = {{backgroundColor: "#191970"}} onClick = {this.moveToHomePage.bind(this)}>Go Back <span style = {{marginLeft: "10px"}}><FontAwesomeIcon icon = {faArrowLeft} /></span></Button>
                        </Col>
                    </Row>

                     <div>
                     <div style = {{padding: "20px"}}>
                         <h4>Yelp Reviews Chart</h4>

                    <Row>
                        <Col md = {8} xs = {12}>
                        <div>
        <Bar
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
                        labelString: 'Yelp Reviews Count'
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
                        labelString: 'Name'
                      },
                    barPercentage: 0.3
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
                        {/* <hr /> */}
                    {/* </Form> */}
                </div >
            </div>

        );
    }
}

export default (YelpReviewChart);