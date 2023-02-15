import { useEffect, useState } from "react";
import { thunkGetServerChannels, deleteChannelThunk } from "../../store/serverChannels";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditChannelModal from '../ChannelEditModal';
import CreateChannelModal from '../ChannelCreateModal';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";

export default function ServerChannels() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const { serverId, channelId } = useParams();

	useEffect(() => {
		dispatch(thunkGetServerChannels(serverId)).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch, serverId]);

	const channels = useSelector(state => state.channels);

	const createChannel = (e) => {
		e.preventDefault();
		history.push(`/channels/${serverId}/new`);
		//refresh
		dispatch(thunkGetServerChannels(channelId));
	};

	const editChannel = (e) => {
		e.preventDefault();
		history.push(`/channels/${serverId}/${channelId}/edit`);
		//refresh
		dispatch(thunkGetServerChannels(channelId));
	};

	const deleteChannel = () => {
		dispatch(deleteChannelThunk(channelId));
		//refresh
		dispatch(thunkGetServerChannels());
		// history.push(`/channels/`);
	};

	const OnModalClose = () => {
		dispatch(thunkGetServerChannels(serverId));
	}

	// const currUserId = useSelector(state => state.session.user.id);
	return isLoaded ? (
		<div>
			<p id="direct-message-title">Text Channels</p>
			<button onClick={(e) => createChannel(e)}>
				<OpenModalMenuItem
					itemText="Create Channel"
					modalComponent={<CreateChannelModal serverId={serverId} callbackClose={() => OnModalClose()} />}
				/>
			</button>
			{Object.keys(channels).map(key => {
				const channel = channels[key];
				return (
					<div>
						<NavLink key={key} to={`/channels/${serverId}/${channel.id}`}>
							{channel.name}
						</NavLink>
						<button onClick={(e) => editChannel(e)}>
							<OpenModalMenuItem
								itemText="Edit"
								// onItemClick={}
								modalComponent={<EditChannelModal channelId={channel.id} description={channel.description} name={channel.name} serverId={ channel.server_id} callbackClose={() => OnModalClose()} />}
							/>
						</button>
						<button onClick={(e) => deleteChannel(e)} >Delete</button>
					</div>
				);
			})}
		</div>
	) : (
			<>Loading</>
	)
}
