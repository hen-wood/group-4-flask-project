import { getChannelCommentsThunk, clearComments } from "../../store/channelComments";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import ChannelCommentForm from "../ChannelComments/ChannelCommentForm";

let socket;
export default function ChannelComments() {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [newComments, setNewComments] = useState([]);

    useEffect(() => {
        dispatch(getChannelCommentsThunk(channelId)).then(() => {
            setIsLoaded(true);
        });
        return () => {
            dispatch(clearComments());
            setNewComments([]);
        };
    }, [dispatch, channelId]);

    useEffect(() => {
        socket = io();

        socket.on(`${channelId} message`, msg => {
            setNewComments(comments => [...comments, msg]);
            const comments = document.querySelector("#center-comments");
            comments.scrollTop = comments.scrollHeight;
        });
        // when component unmounts, disconnect
        return () => {
            socket.disconnect();
        };
    }, [channelId]);

    const currComments = useSelector(
        state => state.channelComments.channelComments
    );

    // const currChannel = useSelector(
    //     state => state.channels[channelId]
    // );
    const currUser = useSelector(state => state.session.user);

    return isLoaded ? (
        <div id="center-container">
            <div id="center-top">
                <p>@{currUser.username}</p>
            </div>
            <div id="center-comments">
                {Object.keys(currComments).map(key => {
                    const comment = currComments[key];
                    return (
                        <div key={key} className="message-card">
                            <div className="message-card-top">
                                <p className="message-card-username">{comment.user_id}</p>
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
                            <p>{comment.content}</p>
                        </div>
                    );
                })}
                {newComments.map(comment => {
                    return (
                        <div key={comment.id} className="message-card">
                            <div className="message-card-top">
                                <p className="message-card-username">{comment.user_id}</p>
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
                            <p>{comment.content}</p>
                        </div>
                    );
                })}
            </div>
            <ChannelCommentForm />
        </div>
    ) : (
        <h3>Loading Comments...</h3>
    );
}
