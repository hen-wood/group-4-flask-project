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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkGetUserDirectChannels } from "../../store/directChannels";

export default function HomePage() {
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(thunkGetUserDirectChannels()).then(() => setIsLoaded(true));
	}, [dispatch]);
	return isLoaded ? (
		<div id="main-container">
			<div id="left-container">
				<div id="left-nav-bar">
					<div id="left-nav-top">
						<DiscordanceLogo />
					</div>
					<div id="left-nav-center"></div>
					<ServersList />
					<CreateServer />
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
					<h1>This would be when you first log in</h1>
					<p>
						Normally it's a list of all of your friends, but since we don't have
						a friends feature we'll have to come up with something else
					</p>
				</Route>
				<Route path="/channels/@me/:directChannelId">
					<DirectMessages />
				</Route>
				<Route path="/channels/:serverId/:channelId">
					<ChannelComments />
				</Route>
			</Switch>
		</div>
	) : (
		<h1>loading...</h1>
	);
}
