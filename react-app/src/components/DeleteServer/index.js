import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteServerThunk } from "../../store/server";
import { deleteServerFromList } from "../../store/servers";
import { useHistory } from "react-router-dom";
import "./deleteServer.css";

export default function DeleteServer() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { serverId } = useParams();
	const serverObj = useSelector(state => state.server);
	const user = useSelector(state => state.session.user)

	const userId = user.id
	if (!serverObj) {
		return null;
	}
	if(userId != serverObj.mod_id){
		return null;
	}


	const handleSubmit = async e => {
		e.preventDefault();
		dispatch(deleteServerFromList(serverId));
		dispatch(deleteServerThunk(serverId));
		history.push("/channels/@me");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="submit" value="Delete Server" />
			</form>
		</div>
	);
}
