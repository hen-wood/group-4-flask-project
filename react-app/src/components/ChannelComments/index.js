import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	actionClearChannel,
	loadSingleChannelThunk
} from "../../store/serverChannels";
import { io } from "socket.io-client";
import ServerMembers from "../ServerMembers";

let socket;
export default function ChannelComments() {
	const { serverId, channelId } = useParams();
	const currChannel = useSelector(state => state.channels.singleChannel);
	const user = useSelector(state => state.session.user);
	const currServer = useSelector(state => state.server);
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [comments, setComments] = useState({});
	const [commentInput, setCommentInput] = useState("");

	useEffect(() => {
		dispatch(loadSingleChannelThunk(channelId)).then(() => {
			setIsLoaded(true);
		});
		return () => {
			dispatch(actionClearChannel());
			setComments({});
		};
	}, [channelId]);

	useEffect(() => {
		if (currChannel.channel_comments) {
			const commentsObj = {};
			currChannel.channel_comments.forEach(comment => {
				commentsObj[comment.id] = comment;
			});
			setComments(commentsObj);
			setIsLoaded(true);
		}
	}, [currChannel, channelId]);

	useEffect(() => {
		socket = io();
		socket.on(`${channelId} comment`, data => {
			setComments(comments => {
				return {
					...comments,
					[data.id]: data
				};
			});
			const commentDiv = document.querySelector("#center-comments");
			commentDiv.scrollTop = commentDiv.scrollHeight;
		});

		return () => {
			socket.disconnect();
		};
	}, [channelId]);

	const updateCommentInput = e => {
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

	return isLoaded ? (
		<div className="center-container">
			<div className="center-top">
				<p className="channel-name">
					{currChannel.name ? `# ${currChannel.name} ` : ""}
				</p>
				<p className="channel-desc">{currChannel.description}</p>
			</div>
			<div id="server-center">
				<div id="comments-and-comment-form-container">
					<div id="center-comments">
						{Object.keys(comments).map(key => {
							const comment = comments[key];
							return (
								<div key={key} className="message-card">
									<div className="message-card-top">
										<p className="message-card-username">{comment.username}</p>
										<p className="message-card-date">
											{new Date(comment.created_at).toLocaleString("en-US", {
												year: "numeric",
												month: "2-digit",
												day: "2-digit",
												hour: "2-digit",
												minute: "2-digit",
												hour12: true
											})}
										</p>
									</div>
									<p className="message-content">{comment.content}</p>
								</div>
							);
						})}
					</div>
					<div id="message-form-container">
						<form id="message-input" onSubmit={sendComment}>
							<input
								type="text"
								value={commentInput}
								placeholder={`Message #${currChannel.name}`}
								onChange={updateCommentInput}
							/>
						</form>
					</div>
				</div>
				<ServerMembers />
			</div>
		</div>
	) : (
		<div className="center-container">
			<div className="center-top">
				<p className="channel-name">Loading channel...</p>
				<p className="channel-desc">{currChannel.description}</p>
			</div>
			<div id="server-center">
				<div id="comments-and-comment-form-container">
					<div id="center-comments"></div>
					<div id="message-form-container">
						<form id="message-input"></form>
					</div>
				</div>
				<ServerMembers />
			</div>
		</div>
	);
}
