import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import Navbar from "./components/common/Navbar";
import Movies from "./components/movie";
import Notfound from "./components/common/Notfound";
import Customers from "./components/common/customers";
import Rentals from "./components/common/rentals";
import Movieform from "./components/movieform";
import Register from "./components/Register";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
	return (
		<div>
			<Navbar />
			<Switch>
				<Route path="/login" component={LoginForm} />
				<Route path="/register" component={Register} />
				<Route path="/movies/:id" component={Movieform} />
				<Route path="/movies" component={Movies} />
				<Route path="/customers" component={Customers} />
				<Route path="/rentals" component={Rentals} />
				<Route path="/xyz" component={Notfound} />
				<Redirect from="/" to="/movies" />
			</Switch>
		</div>
	);
}

export default App;
