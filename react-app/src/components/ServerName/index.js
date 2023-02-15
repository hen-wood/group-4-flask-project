import { useEffect, useState } from "react";
import { thunkGetServer } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import LeaveAServer from "../LeaveAServer"

export default function ServerName() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);



	const [showText, setShowText] = useState(false)
	const handleMouseEnter = e => {
		e.target.style.background = "grey"
		setShowText(true)
	  }
	  const handleMouseLeave = e => {
		e.target.style.background =  "#202225";
		setShowText(false)
	  }





    const {serverId} = useParams();

	useEffect(() => {
		dispatch(thunkGetServer(serverId)).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch, serverId]);


	const server = useSelector(
		state => state.server
	);



	return isLoaded ? (

		<div>


		<div    onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>

        {server.name}
		{showText && <p className="message">Server Code: {server.code} </p> }

		</div>
		<LeaveAServer />
				</div>

	) : (
		<h1>Loading user direct channels...</h1>
	);
}
