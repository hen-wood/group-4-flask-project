import { useHistory } from "react-router-dom";
import "./SplashPage.css";
import { useDispatch, useSelector } from "react-redux";
import { demo1Login, demo2Login } from "../../store/session";
import { useEffect, useState } from "react";
import { authenticate } from "../../store/session";
import { thunkGetUserServers } from "../../store/servers";
import discordanceLogo from "../Svgs/discordanceLogo.svg";
import splashLeft from "../Svgs/splashLeft.svg";
import splashRight from "../Svgs/splashRight.svg";
import splashCenter from "../Svgs/splashCenter.svg";

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
			<div id="splash-top-bar">
				<div id="logo-title-container">
					<img
						className="splash-logo__image"
						src={discordanceLogo}
						alt="discordance logo"
					/>
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
			<div id="splash-container">
				<div className="splash-bg">
					<img
						className="splash-bg splash-bg__image splash-bg__image--center"
						src={splashCenter}
						alt="clouds"
					/>
					<img
						className="splash-bg splash-bg__image splash-bg__image--left"
						src={splashLeft}
						alt="guy in a shoe"
					/>
					<img
						className="splash-bg splash-bg__image splash-bg__image--right"
						src={splashRight}
						alt="people at a bar"
					/>
				</div>
				<div className="about-text">
					<h1 className="about-text__title">Imagine a place...</h1>
					<p className="about-text__paragraph">
						...where you can belong to a school club, a gaming group, or a
						worldwide art community. Where just you and a handful of friends can
						spend time together. A place that makes it easy to talk every day
						and hang out more often.
					</p>
				</div>
			</div>

			<div className="git-links">
				<div className="git-links__title">
					<i className="fa-brands fa-github"></i> Head to our project{" "}
					<a
						className="git-links__anchor"
						href="https://github.com/hen-wood/group-4-flask-project"
						target={"_blank"}
						rel="noreferrer"
					>
						repo
					</a>{" "}
					or find us on github
				</div>
				<div className="git-links__cards">
					<div className="git-links__card">
						<img
							className="git-links__card__image"
							src="https://avatars.githubusercontent.com/u/110135851?v=4"
							alt="Ardian Kovanxhi"
						/>
						<a
							className="git-links__anchor"
							href="https://github.com/Ardian-Kovanxhi"
							target={"_blank"}
							rel="noreferrer"
						>
							Ardian
						</a>
					</div>
					<div className="git-links__card">
						<img
							className="git-links__card__image"
							src="https://avatars.githubusercontent.com/u/110782272?v=4"
							alt="Chase Donahue"
						/>
						<a
							className="git-links__anchor"
							href="https://github.com/anti-epic"
							target={"_blank"}
							rel="noreferrer"
						>
							Chase
						</a>
					</div>
					<div className="git-links__card">
						<img
							className="git-links__card__image"
							src="https://avatars.githubusercontent.com/u/82678150?v=4"
							alt="Enkhzayaqt Munkhochir"
						/>
						<a
							className="git-links__anchor"
							href="https://github.com/enkhzayaqt"
							target={"_blank"}
							rel="noreferrer"
						>
							Emma
						</a>
					</div>
					<div className="git-links__card">
						<img
							className="git-links__card__image"
							src="https://avatars.githubusercontent.com/u/104668677?v=4"
							alt="Henry Woodmansee"
						/>
						<a
							className="git-links__anchor"
							href="https://github.com/hen-wood"
							target={"_blank"}
							rel="noreferrer"
						>
							Henry
						</a>
					</div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}
