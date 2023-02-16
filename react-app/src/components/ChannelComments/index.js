import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChannelCommentsThunk, clearComments } from "../../store/channelComments";
import { io } from "socket.io-client";
// import ChannelCommentForm from "../ChannelComments/ChannelCommentForm";

let socket;
export default function ChannelComments() {
    const { channelId } = useParams();
    const currChannel = useSelector(
		state => state.channels[channelId]
    );
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [newComments, setNewComments] = useState({});
    const [commentInput, setCommentInput] = useState("");

    const [selectedCommmentId, setSelectedCommentId] = useState(null);
	const [showOptions, setShowOptions] = useState(false);
	const [showEditor, setShowEditor] = useState(false);
	const [commentToEditId, setCommentToEditId] = useState(null);
	const [editedCommentContent, setEditedCommentContent] = useState("");

    useEffect(() => {
        dispatch(getChannelCommentsThunk(channelId)).then(() => {
            setIsLoaded(true);
            const commentDiv = document.querySelector("#center-comments");
            commentDiv.scrollTop = commentDiv.scrollHeight;
        });
        return () => {
            dispatch(clearComments);
            setNewComments({});
        };
    }, [channelId]);

    useEffect(() => {
        if (currChannel) {
            //setNewComments(currChannel.newComments);
            setIsLoaded(true);
        }
    }, [currChannel]);


    useEffect(() => {
        socket = io();
        socket.on(`${channelId} comment`, data => {
            setNewComments(comments => {
                return {
                    ...comments,
                    [data.id]: data
                }
            });
            const commentDiv = document.querySelector("#center-comments");
            commentDiv.scrollTop = commentDiv.scrollHeight;
        });
        socket.on(`${channelId} edit comment`, data => {
			data.edited = true;
			setNewComments(comments => {
				return {
					...comments,
					[data.id]: data
				};
			});
		});

        socket.on(`${channelId} delete comment`, data => {
			setNewComments(comments => {
				const commentsCopy = { ...comments };
				delete commentsCopy[data.comment_id];
				return commentsCopy;
			});
		});
        return () => {
            socket.disconnect();
        };
    }, []);

    const updateCommentInput = e => {
        setCommentInput(e.target.value);
    }

    const sendComment = e => {
        e.preventDefault();
        socket.emit(`comment`, {
			channelId,
			userId: user.id,
			content: commentInput,
			username: user.username
		});
		setCommentInput("");
    }

    const currComments = useSelector(
        state => state.channelComments
    );

    const handleMouseOver = key => {
		setSelectedCommentId(key);
		setShowOptions(true);
	};
	const handleMouseLeave = () => {
		setSelectedCommentId(null);
		setShowOptions(false);
	};
	const handleEditClick = key => {
		// setEditedCommentContent(comments[key].content);
		setCommentToEditId(key);
		setShowEditor(true);
	};

	const handleEditSubmit = (e, commentId) => {
		e.preventDefault();
		socket.emit("edit comment", {
			channel_id: channelId,
			comment_id: commentId,
			content: editedCommentContent
		});
		setShowEditor(false);
	};

	const handleDeleteSubmit = (e, commentId) => {
		e.preventDefault();
		socket.emit("delete comment", {
			channel_id: channelId,
			comment_id: commentId
		});
		setShowEditor(false);
	};

console.log("newComments", newComments)
    return isLoaded ? (
        <div className="center-container">
            <div className="center-top">
                <p className="channel-name"># {currChannel?.name}</p>
                <p className="channel-desc">{currChannel?.description}</p>
            </div>
            <div id="center-comments">
                {Object.keys(newComments).map(key => {
                    const comment = newComments[key];
                    return (
                        <div
                            key={key}
                            className="message-card">
                            <div className="message-card-top">
                            {selectedCommmentId === key &&
									comment.username === user.username &&
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
                                    {comment.edited && `   (edited)`}
                                </p>
                            </div>
                            {commentToEditId === key && showEditor ? (
								<form onSubmit={e => handleEditSubmit(e, comment.id)}>
									<input
										type="text"
										value={editedCommentContent}
										onChange={e => {
											setEditedCommentContent(e.target.value);
										}}
										autoFocus
									></input>
								</form>
							) : (
								<p>{comment.content}</p>
							)}
                        </div>
                    );
                })}


            </div>
            <div id="comment-form-container">
				<form id="comment-input" onSubmit={sendComment}>
					<input
						type="text"
						value={commentInput}
						placeHolder={`Comment ....`}
						onChange={updateCommentInput}
					/>
				</form>
			</div>
        </div>
    ) : (
        <h3>Loading Comments...</h3>
    );
}
