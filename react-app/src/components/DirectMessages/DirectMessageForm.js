import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
let socket;

export default function DirectMessageForm({ otherUserName }) {
	const { directChannelId } = useParams();
	const dispatch = useDispatch();
	const [messageInput, setMessageInput] = useState("");
	const user = useSelector(state => state.session.user);

	// useEffect(() => {
	// 	socket = io();
	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, [dispatch]);

	const updateChatInput = e => {
		setMessageInput(e.target.value);
	};

	const sendMessage = e => {
		e.preventDefault();

		socket.emit(`message`, {
			directChannelId,
			userId: user.id,
			content: messageInput,
			username: user.username
		});
		setMessageInput("");
	};

	return (
		<div id="message-form-container">
			{/* <form id="message-input" onSubmit={sendMessage}>
				<input
					type="text"
					value={messageInput}
					placeHolder={`Message ${otherUserName}`}
					onChange={updateChatInput}
				/>
			</form> */}
		</div>
	);
}
