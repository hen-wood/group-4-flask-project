import React from "react";
import OpenModalButton from "../OpenModalButton";
import ServerModal from "../Navigation/ServerModal";
import "./ServerModal.css";
function ServerButton() {
	return (
		<div className="ServerButtonIcon">
			<OpenModalButton
				buttonText={<i className="fa-light fa-plus ServerButtonIcon"></i>}
				modalComponent={<ServerModal />}
			/>
		</div>
	);
}

export default ServerButton;
