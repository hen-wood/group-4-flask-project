import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage";
import DiscoveryPage from "./components/DiscoveryPage"
function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<SplashPage />
					</Route>
					<Route path="/login">
						<LoginForm />
					</Route>
					<Route path="/register">
						<RegisterForm />
					</Route>
					<Route path="/channels">
						<HomePage />
					</Route>
					<Route path="/discover">
						<DiscoveryPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
