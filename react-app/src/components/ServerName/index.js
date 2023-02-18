import { useEffect, useState, useRef } from "react";
import {
	deleteServerThunk,
	thunkGetServer,
	editServerThunk
} from "../../store/server";
import { thunkGetUserServers } from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteServerFromList } from "../../store/servers";
import "./ServerName.css";
export default function ServerName() {
	const server = useSelector(state => state.server);
	const user = useSelector(state => state.session.user);
	const containerRef = useRef(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const { serverId } = useParams();
	const [isLoaded, setIsLoaded] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");

	const handleClickName = () => {
		if (!isOpen) setIsOpen(true);
	};

	const handleClickX = () => {
		if (isOpen) setIsOpen(false);
	};

	const handleCopyCode = code => {
		navigator.clipboard.writeText(code);
	};

	const handleLeaveServer = async (serverId, memberId) => {
		const res = await fetch("/api/memberships/delete", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				member_id: memberId,
				server_id: serverId
			})
		});

		if (res.ok) {
			const data = await res.json();
			console.log({ data });
			dispatch(deleteServerFromList(serverId));
			history.push("/channels/@me");
		} else {
			console.log(res.status);
		}
	};

	const handleDeleteServer = () => {
		setIsLoaded(false);
		dispatch(deleteServerThunk(serverId)).then(() =>
			history.push("/channels/@me")
		);
	};

	const handleEditServer = e => {
		e.preventDefault();
		dispatch(editServerThunk(name, serverId)).then(() =>
			dispatch(thunkGetUserServers()).then(() => setIsOpen(false))
		);
	};

	useEffect(() => {
		dispatch(thunkGetServer(serverId)).then(() => {
			if (server.name) {
				setName(server.name);
			}
			setIsLoaded(true);
		});
	}, [dispatch, serverId, isOpen]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [containerRef]);

	return isLoaded ? (
		<div
			ref={containerRef}
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
						onClick={() => handleLeaveServer(serverId, user.id)}
					>
						Leave Server
					</p>
				) : (
					<>
						<p id="server-option-update">Update Server Name</p>
						<form id="edit-server-name-form" onSubmit={handleEditServer}>
							<input
								type="text"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</form>
						<p
							id="server-option"
							className="red-option"
							onClick={handleDeleteServer}
						>
							Delete Server
						</p>
					</>
				)}
			</div>
		</div>
	) : (
		<div className="serverNameContainer">
			<p id="server-options-title">Loading...</p>
		</div>
	);
}
