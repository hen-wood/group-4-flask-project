import { useEffect, useState } from "react";
import { thunkGetServerChannels } from "../../store/serverChannels";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

export default function ServerChannels() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
    const {serverId} = useParams();
    console.log(serverId)
	useEffect(() => {
		dispatch(thunkGetServerChannels(serverId)).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch, serverId]);

	const channels = useSelector(
		state => state.channels
	);
    console.log(channels, 'in channels here')

	// const currUserId = useSelector(state => state.session.user.id);
	return isLoaded ? (
		<div>
     
			<p id="direct-message-title">Channels</p>
			{Object.keys(channels).map(key => {
				const channel = channels[key];
				console.log(channel);
				return (
					<div>
						<NavLink key={key} to={`/channels/${serverId}/${channel.id}`}>
							{channel.name}
						</NavLink>
					</div>
				);
			})}
		</div>
	) : (
		<h1>Loading user direct channels...</h1>
	);
}
