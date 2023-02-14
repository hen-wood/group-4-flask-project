import {
	thunkGetDirectMessages,
	actionClearMessages
} from "../../store/directMessages";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import DirectMessageForm from "../DirectMessages/DirectMessageForm";

let socket;
export default function DirectMessages() {
	const { directChannelId } = useParams();
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [newMessages, setNewMessages] = useState([]);

	useEffect(() => {
		dispatch(thunkGetDirectMessages(directChannelId)).then(() => {
			setIsLoaded(true);
		});
		return () => {
			dispatch(actionClearMessages());
			setNewMessages([]);
		};
	}, [dispatch, directChannelId]);

	useEffect(() => {
		socket = io();

		socket.on(`${directChannelId} message`, msg => {
			setNewMessages(messages => [...messages, msg]);
			const messages = document.querySelector("#center-messages");
			messages.scrollTop = messages.scrollHeight;
		});
		// when component unmounts, disconnect
		return () => {
			socket.disconnect();
		};
	}, [directChannelId]);

	const currMessages = useSelector(
		state => state.directMessages.directChannelMessages
	);

	const currChannel = useSelector(
		state => state.directChannels.userDirectChannels[directChannelId]
	);

	const currUser = useSelector(state => state.session.user);

	const otherUsername =
		currChannel.user_one.id === currUser.id
			? currChannel.user_two.username
			: currChannel.user_one.username;

	return isLoaded ? (
		<div id="center-container">
			<div id="center-top">
				<p>@{otherUsername}</p>
			</div>
			<div id="center-messages">
				{Object.keys(currMessages).map(key => {
					const message = currMessages[key];
					return (
						<div key={key} className="message-card">
							<div className="message-card-top">
								<p className="message-card-username">{message.username}</p>
								<p className="message-card-date">
									{new Date(message.created_at).toLocaleString("en-US", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true
									})}
								</p>
							</div>
							<p>{message.content}</p>
						</div>
					);
				})}
				{newMessages.map(message => {
					return (
						<div key={message.id} className="message-card">
							<div className="message-card-top">
								<p className="message-card-username">{message.username}</p>
								<p className="message-card-date">
									{new Date(Date.now()).toLocaleString("en-US", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true
									})}
								</p>
							</div>
							<p>{message.content}</p>
						</div>
					);
				})}
			</div>
			<DirectMessageForm otherUserName={otherUsername} />
		</div>
	) : (
		<h3>Loading Messages...</h3>
	);
}
