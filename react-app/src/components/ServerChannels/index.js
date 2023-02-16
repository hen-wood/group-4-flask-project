import { useEffect, useState } from "react";
import { thunkGetServerChannels, deleteChannelThunk } from "../../store/serverChannels";
import { thunkGetServer } from "../../store/server";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditChannelModal from '../ChannelEditModal';
import CreateChannelModal from '../ChannelCreateModal';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import './serverChannel.css';

export default function ServerChannels() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const { serverId, channelId } = useParams();
	const user = useSelector((state) => state.session.user);
	const server = useSelector((state) => state.server);
	const channels = useSelector(state => state.server.channels);

	useEffect(() => {
		dispatch(thunkGetServer()).then(() => {
			console.log('hello')
			setIsLoaded(true);
		});
	}, [dispatch ]);


	const deleteChannel = (id) => {
		dispatch(deleteChannelThunk(id));
		// dispatch(thunkGetServerChannels());
	};

	const OnModalClose = () => {
		dispatch(thunkGetServerChannels(serverId));
	}

	// const currUserId = useSelector(state => state.session.user.id);
	return isLoaded ? (

		<div>
			{console.log({channels}, {serverId}, {server}, {user} )}
			<div className="server-channel-header">
				<p id="direct-message-title">Text Channels</p>
				<button className="btn-openmodal">
					<OpenModalMenuItem
						itemText={<i class="fa-solid fa-plus"></i>}
						modalComponent={<CreateChannelModal serverId={serverId} callbackClose={() => OnModalClose()} />}
					/>
				</button>
			</div>
			{Object.keys(channels).map(key => {
				const channel = channels[key];
				return (
					<div className="server-channel-list">
						<NavLink key={key} to={`/channels/${serverId}/${channel.id}`} className="channel-name">
							<span className="sidebarChannel_hash">#</span>{channel.name}
						</NavLink>
						{/* {
							console.log('aaaaaaaaa', user.id)}
						{console.log('bbbbbbbbb', server.mod_id)
						} */}
						{user?.id == server.mod_id &&
							<>
								<button className="btn-openmodal">
									<OpenModalMenuItem
										itemText={<i class="fa-solid fa-pen-to-square"></i>}
										modalComponent={<EditChannelModal channelId={channel.id} description={channel.description} name={channel.name} callbackClose={() => OnModalClose()} />}
									/>
								</button>
								<button className="btn-openmodal" onClick={() => deleteChannel(channel.id)}>
									<li><i class="fa-solid fa-trash" /></li>
								</button>
							</>
						}
					</div>
				);
			})}
		</div>
	) : (
		<>Loading</>
	)
}
