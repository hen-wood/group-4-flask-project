import DirectChannels from "../DirectChannels";
import { Switch, Route } from "react-router";
import "./HomePage.css";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
export default function HomePage() {
	return (
		<div id="main-container">
			<div id="left-container">
				<div id="left-nav-bar">
					<div id="left-nav-top">
						<DiscordanceLogo />
					</div>
					<div id="left-nav-center"></div>
					<div id="left-nav-bottom"></div>
				</div>
				<div id="left-nav-menu">
					<div id="left-menu-top">
						<h3>Users Name</h3>
					</div>
					<div id="left-menu-center">
						<h3>List of Channels or Direct Channels</h3>
						<Switch>
							<Route path="/channels/@me">
								<DirectChannels />
							</Route>
						</Switch>
					</div>
					<div id="left-menu-bottom"></div>
				</div>
			</div>
			<div id="center-container">
				<div id="center-top"></div>
				<div id="center-messages">
					<Switch>
						<Route exact path="/channels/@me">
							<h1>This would be when you first log in</h1>
							<p>
								Normally it's a list of all of your friends, but since we don't
								have a friends feature we'll have to come up with something else
							</p>
						</Route>
						<Route path="/channels/@me/:directChannelId">
							<h1>This would be the direct channel comments component</h1>
						</Route>
					</Switch>
				</div>
				<div id="center-message-form">
					<h3>
						Just A Placeholder for the send direct message/server comment form ,
						nothing to see here
					</h3>
					<form>
						{/* PLACEHOLDER FORM, WILL BE COMPONENT */}
						<input type="text" placeholder="send new message"></input>
						<button>Submit</button>
					</form>
				</div>
			</div>
			<div id="right-container">
				<h3>
					This will be the stuff on the right. Normally With DMs it's
					information about the person you're messaging
				</h3>
			</div>
		</div>
	);
}
