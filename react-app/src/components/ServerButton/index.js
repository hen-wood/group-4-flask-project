import React from "react";
import OpenModalButton from "../OpenModalButton";
import ServerModal from "../Navigation/ServerModal";
import "./ServerButton.css";
function ServerButton() {
	return (
		<div className="ServerButtonIcon">
			<OpenModalButton
				buttonText={<i className="fa-light fa-plus ServerButtonPlus fa-2xl"></i>}
				modalComponent={<ServerModal />}
			/>
		</div>
	);
}

export default ServerButton;
