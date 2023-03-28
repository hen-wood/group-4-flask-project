import { useEffect, useState } from "react";
import { deleteChannelThunk } from "../../store/serverChannels";
import { thunkGetServer } from "../../store/server";
import EditChannelModal from "../ChannelEditModal";
import CreateChannelModal from "../ChannelCreateModal";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import "./serverChannel.css";
import OpenModalButton from "../OpenModalButton";

export default function ServerChannels() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const [channels, setChannels] = useState({});
	const { serverId } = useParams();
	const user = useSelector(state => state.session.user);
	const server = useSelector(state => state.server);
	const channelArr = useSelector(state => state.server.channels);

	useEffect(() => {
		dispatch(thunkGetServer(serverId)).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch, serverId]);

	useEffect(() => {
		if (channelArr) {
			const channelsObj = {};
			channelArr.forEach(channel => {
				channelsObj[channel.id] = channel;
			});
			setChannels(channelsObj);
		}
	}, [channelArr]);

	const deleteChannel = id => {
		setIsLoaded(false);
		dispatch(deleteChannelThunk(id));
		dispatch(thunkGetServer(serverId)).then(() => {
			history.push(`/channels/${serverId}`);
			setIsLoaded(true);
		});
	};

	const OnModalClose = () => {
		setIsLoaded(false);
		dispatch(thunkGetServer(serverId)).then(() => {
			setIsLoaded(true);
		});
	};

	return isLoaded ? (
		<div>
			<div className="server-channel-header">
				<p id="direct-message-title">Text Channels</p>
				{user?.id === server.mod_id && (
					<div className="channel-custom-action-button-container">
						<OpenModalButton
							buttonText={<i className="fa-solid fa-plus"></i>}
							modalComponent={
								<CreateChannelModal
									serverId={serverId}
									callbackClose={() => OnModalClose()}
								/>
							}
						/>
					</div>
				)}
			</div>
			{Object.keys(channels).map(key => {
				const channel = channels[key];
				return (
					<div className="server-channel-list" key={key}>
						<NavLink
							key={key}
							to={`/channels/${serverId}/${channel.id}`}
							className="channel-name"
						>
							<span className="sidebarChannel_hash">#</span>
							{channel.name}
						</NavLink>
						{user?.id === server.mod_id && (
							<>
								<div className="channel-custom-action-button-container">
									<OpenModalButton
										buttonText={<i className="fa-solid fa-pen-to-square"></i>}
										modalComponent={
											<EditChannelModal
												channelId={channel.id}
												description={channel.description}
												name={channel.name}
												callbackClose={() => OnModalClose()}
											/>
										}
									/>
								</div>
								<button
									className="btn-openmodal"
									onClick={() => deleteChannel(channel.id)}
								>
									<i className="fa-solid fa-trash" />
								</button>
							</>
						)}
					</div>
				);
			})}
		</div>
	) : (
		<div>
			<div className="server-channel-header"></div>
			<div className="server-channel-list">
				<h1 className="loading-text">Loading</h1>
			</div>
		</div>
	);
}
