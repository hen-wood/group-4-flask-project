import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ServerMembers() {
	const dispatch = useDispatch();
	let server = [];
	let members = [];
	const serverObj = useSelector(state => {
		return state.server;
	});

	if (serverObj) {
		server = Object.values(serverObj);
		members = Object.values(serverObj);
	}

	useEffect(() => {}, [dispatch, members.length]);

	if (!server) {
		return <div>no server memberss</div>;
	}

	return server[5] ? (
		<div id="server-members">
			{server[5].map(member =>
				member ? <div>{member.username}</div> : <div>no members</div>
			)}
		</div>
	) : (
		<div>loading members</div>
	);
}
