// import "./HomePage.css";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
import ServersList from "../ServersList";
import "./DiscoveryPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserDirectChannels } from "../../store/directChannels";
import { thunkGetAllServers } from "../../store/discover";
import { useHistory } from "react-router";
import LogoutButton from "../LogoutButton";
export default function DiscoveryPage() {
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();
	const [categorySelector, setCategorySelector] = useState("Other");
	// const { other, gaming, entertainment, artistsCreators, education, scienceTech, localCommunity }
	const servers = useSelector(state => state.discover);
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
					<div className="left-menu-top">Discover</div>
					<div className="left-menu-center">
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("other")}
						>
							<i class="fa-regular fa-compass fa-lg discoverIcon"></i>Home
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("gaming")}
						>
							<i class="fa-solid fa-gamepad fa-lg discoverIcon"></i>Gaming
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("artistsCreators")}
						>
							<i class="fa-solid fa-music fa-lg discoverIcon"></i>Artists &
							Creators
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("education")}
						>
							<i class="fa-solid fa-graduation-cap fa-lg discoverIcon"></i>
							Education
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("scienceTech")}
						>
							<i class="fa-solid fa-atom fa-lg discoverIcon"></i>Science & Tech
						</button>
						<button
							className="left-menu-item"
							onClick={() => setCategorySelector("entertainment")}
						>
							<i class="fa-solid fa-tv fa-lg discoverIcon"></i>Entertainment
						</button>
					</div>
				</div>
			</div>

			<div className="main-sections-container">
				<div className="main-top-container">
					top section container
					<div className="main-top-search-container">
						{console.log(servers[categorySelector])}
						{categorySelector === "Other" && <div> other search bar </div>}
						{categorySelector === "Gaming" && <div> Gaming search bar </div>}
						{categorySelector === "Artists & Creators" && (
							<div> Artists & Creators search bar </div>
						)}
						{categorySelector === "Education" && (
							<div> Education search bar </div>
						)}
						{categorySelector === "Science & Tech" && (
							<div> Science & Tech search bar </div>
						)}
						{categorySelector === "Entertainment" && (
							<div> Entertainment search bar </div>
						)}
					</div>
				</div>
				<div className="main-bottom-container">
					<div className="main-bottom-view-servers-container">
						{categorySelector === "Other" && <div> Featured communities </div>}
						{categorySelector === "Gaming" && (
							<div> (gaming)Popular communities </div>
						)}
						{categorySelector === "Artists & Creators" && (
							<div> (Artists & Creators) Popular communities</div>
						)}
						{categorySelector === "Education" && (
							<div> (Education) Popular communities</div>
						)}
						{categorySelector === "Science & Tech" && (
							<div> (Science & Tech) Popular communities </div>
						)}
						{categorySelector === "Entertainment" && (
							<div> (Entertainment) Popular communities </div>
						)}
					</div>
				</div>
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
