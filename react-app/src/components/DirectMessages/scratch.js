import {
	thunkGetDirectMessages,
	thunkUpdateDirectMessage,
	actionAddDirectMessage,
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
	const [newMessages, setNewMessages] = useState({});
	const [showOptions, setShowOptions] = useState(false);
	const [showEditor, setShowEditor] = useState(false);
	const [selectedMessageId, setSelectedMessageId] = useState(null);
	const [messageToEditId, setMessageToEditId] = useState(null);
	const [editedMessageContent, setEditedMessageContent] = useState("");
	const [messageInput, setMessageInput] = useState("");
	const currMessages = useSelector(
		state => state.directMessages.directChannelMessages
	);
	const currUser = useSelector(state => state.session.user);
	const currChannel = useSelector(
		state => state.directChannels.userDirectChannels[directChannelId]
	);
	const otherUsername =
		currChannel.user_one.id === currUser.id
			? currChannel.user_two.username
			: currChannel.user_one.username;
	useEffect(() => {
		dispatch(thunkGetDirectMessages(directChannelId)).then(() => {
			setNewMessages(currMessages);
			setIsLoaded(true);
			const messages = document.querySelector("#center-messages");
			messages.scrollTop = messages.scrollHeight;

			socket = io();

			socket.on(`${directChannelId} message`, data => {
				setNewMessages(messages => {
					return {
						...messages,
						[data.id]: {
							...messages[data.id],
							content: data.content
						}
					};
				});
				messages.scrollTop = messages.scrollHeight;
			});

			// Add a listener for the "edit message" event
			socket.on(`${directChannelId} edit message`, data => {
				setNewMessages(messages => {
					return {
						...messages,
						[data.id]: {
							...messages[data.id],
							content: data.content
						}
					};
				});
			});
		});
		return () => {
			socket.disconnect();
			dispatch(actionClearMessages());
			setNewMessages([]);
		};
	}, [dispatch, directChannelId]);
	const updateChatInput = e => {
		setMessageInput(e.target.value);
	};

	const sendMessage = e => {
		e.preventDefault();

		socket.emit(`message`, {
			direct_channel_id: +directChannelId,
			user_id: currUser.id,
			content: messageInput
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
		setEditedMessageContent(newMessages[key].content);
		setMessageToEditId(key);
		setShowEditor(true);
	};

	const handleEditSubmit = e => {
		e.preventDefault();
		// Emit a message to the server indicating that a message has been edited
		socket.emit("edit message", {
			channel_id: directChannelId,
			message_id: messageToEditId,
			content: editedMessageContent
		});
	};

	return isLoaded ? (
		<div id="center-container">
			<div id="center-top">
				<p>@{otherUsername}</p>
			</div>
			<div id="center-messages">
				{Object.keys(newMessages).map(key => {
					const message = newMessages[key];
					return (
						<div
							key={message.id}
							className="message-card"
							onMouseOver={() =>
								message.user_id === currUser.id && handleMouseOver(key)
							}
							onMouseLeave={handleMouseLeave}
						>
							<div className="message-card-top">
								{selectedMessageId === key && showOptions && (
									<div className="message-options">
										<i
											className="fa-solid fa-pencil message-option"
											onClick={() => handleEditClick(key)}
										></i>
										<i className="fa-solid fa-trash-can message-option"></i>
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
								<form onSubmit={handleEditSubmit}>
									<input
										type="text"
										value={editedMessageContent}
										onChange={e => {
											setEditedMessageContent(e.target.value);
										}}
										autoFocus
									></input>
								</form>
							) : (
								<p>{message.content}</p>
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
		<h3>Loading Messages...</h3>
	);
}
