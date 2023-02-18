import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import 	{ useHistory} from "react-router-dom"
import { createServerThunk } from "../../store/servers";
import "./createServer.css";
import { useModal } from "../../context/Modal";

export default function CreateServer() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [serverName, setServerName] = useState();
	const { closeModal } = useModal();
	const handleSubmit = async e => {
		e.preventDefault();

		const payload = {
			name: serverName
		};

		dispatch(createServerThunk(payload)).then((data) => history.push(`/channels/${data.id}`));
		setServerName("");
		closeModal();

		history.push(`/channels/`)
	};

	return (
		<div className="createServerContainer">
			<div className="createServerHeader">
				Tell us more about your server
				</div>
				<div className="createServerInformation">
					but make sure to just say it out loud because there is no field here other than what you want to call the server
				</div>
			<form className="createForm" onSubmit={handleSubmit}>
				<label className="serverNameLabel">
				Server Name
				<input
				className="createServerInput"
					type="text"
					required
					value={serverName}
					onChange={e => setServerName(e.target.value)}
					/>
					</label>
<div className="createServerButtonContainer">

				<input type="submit" className="createServerButton" value="Create"></input>
</div>
			</form>
		</div>
	);
}
