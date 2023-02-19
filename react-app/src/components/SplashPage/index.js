import { Link, useHistory } from "react-router-dom";
import SplashRight from "../Svgs/SplashRight";
import SplashCenter from "../Svgs/SplashCenter";
import SplashLeft from "../Svgs/SplashLeft";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
import "./SplashPage.css";
import { useDispatch, useSelector } from "react-redux";
import { demo1Login, demo2Login } from "../../store/session";
import { useEffect, useState } from "react";
import { authenticate } from "../../store/session";
import { thunkGetUserServers } from "../../store/servers";

export default function SplashPage() {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(thunkGetUserServers()).then(() => history.push("/login"));
	};

	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	const sessionUser = useSelector(state => state.session.user);

	return isLoaded ? (
		<div className="splash-page-wrapper">
			<div id="splash-container">
				<div id="splash-top-bar">
					<div id="logo-title-container">
						<DiscordanceLogo />
						<h1 id="splash-title">Discordance</h1>
					</div>
					<div>
						<button id="login-button" onClick={handleClick}>
							{sessionUser ? "Open Discordance" : "Login"}
						</button>
						<button
							id="login-button"
							className={`${sessionUser ? "True" : "False"}`}
							onClick={() => {
								dispatch(demo1Login()).then(handleClick);
							}}
						>
							Demo user 1
						</button>
						<button
							id="login-button"
							className={`${sessionUser ? "True" : "False"}`}
							onClick={() => {
								dispatch(demo2Login()).then(handleClick);
							}}
						>
							Demo user 2
						</button>
					</div>
				</div>
				<SplashCenter />
				<SplashLeft />
				<SplashRight />
			</div>

			<div className="git-link-div">
				<div>find us on github:</div>

				<div className="dot">.</div>

				<a href="https://github.com/Ardian-Kovanxhi">Ardian</a>

				<div className="dot">.</div>

				<a href="https://github.com/anti-epic">Chase</a>

				<div className="dot">.</div>

				<a href="https://github.com/enkhzayaqt">Emma</a>

				<div className="dot">.</div>

				<a href="https://github.com/hen-wood">Henry</a>
			</div>
		</div>
	) : (
		<></>
	);
}
