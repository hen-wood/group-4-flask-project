import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createServerThunk } from "../../store/servers";
import "./createServer.css";
import { useModal } from "../../context/Modal";
export default function CreateServer() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const [serverName, setServerName] = useState(`${user.username}'s server`);
	const [category, setCategory] = useState("Gaming");
	const { closeModal } = useModal();
	const handleSubmit = async e => {
		e.preventDefault();

		const payload = {
			name: serverName,
			category
		};

		dispatch(createServerThunk(payload));
		setServerName("");
		closeModal();
	};

	return (
		<div className="createServerContainer">
			<i
				className="fa-solid fa-xmark close-modal-button"
				onClick={closeModal}
			></i>
			<div className="create-server-text-div">
				<h1 className="CreateServerHeader">Customize your server</h1>
				<p className="CreateServerDescription">
					In order to help you with your setup, select one of the options below
					after creating your server name
				</p>
			</div>
			<form className="createForm" onSubmit={handleSubmit}>
				<div className="server-name-input-div">
					<label
						className="server-name-input-label"
						htmlFor="server-name-input"
					>
						SERVER NAME
					</label>
					<input
						className="server-name-input"
						name="server-name-input"
						type="text"
						placeholder={serverName}
						required
						value={serverName}
						onChange={e => setServerName(e.target.value)}
					/>
				</div>
				<div className="categoryContainer">
					<div
						className={
							category === "Gaming"
								? "category-choice category-selected"
								: "category-choice"
						}
						onClick={() => setCategory("Gaming")}
					>
						<i className="fa-solid fa-gamepad"></i>
						<p className="category-title">Gaming</p>
					</div>
					<div
						className={
							category === "Entertainment"
								? "category-choice category-selected"
								: "category-choice"
						}
						onClick={() => setCategory("Entertainment")}
					>
						<i className="fa-solid fa-tv"></i>
						<p className="category-title">Entertainment</p>
					</div>
					<div
						className={
							category === "Artists & Creators"
								? "category-choice category-selected"
								: "category-choice"
						}
						onClick={() => setCategory("Artists & Creators")}
					>
						<i className="fa-solid fa-palette"></i>
						<p className="category-title">Artists & Creators</p>
					</div>
					<div
						className={
							category === "Education"
								? "category-choice category-selected"
								: "category-choice"
						}
						onClick={() => setCategory("Education")}
					>
						<i className="fa-solid fa-school"></i>
						<p className="category-title">Education</p>
					</div>
					<div
						className={
							category === "Science & Tech"
								? "category-choice category-selected"
								: "category-choice"
						}
						onClick={() => setCategory("Science & Tech")}
					>
						<i className="fa-solid fa-microchip"></i>
						<p className="category-title">Science & Tech</p>
					</div>
					<div
						className={
							category === "Other"
								? "category-choice category-selected"
								: "category-choice"
						}
						onClick={() => setCategory("Other")}
					>
						<i className="fa-solid fa-question"></i>
						<p className="category-title">Other</p>
					</div>
				</div>
				<div className="create-server-bottom">
					<button className="create-server-button" type="submit">
						Create
					</button>
				</div>
			</form>
		</div>
	);
}
