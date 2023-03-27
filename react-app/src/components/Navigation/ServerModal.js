import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import JoinAServer from "../JoinAServer";
import CreateServer from "../CreateServer";
import "./ServerModal.css";
import { useModal } from "../../context/Modal";

function ServerModal() {
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const { closeModal } = useModal();

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = e => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("submit", closeMenu);

		return () => document.removeEventListener("submit", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	return (
		<div className="serverModalContainer">
			<i
				className="fa-solid fa-xmark close-modal-button"
				onClick={closeModal}
			></i>
			<div className="ServerModalCreateServer">
				<h1 className="serverModalHeader"> Create a server</h1>
				<p className="serverModalInformation">
					Your server is where you and your friends hang out. Make yours and
					start talking
				</p>
				<OpenModalButton
					buttonText="Create My Own"
					onItemClick={closeMenu}
					modalComponent={<CreateServer />}
				/>
			</div>

			<div className="ServerModalJoinServer">
				<p className="ServerModalInviteAlready">Have an invite already?</p>
				<OpenModalButton
					buttonText="Join A Server"
					onItemClick={closeMenu}
					modalComponent={<JoinAServer />}
				/>
			</div>
		</div>
	);
}

export default ServerModal;
