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
			<form className="create-channel-form" onSubmit={handleSubmit}>
				<div className="create-channel-inputs">
					<h1 className="create-channel-title">Create Channel</h1>
					{errors.length > 0 && (
						<ul className="error-container">
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
					)}
					<div className="channel-name-input-container">
						<label className="channel-modal-label" htmlFor="channel-name-input">
							CHANNEL NAME
						</label>
						<input
							name="channel-name-input"
							className="create-channel-input channel-name-input"
							placeholder="new-channel"
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
						<p className="channel-name-hash">#</p>
					</div>
					<label className="channel-modal-label" htmlFor="channel-desc-input">
						CHANNEL DESCRIPTION
					</label>
					<input
						name="channel-desc-input"
						className="create-channel-input"
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>
				</div>
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
