import { useEffect, useState } from "react";
import { thunkGetUserDirectChannels } from "../../store/directChannels";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function DirectChannels() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(thunkGetUserDirectChannels()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	const directChannels = useSelector(
		state => state.directChannels.userDirectChannels
	);

	const currUserId = useSelector(state => state.session.user.id);
	return isLoaded ? (
		<div>
			<p id="direct-message-title">Direct Messages</p>
			{Object.keys(directChannels).map(key => {
				const channel = directChannels[key];
				const title =
					channel.user_one.id === currUserId
						? channel.user_two.username
						: channel.user_one.username;
				console.log(title);
				return (
					<div>
						<NavLink key={key} to={`/channels/@me/${channel.id}`}>
							{title}
						</NavLink>
					</div>
				);
			})}
		</div>
	) : (
		<h1>Loading user direct channels...</h1>
	);
}
