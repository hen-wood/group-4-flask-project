import { thunkGetDirectMessages } from "../../store/directMessages";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export default function DirectMessages() {
	const { directChannelId } = useParams();
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		console.log(directChannelId);
		dispatch(thunkGetDirectMessages(directChannelId)).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	const messages = useSelector(
		state => state.directMessages.directChannelMessages
	);

	return isLoaded ? (
		<div>
			{Object.keys(messages).map(key => {
				const message = messages[key];
				return <p key={key}>{message.content}</p>;
			})}
		</div>
	) : (
		<h3>Loading Messages...</h3>
	);
}
