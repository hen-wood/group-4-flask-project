import discordanceLogo from "../Svgs/discordanceLogo.svg";
import ServersList from "../ServersList";
import "./DiscoveryPage.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkGetUserDirectChannels } from "../../store/directChannels";
import { thunkGetAllServers } from "../../store/discover";
import { useHistory } from "react-router";
import LogoutButton from "../LogoutButton";
import { categoryKeys } from "./categoryKeys";

export default function DiscoveryPage() {
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();
	const [categorySelector, setCategorySelector] = useState("other");
	// const servers = useSelector(state => state.discover);
	useEffect(() => {
		dispatch(thunkGetUserDirectChannels()).then(() =>
			dispatch(thunkGetAllServers()).then(() => setIsLoaded(true))
		);
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
							id="direct-message-button"
							onClick={handleDirectMessageIconClick}
							title="Direct Messages"
						>
							<img
								className="dm-logo"
								src={discordanceLogo}
								alt="discordance logo"
							/>
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
					<div className="left-menu-top">Discover</div>
					<div className="left-menu-center">
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("other")}
						>
							<i className="fa-regular fa-compass fa-lg discoverIcon"></i>Home
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("gaming")}
						>
							<i className="fa-solid fa-gamepad fa-lg discoverIcon"></i>Gaming
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("artistsCreators")}
						>
							<i className="fa-solid fa-music fa-lg discoverIcon"></i>Artists &
							Creators
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("education")}
						>
							<i className="fa-solid fa-graduation-cap fa-lg discoverIcon"></i>
							Education
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("scienceTech")}
						>
							<i className="fa-solid fa-atom fa-lg discoverIcon"></i>Science &
							Tech
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("entertainment")}
						>
							<i className="fa-solid fa-tv fa-lg discoverIcon"></i>Entertainment
						</button>
					</div>
				</div>
			</div>

			<div className="main-sections-container">
				<div className="main-top-container">
					top section container
					<div className="main-top-search-container">
						{
							<div>
								<h1>
									{categorySelector === "other"
										? "Find your community on Discordance"
										: `Find ${categoryKeys[categorySelector]} communities on Discordance`}
								</h1>
							</div>
						}
					</div>
				</div>
				<div className="main-bottom-container">
					<div className="main-bottom-view-servers-container">
						{categorySelector === "other" ? (
							<div> Featured communities </div>
						) : (
							<div>
								<h2>{`(${categoryKeys[categorySelector]}) Popular communities`}</h2>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	) : (
		<div id="main-container">
			<div id="main-loading-container">
				<h1 id="main-loading-text">Loading....</h1>
			</div>
		</div>
	);
}
