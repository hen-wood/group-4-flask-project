import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetUserServers } from "../../store/servers";
import "./ServersList.css";
export default function ServersList() {
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

	return (
		servers && (
			<div className="serverListContainer">
				{servers.map((server, i) =>
					server ? (
						<div key={i}>
							<NavLink
								className="serverListButton"
								key={server.id}
								to={`/channels/${server.id}`}
								style={{ color: "#3b9758" }}
								activeStyle={{ color: "white" }}
							>
								{server.name[0]}
							</NavLink>
						</div>
					) : (
						<div id="loading">...</div>
					)
				)}
			</div>
		)
	);
}
