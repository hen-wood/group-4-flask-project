import { useEffect, useState } from "react";
import { thunkGetServer } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

export default function ServerName() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const { serverId } = useParams();
	useEffect(() => {
		dispatch(thunkGetServer(serverId)).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch, serverId]);

	const server = useSelector(state => state.server);

	return isLoaded ? (
		<p>{server.name}</p>
	) : (
		<h1>Loading user direct channels...</h1>
	);
}
