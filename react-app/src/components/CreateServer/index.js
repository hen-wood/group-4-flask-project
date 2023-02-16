import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createServerThunk } from "../../store/servers";
import "./createServer.css";
import { useModal } from "../../context/Modal";

export default function CreateServer() {

	const dispatch = useDispatch();
	const [serverName, setServerName] = useState();
	const { closeModal } = useModal();
	const handleSubmit = async e => {
		e.preventDefault();

		const payload = {
			name: serverName
		};

		dispatch(createServerThunk(payload));
		setServerName("");
		closeModal();

	};

	return (
		<div className="createServerContainer">
			<form className="createForm" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Server Name"
					required
					value={serverName}
					onChange={e => setServerName(e.target.value)}
				/>

				<input type="submit" value="Create Server"></input>
			</form>
		</div>
	);
}
