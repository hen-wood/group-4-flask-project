import { useEffect, useState } from "react";
import { thunkGetServer } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import LeaveAServer from "../LeaveAServer"
import './ServerName.css'
export default function ServerName() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [isOpen, setIsOpen] = useState(false);



	const [showText, setShowText] = useState(false)
	const handleMouseEnter = e => {
		if(isOpen){

			setShowText(false)
			setIsOpen(false)
		}
		else {

			setShowText(true)
			setIsOpen(true)
		}
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

		<div className="serverNameContainer">


		<div  className="serverNameDisplay"  onClick={handleMouseEnter}>

        {server.name} <i class="fa-solid fa-chevron-down serverNameDownButton"></i>
		{showText && <p className="message">Server Code: {server.code} </p> }
		<LeaveAServer  className='serverNameLeaveServer'/>

		</div>

				</div>

	) : (
		<h1>Loading user direct channels...</h1>
	);
}
