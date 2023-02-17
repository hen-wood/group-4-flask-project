import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ServerMembers() {
	const server = useSelector(state => {
		return state.server;
	});

	return (
		<div id="server-members">
			{server.server_members.map(member => (
				<div className="member-card">
					<p>
						{member.username}
						{member.id === server.mod_id ? `👑` : ""}
					</p>
				</div>
			))}
		</div>
	);
}
