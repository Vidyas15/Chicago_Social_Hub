import React from "react";
import { Route } from "react-router-dom";

const AppRoute = ({
	component: Component,
	...rest
}) => (
		<Route
			{...rest}
			render={props => {
				return (
						<Component {...props} />
				);
			}}
		/>
	);

export default AppRoute;