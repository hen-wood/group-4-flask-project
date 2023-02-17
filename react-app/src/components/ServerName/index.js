import { useEffect, useState } from "react";
import { thunkGetServer } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import LeaveAServer from "../LeaveAServer";
import { leaveServerThunk } from "../../store/memberships";
import { deleteServerFromList } from "../../store/servers";
import "./ServerName.css";
export default function ServerName() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { serverId } = useParams();
	const [isLoaded, setIsLoaded] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const handleClickName = () => {
		if (!isOpen) setIsOpen(true);
	};

	const handleClickX = () => {
		if (isOpen) setIsOpen(false);
	};

	const handleCopyCode = code => {
		navigator.clipboard.writeText(code);
	};

	const handleLeaveServer = serverId => {
		dispatch(leaveServerThunk(serverId)).then(() => {
			dispatch(deleteServerFromList(serverId)).then(() => {
				history.push("/channels/@me");
			});
		});
	};

	useEffect(() => {
		dispatch(thunkGetServer(serverId)).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch, serverId, serversObj[serverId]]);

	const server = useSelector(state => state.server);
	const user = useSelector(state => state.session.user);

	return isLoaded ? (
		<div
			className={isOpen ? "serverNameOpen" : "serverNameContainer"}
			onClick={handleClickName}
		>
			<p id="server-options-title">{server.name}</p>
			{isOpen ? (
				<i
					className="fa-solid fa-xmark"
					id="server-options-icon"
					onClick={handleClickX}
				></i>
			) : (
				<i className="fa-solid fa-chevron-down" id="server-options-icon"></i>
			)}
			<div id="server-options-modal" className={isOpen ? "" : "hidden"}>
				<p
					id="server-option"
					className="blue-option"
					onClick={() => handleCopyCode(server.code)}
				>
					{`Server Code: ${server.code} 🔗`}
				</p>
				<div id="separator"></div>
				{server.mod_id !== user.id ? (
					<p
						id="server-option"
						className="red-option"
						onClick={handleLeaveServer}
					>
						Leave Server
					</p>
				) : (
					<p id="server-option" className="red-option">
						Delete Server
					</p>
				)}
			</div>
		</div>
	) : (
		<div className="serverNameContainer">
			<p id="server-options-title">Loading...</p>
		</div>
	);
}
