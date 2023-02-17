import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editServerThunk } from "../../store/server";
import { useHistory } from "react-router-dom";
import "./UpdateServer.css";
import { thunkGetUserServers } from "../../store/servers";
export default function UpdateAServerName() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { serverId } = useParams();
	const serverObj = useSelector(state => state.server);
	const user = useSelector(state => state.session.user);
	const [name, setName] = useState(serverObj.name);
	const userId = user.id;
	if (!serverObj) {
		return null;
	}

	if (userId != serverObj.mod_id) {
		return null;
	}

	const handleSubmit = e => {
		e.preventDefault();
		const payload = {
			name
		};
		dispatch(editServerThunk(payload, serverId)).then(() =>
			dispatch(thunkGetUserServers()).then(() =>
				history.push(`/channels/${serverId}`)
			)
		);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder={name}
					required
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input type="submit" value="Update Server Name" />
			</form>
		</div>
	);
}
