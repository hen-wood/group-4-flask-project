import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	thunkGetUserSingleDirectChannel,
	actionClearSingleUserDirectChannel
} from "../../store/directChannels";

export default function DirectMessages() {
	const { directChannelId } = useParams();
	const currChannel = useSelector(
		state => state.directChannels.singleUserDirectChannel
	);
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [messages, setMessages] = useState({});
	const [otherUsername, setOtherUsername] = useState("");

	useEffect(() => {
		dispatch(thunkGetUserSingleDirectChannel(directChannelId)).then(() => {
			setIsLoaded(true);
		});
		return () => {
			dispatch(actionClearSingleUserDirectChannel);
			setMessages({});
		};
	}, [directChannelId]);

	useEffect(() => {
		if (currChannel) {
			setMessages(currChannel.messages);
			setOtherUsername(
				currChannel.user_one.id === user.id
					? currChannel.user_two.username
					: currChannel.user_one.username
			);
			setIsLoaded(true);
		}
	}, [currChannel]);

	return isLoaded ? (
		<div id="center-container">
			<div id="center-top">
				<p>@{otherUsername}</p>
			</div>
			{Object.keys(messages).map(key => {
				const message = messages[key];
				return <p key={key}>{message.content}</p>;
			})}
		</div>
	) : (
		<h3>Loading Messages...</h3>
	);
}
