import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkAddMembership } from "../../store/memberships";
import { thunkGetUserServers } from "../../store/servers";
import { useModal } from "../../context/Modal";
import "./joinAServer.css";

export default function JoinAServer() {
	const dispatch = useDispatch();
	const [code, setCode] = useState("");
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);

	const handleSubmit = e => {
		e.preventDefault();
		setErrors([]);
		dispatch(thunkAddMembership(code)).then(res => {
			if (res.message) {
				setErrors(e => [res.message]);
			} else {
				dispatch(thunkGetUserServers()).then(() => closeModal());
			}
		});
	};

	return (
		<div className="join-server-container">
			<i
				className="fa-solid fa-xmark close-modal-button"
				onClick={closeModal}
			></i>
			<form onSubmit={handleSubmit}>
				<div className="join-server-top">
					<div className="join-server-text">
						<h1 className="join-server-title">Join A Server</h1>
						<p className="join-server-info">
							Enter an invite below to join an existing server
						</p>
					</div>
					{errors.map(error => (
						<div className="errors-actual">{error}</div>
					))}
					<div className="code-input-div">
						<label className="code-input-label" htmlFor="code-input">
							INVITE CODE <span className="req-asterisk">*</span>
						</label>
						<input
							className="code-input"
							type="text"
							placeholder="Enter Code"
							required
							value={code}
							onChange={e => setCode(e.target.value)}
						/>
					</div>
					<p className="code-example-title">CODE SHOULD LOOK LIKE THIS</p>
					<p className="code-example">a7h34</p>
				</div>
				<div className="join-server-bottom">
					<button type="submit" className="join-server-button">
						Join server
					</button>
				</div>
			</form>
		</div>
	);
}
