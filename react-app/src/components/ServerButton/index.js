import React from "react";
import OpenModalButton from "../OpenModalButton";
import ServerModal from "../Navigation/ServerModal";
import "./ServerButton.css";
function ServerButton() {
	return (
		<div className="serverListButton">
			<OpenModalButton
				buttonText={<i className="fa-light fa-plus"></i>}
				modalComponent={<ServerModal />}
			/>
		</div>
	);
}

export default ServerButton;
