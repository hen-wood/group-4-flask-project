import React from "react";
import OpenModalButton from "../OpenModalButton";
import LogoutModal from "../Navigation/LogoutModal";

function LogoutButton() {
    return (
		<div className="ServerButtonIcon">
			<OpenModalButton
                buttonText={<i className="fa-solid fa-right-from-bracket ServerButtonPlus logout-button-style"></i>}
                modalComponent={<LogoutModal />}
			/>
		</div>
	);
}

export default LogoutButton;
