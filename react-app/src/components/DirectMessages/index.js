import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	thunkGetUserSingleDirectChannel,
	actionClearSingleUserDirectChannel
} from "../../store/directChannels";
import { io } from "socket.io-client";

let socket;
export default function DirectMessages() {
	const { directChannelId } = useParams();
	const currChannel = useSelector(
		state => state.directChannels.singleUserDirectChannel
	);
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [messages, setMessages] = useState({});
	const [messageInput, setMessageInput] = useState("");
	const [otherUsername, setOtherUsername] = useState("");

	const [selectedMessageId, setSelectedMessageId] = useState(null);
	const [showOptions, setShowOptions] = useState(false);
	const [showEditor, setShowEditor] = useState(false);
	const [messageToEditId, setMessageToEditId] = useState(null);
	const [editedMessageContent, setEditedMessageContent] = useState("");

	useEffect(() => {
		dispatch(thunkGetUserSingleDirectChannel(directChannelId)).then(() => {
			setIsLoaded(true);
			const messagesDiv = document.querySelector("#center-messages");
			messagesDiv.scrollTop = messagesDiv.scrollHeight;
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

	useEffect(() => {
		socket = io();
		socket.on(`${directChannelId} message`, data => {
			setMessages(messages => {
				return {
					...messages,
					[data.id]: data
				};
			});
			const messagesDiv = document.querySelector("#center-messages");
			messagesDiv.scrollTop = messagesDiv.scrollHeight;
		});
		socket.on(`${directChannelId} edit message`, data => {
			data.edited = true;
			setMessages(messages => {
				return {
					...messages,
					[data.id]: data
				};
			});
		});

		socket.on(`${directChannelId} delete message`, data => {
			setMessages(messages => {
				const messagesCopy = { ...messages };
				delete messagesCopy[data.message_id];
				return messagesCopy;
			});
		});

		return () => {
			socket.disconnect();
		};
	}, []);

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

	const handleMouseOver = key => {
		setSelectedMessageId(key);
		setShowOptions(true);
	};
	const handleMouseLeave = () => {
		setSelectedMessageId(null);
		setShowOptions(false);
	};
	const handleEditClick = key => {
		setEditedMessageContent(messages[key].content);
		setMessageToEditId(key);
		setShowEditor(true);
	};

	const handleEditSubmit = (e, messageId) => {
		e.preventDefault();
		socket.emit("edit message", {
			channel_id: directChannelId,
			message_id: messageId,
			content: editedMessageContent
		});
		setShowEditor(false);
	};

	const handleDeleteSubmit = (e, messageId) => {
		e.preventDefault();
		socket.emit("delete message", {
			channel_id: directChannelId,
			message_id: messageId
		});
		setShowEditor(false);
	};

	return isLoaded ? (
		<div id="center-container">
			<div id="center-top">
				<p>@{otherUsername}</p>
			</div>
			<div id="center-messages">
				<div className="message-card">
					<div className="message-card-top">
						<p className="message-card-username">{`Say hello to ${otherUsername}!`}</p>
					</div>
					<div className="message-content-container"></div>
				</div>
				{Object.keys(messages).map(key => {
					const message = messages[key];
					return (
						<div
							key={key}
							className="message-card"
							onMouseOver={() => handleMouseOver(key)}
							onMouseLeave={handleMouseLeave}
						>
							<div className="message-card-top">
								{selectedMessageId === key &&
									message.username === user.username &&
									showOptions && (
										<div className="message-options">
											<i
												className="fa-solid fa-pencil message-option"
												onClick={() => handleEditClick(key)}
											></i>
											<i
												className="fa-solid fa-trash-can message-option"
												onClick={e => handleDeleteSubmit(e, key)}
											></i>
										</div>
									)}
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
							{messageToEditId === key && showEditor ? (
								<form onSubmit={e => handleEditSubmit(e, message.id)}>
									<input
										id="message-edit-input"
										type="text"
										value={editedMessageContent}
										onChange={e => {
											setEditedMessageContent(e.target.value);
										}}
										autoFocus
									></input>
								</form>
							) : (
								<div className="message-content-container">
									<p className="message-content">{message.content}</p>
									{message.edited && <p className="edited-tag">{"(edited)"}</p>}
								</div>
							)}
						</div>
					);
				})}
			</div>
			<div id="message-form-container">
				<form id="message-input" onSubmit={sendMessage}>
					<input
						type="text"
						value={messageInput}
						placeholder={`Message ${otherUsername}`}
						onChange={updateChatInput}
					/>
				</form>
			</div>
		</div>
	) : (
		<div id="center-container">
			<div id="center-top">
				<p>Loading...</p>
			</div>
			<div id="center-messages"></div>
		</div>
	);
}
