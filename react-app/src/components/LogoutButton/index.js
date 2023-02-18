import React, { useState, useRef, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import LogoutModal from "../Navigation/LogoutModal";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

function LogoutButton() {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [containerRef]);

	const handleLogOut = () => {
		return dispatch(logout(history));
	};

	return (
		<div ref={containerRef} id="logout-button-container">
			<div className="ServerButtonIcon">
				<button onClick={() => setIsOpen(!isOpen)}>
					<i className="fa-solid fa-right-from-bracket ServerButtonPlus logout-button-style"></i>
				</button>
			</div>
			<div className={isOpen ? "logout-popout" : "logout-popout-hidden"}>
				<p onClick={handleLogOut}>Log out?</p>
			</div>
		</div>
	);
}

export default LogoutButton;
