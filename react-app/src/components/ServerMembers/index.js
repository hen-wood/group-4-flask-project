import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ServerMembers() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [members, setMembers] = useState({});

	const server = useSelector(state => {
		return state.server;
	});

	const user = useSelector(state => state.session.user);

	const userDirectChannels = useSelector(state => {
		return state.directChannels.userDirectChannels;
	});

	useEffect(() => {
		if (server.server_members) {
			const memberObj = {};
			server.server_members.forEach(member => (memberObj[member.id] = member));
			setMembers(memberObj);
		}
	}, [server]);

	const handleDeleteUserClick = async (memberId, serverId) => {
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
			const updatedMembers = { ...members };
			delete updatedMembers[memberId];
			setMembers(updatedMembers);
		} else {
			console.log(res.status);
		}
	};

	const handleDirectMessageClick = async (memberId, userId) => {
		const existingChannels = Object.values(userDirectChannels);
		const existingChannel = existingChannels.find(
			channel =>
				channel.user_one.id === memberId || channel.user_two.id === memberId
		);
		if (existingChannel) {
			return history.push(`/channels/@me/${existingChannel.id}`);
		}
		const res = await fetch("/api/directchannels/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user_one_id: userId,
				user_two_id: memberId
			})
		});

		if (res.ok) {
			const data = await res.json();
			return history.push(`/channels/@me/${data.id}`);
		} else {
			console.log(res.status);
		}
	};

	return server.server_members ? (
		<div id="server-members">
			{Object.keys(members).map(key => {
				const member = members[key];
				return (
					<div key={key} className="member-card">
						<p>
							{member.username}
							{member.id === server.mod_id ? `👑` : ""}
						</p>
						<div className="member-options">
							{member.id !== user.id && (
								<i
									className="fa-solid fa-message"
									onClick={() => handleDirectMessageClick(member.id, user.id)}
								></i>
							)}
							{user.id === server.mod_id && member.id !== user.id && (
								<i
									className="fa-solid fa-user-slash"
									onClick={() => handleDeleteUserClick(member.id, server.id)}
								></i>
							)}
						</div>
					</div>
				);
			})}
		</div>
	) : (
		<div id="server-members">
			<div className="member-card">
				<p>Loading server members...</p>
			</div>
		</div>
	);
}
