// import "./HomePage.css";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
import ServersList from "../ServersList";
import './DiscoveryPage.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserDirectChannels } from "../../store/directChannels";
import { useHistory } from "react-router";
import LogoutButton from "../LogoutButton";
export default function DiscoveryPage() {
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkGetUserDirectChannels()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const handleDirectMessageIconClick = () => {
		history.push("/channels/@me");
	};

	return isLoaded ? (
		<div className="main-container">
			<div id="left-container">
				<div id="left-nav-bar">
					<div id="left-nav-top">
						<div
							className="serverListButton"
							id="direct-message-button"
							onClick={handleDirectMessageIconClick}
						>
							<DiscordanceLogo />
						</div>
					</div>
					<div id="left-nav-center">
						<ServersList />
					</div>
					<div id="left-nav-bottom">
						<LogoutButton />
					</div>
				</div>
				<div className="left-menu">
					<div className="left-menu-top">
                        Discover
					</div>
					<div className="left-menu-center">
                <button className="left-menu-item"><i class="fa-regular fa-compass fa-lg discoverIcon"></i>Home</button>
                <button className="left-menu-item"><i class="fa-solid fa-gamepad fa-lg discoverIcon"></i>Gaming</button>
                <button className="left-menu-item"><i class="fa-solid fa-music fa-lg discoverIcon"></i>Music</button>
                <button className="left-menu-item"><i class="fa-solid fa-graduation-cap fa-lg discoverIcon"></i>Education</button>
                <button className="left-menu-item"><i class="fa-solid fa-atom fa-lg discoverIcon"></i>Science & Tech</button>
                <button className="left-menu-item"><i class="fa-solid fa-tv fa-lg discoverIcon"></i>Entertainment</button>
					</div>
				</div>
			</div>

                <div className="main-sections-container">
                <div className="main-top-container">top section container
                </div>
                <div className="main-bottom-container">bottom section container</div>
                </div>
		</div>
	) : (
		<div id="main-container">
			<div id="main-loading-container">
				<h1 id="main-loading-text">Loading...</h1>
			</div>
		</div>
	);
}
