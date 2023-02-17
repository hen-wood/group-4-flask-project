import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import JoinAServer from "../JoinAServer";
import CreateServer from "../CreateServer";
import "./ServerModal.css";

function ServerModal() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

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

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<div className="serverModalContainer">
			<h1 className="serverModalHeader"> Create a server</h1>
			<p className="serverModalInformation">
				Your server is where you and your friends hang out. Make yours and start
				talking
			</p>

			<div className="ServerModalCreateServer">
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
