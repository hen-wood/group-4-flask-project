import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
let socket;

export default function ChannelCommentForm() {
	const { channelId } = useParams();
	const dispatch = useDispatch();
	const [commentInput, setCommentInput] = useState("");
	const user = useSelector(state => state.session.user);

	useEffect(() => {
		socket = io();
		return () => {
			socket.disconnect();
		};
	}, [dispatch]);

	const updateChannelInput = e => {
		setCommentInput(e.target.value);
	};

	const sendComment = e => {
		e.preventDefault();

		socket.emit(`comment`, {
			channelId,
			userId: user.id,
			content: commentInput,
			username: user.username
		});
		setCommentInput("");
	};

	return (
		<div id="message-form-container">
			<form id="message-input" onSubmit={sendComment}>
				<input
					type="text"
					value={commentInput}
					placeholder={`Leave your comment`}
					onChange={updateChannelInput}
				/>
			</form>
		</div>
	);
}
