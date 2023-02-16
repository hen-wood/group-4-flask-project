import DirectChannels from "../DirectChannels";
import { Switch, Route } from "react-router";
import "./HomePage.css";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
import DirectMessages from "../DirectMessages";
import ChannelComments from "../ChannelComments";
import ServersList from "../ServersList";
import ServerChannels from "../ServerChannels";
import ServerName from "../ServerName";
import CreateServer from "../CreateServer";
import DeleteServer from "../DeleteServer";
import ServerMembers from "../ServerMembers";
import JoinAServer from "../JoinAServer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkGetUserDirectChannels } from "../../store/directChannels";
import { useHistory } from "react-router";

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

	return isLoaded ? (
		<div id="main-container">
			<div id="left-container">
				<div id="left-nav-bar">
					<div id="left-nav-top">
						<div onClick={handleDirectMessageIconClick}>
							<DiscordanceLogo />
						</div>
					</div>
					<div id="left-nav-center">
						<ServersList />
					</div>

					<CreateServer />
					<JoinAServer />

					<div id="left-nav-bottom"></div>
				</div>
				<div id="left-menu">
					<div id="left-menu-top">
						<Switch>
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
							<Route path="/channels/:serverId">
								<ServerChannels />
								<DeleteServer />
							</Route>
						</Switch>
					</div>
				</div>
			</div>
			<Switch>
				<Route exact path="/channels/@me">
					<div id="center-container">
						<div id="center-top"></div>
					</div>
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
