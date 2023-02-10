import { Link } from "react-router-dom";
import SplashRight from "../Svgs/SplashRight";
import SplashCenter from "../Svgs/SplashCenter";
import SplashLeft from "../Svgs/SplashLeft";
import DiscordanceLogo from "../Svgs/DiscordanceLogo";
import "./SplashPage.css";
export default function SplashPage() {
	return (
		<div id="splash-container">
			<SplashCenter />
			<SplashLeft />
			<SplashRight />
			<div id="splash-top-bar">
				<DiscordanceLogo />
				<div id="login-button">
					<Link to="/login">Login</Link>
				</div>
			</div>
		</div>
	);
}
