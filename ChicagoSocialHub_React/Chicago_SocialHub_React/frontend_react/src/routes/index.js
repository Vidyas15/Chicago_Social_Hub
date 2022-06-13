import React from "react";
import { Redirect } from "react-router-dom";
import Find from "../components/find";
import ListofPlaces from "../components/listOfPlaces";
import ListofStations from "../components/listOfStations";
import RealTimeChart from "../components/realtimeChart";
import SMAChart from "../components/smaChart";
import YelpReviewChart from "../components/yelpReviewChart";
import HeatMapChart from "../components/heatmap";
import DivvyTripsChart from "../components/divvyTripsChart";
import covideHeatMap from "../components/covideHeatMap";


const publicRoutes = [
	{ path: "/find", component: Find },
    { path: "/list_of_places", component: ListofPlaces },
    { path: "/list_of_stations", component: ListofStations },
    { path: "/yelp_review_chart", component: YelpReviewChart },
    { path: "/real_time_chart", component: RealTimeChart },
    { path: "/sma_chart", component: SMAChart },
    { path: "/heat_map", component: HeatMapChart },
    { path: "/covid_heat_map", component: covideHeatMap },
    { path: "/divvy_trips_chart", component: DivvyTripsChart },

    { path: "/", exact: true, component: () => <Redirect to="/find" /> }
];

export { publicRoutes };
