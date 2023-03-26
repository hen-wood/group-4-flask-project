import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetUserServers } from "../../store/servers";
import ServerButton from "../ServerButton";
import "./ServersList.css";
export default function ServersList() {
	const history = useHistory();
	const dispatch = useDispatch();
	let servers = [];
	const serversObj = useSelector(state => {
		return state.servers;
	});
	const serverObj = useSelector(state => {
		return state.server;
	});

	if (serversObj) {
		servers = Object.values(serversObj);
	}
	let serverChecker = Object.keys(serverObj);

	useEffect(() => {
		dispatch(thunkGetUserServers());
	}, [dispatch, servers.length, serverChecker.length]);

	if (!servers) {
		return <div>no servers</div>;
	}

	const handleServerClick = id => {
		history.push(`/channels/${id}`);
	};

	return (
		servers && (
			<div className="serverListContainer">
				{servers.map((server, i) =>
					server ? (
						<img
							key={i}
							className="server-nav-icon"
							src={server.icon}
							alt={server.name}
							onClick={() => handleServerClick(server.id)}
						/>
					) : (
						<div id="loading">...</div>
					)
				)}
				<ServerButton />
			</div>
		)
	);
}
