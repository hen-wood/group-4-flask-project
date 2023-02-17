import React from "react";

import { leaveServerThunk } from "../../store/memberships";
import { useHistory } from "react-router-dom";
import { thunkGetUserServers } from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";
import { deleteServerFromList } from "../../store/servers";
import "./LeaveAServer.css";
export default function LeaveAServer() {
	const history = useHistory();
	const dispatch = useDispatch();
	const server = useSelector(state => state.server);

	const handleSubmit = async e => {
		e.preventDefault();
		let serverId = server.id;
		dispatch(leaveServerThunk(server.id));
		dispatch(deleteServerFromList(serverId));
		history.push("/channels/@me");
	};

	return (
		<div className="leaveAServerContainer">
			<form onSubmit={handleSubmit}>
				<input
					type="submit"
					className="LeaveAServerButton"
					value="Leave server"
				></input>
			</form>
		</div>
	);
}
