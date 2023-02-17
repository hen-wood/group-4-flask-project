import { useSelector } from "react-redux";
import ServerMembers from "../ServerMembers";

export default function ServerWelcome() {
	const server = useSelector(state => state.server);
	return (
		<div className="center-container">
			<div className="center-top"></div>
			<div id="server-center">
				<div id="comments-and-comment-form-container">
					<div id="center-comments">
						<div id="welcome-message">
							<h1 id="welcome-message-text">{`Welcome to ${server.name}!`}</h1>
						</div>
					</div>
				</div>
				<ServerMembers />
			</div>
		</div>
	);
}
