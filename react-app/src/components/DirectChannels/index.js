import { useEffect, useState } from "react";
import { thunkGetUserDirectChannels } from "../../store/directChannels";
import { useDispatch, useSelector } from "react-redux";

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
			<ul>
				{Object.keys(directChannels).map(key => {
					const channel = directChannels[key];
					const title =
						channel.user_one.id === currUserId
							? channel.user_two.username
							: channel.user_one.username;
					console.log(title);
					return <li key={key}>{title}</li>;
				})}
			</ul>
		</div>
	) : (
		<h1>Loading user direct channels...</h1>
	);
}
