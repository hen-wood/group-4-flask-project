import {
	thunkGetDirectMessages,
	actionClearMessages
} from "../../store/directMessages";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
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
		});
		// when component unmounts, disconnect
		return () => {
			socket.disconnect();
		};
	}, [directChannelId]);

	const currMessages = useSelector(
		state => state.directMessages.directChannelMessages
	);

	return isLoaded ? (
		<div>
			{Object.keys(currMessages).map(key => {
				const message = currMessages[key];
				return (
					<div>
						<p>{message.created_at}</p>
						<p key={key}>{message.username + ": " + message.content}</p>
					</div>
				);
			})}
			{newMessages.map(message => {
				return (
					<p key={message.id}>{message.username + ": " + message.content}</p>
				);
			})}
		</div>
	) : (
		<h3>Loading Messages...</h3>
	);
}
