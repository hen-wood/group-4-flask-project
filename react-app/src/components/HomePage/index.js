import DirectChannels from "../DirectChannels";
import { Switch, Route } from "react-router";
import "./HomePage.css";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
import DirectMessages from "../DirectMessages";
import ChannelComments from "../ChannelComments";
import ServersList from "../ServersList";
import ServerChannels from "../ServerChannels";
import ServerName from "../ServerName";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserDirectChannels } from "../../store/directChannels";
import { useHistory } from "react-router";
import ServerButton from "../ServerButton";
import UpdateAServerName from "../UpdateAServerName";
import LogoutButton from "../LogoutButton";

import ServerMembers from "../ServerMembers";
import ServerWelcome from "../ServerWelcome";

export default function HomePage() {
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkGetUserDirectChannels()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const handleDirectMessageIconClick = () => {
		history.push("/channels/@me");
	};

	const user = useSelector(state => state.session.user);
	return isLoaded ? (
		<div id="main-container">
			<div id="left-container">
				<div id="left-nav-bar">
					<div id="left-nav-top">
						<div
							className="serverListButton"
							id="direct-message-button"
							onClick={handleDirectMessageIconClick}
						>
							<DiscordanceLogo />
						</div>
					</div>
					<div id="left-nav-center">
						<ServersList />
					</div>
					<div id="IDENTIFIER">
						<ServerButton />
					</div>

					<div id="left-nav-bottom">
						<LogoutButton />
					</div>
				</div>
				<div id="left-menu">
					<div id="left-menu-top">
						<Switch>
							<Route path="/channels/@me"></Route>
							<Route path="/channels/:serverId">
								<ServerName />
							</Route>
						</Switch>
					</div>
					<div id="left-menu-center">
						<Switch>
							<Route path="/channels/@me">
								<DirectChannels />
							</Route>
							<Route path="/channels/:serverId/:channelId">
								<ServerChannels />
							</Route>
							<Route path="/channels/:serverId">
								<ServerChannels />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
			<Switch>
				<Route exact path="/channels/@me">
					<div id="center-container">
						<div id="center-top"></div>
						<div id="center-messages">
							<div id="welcome-message">
								<h1 id="welcome-message-text">{`Welcome ${user.username}!`}</h1>
							</div>
						</div>
					</div>
				</Route>
				<Route exact path="/channels/:serverId">
					<ServerWelcome />
				</Route>
				<Route path="/channels/@me/:directChannelId">
					<DirectMessages />
				</Route>
				{/* <Route path="/channels/:serverId">
				<ServerMembers />
				</Route> */}

				<Route path="/channels/:serverId/:channelId">
					<ChannelComments />
				</Route>
			</Switch>
		</div>
	) : (
		<div id="main-container">
			<div id="main-loading-container">
				<h1 id="main-loading-text">Loading...</h1>
			</div>
		</div>
	);
}
