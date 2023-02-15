import { Link, useHistory } from "react-router-dom";
import SplashRight from "../Svgs/SplashRight";
import SplashCenter from "../Svgs/SplashCenter";
import SplashLeft from "../Svgs/SplashLeft";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
import "./SplashPage.css";
import { useSelector } from "react-redux";
export default function SplashPage() {
	const history = useHistory();
	const handleClick = () => {
		history.push("/login");
	};
	const sessionUser = useSelector(state => state.session.user);
	return (
		<div id="splash-container">
			<div id="splash-top-bar">
				<div id="logo-title-container">
					<DiscordanceLogo />
					<h1 id="splash-title">Discordance</h1>
				</div>
				<button id="login-button" onClick={handleClick}>
					{sessionUser ? "Open Discordance" : "Login"}
				</button>
			</div>
			<SplashCenter />
			<SplashLeft />
			<SplashRight />
		</div>
	);
}
