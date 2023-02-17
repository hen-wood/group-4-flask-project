import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetServer } from "../../store/server";
import "./server.css";
export default function Server() {
	const dispatch = useDispatch();
	let server = [];
	const { serverId } = useParams();
	const serverObj = useSelector(state => {
		return state.server;
	});

	if (serverObj) {
		server = Object.values(serverObj);
		console.log(serverObj, 'asdsadadasdasdasdsadads')
	}

	useEffect(() => {
		dispatch(thunkGetServer(serverId));
	}, [dispatch, server.length, serverId, serverObj[5]]);

	if (!serverObj) {
		return <div>no servers</div>;
	}

	return serverObj && <div>{serverObj.name}</div>;
}
