import React, { useState } from "react";
import * as channelActions from "../../store/serverChannels";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CreateChannelModal.css";

function CreateChannelModal(props) {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();

	const handleSubmit = async e => {
		e.preventDefault();
		if (validate()) {
			return dispatch(
				channelActions.createChannelThunk({ name, description }, props.serverId)
			)
				.then(() => {
					props.callbackClose();
					closeModal();
				})
				.catch(async res => {
					const data = await res?.json();
					const { message } = data;
					setErrors([message]);
				});
		}
	};

	const validate = () => {
		const errors = [];
		if (description === "") errors.push("Please enter your description");
		if (name === "") errors.push("Please enter your channel name");
		setErrors(errors);
		if (errors.length > 0) return false;
		else return true;
	};

	return (
		<div className="create-channel-container">
			<h1>Create Channel</h1>
			<form className="create-channel-form" onSubmit={handleSubmit}>
				<ul className="error-container">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label htmlFor="channel-name-input">Channel Name:</label>
				<input
					name="channel-name-input"
					className="channel-name-input"
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
				<label htmlFor="channel-desc-input">Channel description:</label>
				<input
					name="channel-desc-input"
					className="channel-desc-input"
					value={description}
					onChange={e => setDescription(e.target.value)}
					required
				/>
				<div className="create-channel-buttons">
					<button
						disabled={name.length < 1 || description.length < 1}
						type="submit"
					>
						Submit
					</button>
					<button onClick={() => closeModal()}>Cancel</button>
				</div>
			</form>
		</div>
	);
}

export default CreateChannelModal;
