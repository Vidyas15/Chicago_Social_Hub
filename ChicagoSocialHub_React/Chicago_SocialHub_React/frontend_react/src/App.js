import './App.css';
import { Switch, BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./routes/route";
import { publicRoutes } from "./routes/";


function App() {
  return (
    <div className="App">
				<Router>
					<Switch>
						{publicRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								component={route.component}
								key={idx}
							/>
						))}
					</Switch>
				</Router>
    </div>
  );
}

export default App;

