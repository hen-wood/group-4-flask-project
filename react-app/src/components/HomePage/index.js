import DirectChannels from "../DirectChannels";
import { Switch, Route } from "react-router";
export default function HomePage() {
	return (
		<div>
			<div>
				<h1>This would be the list of all the direct channels for a user</h1>
				<DirectChannels />
			</div>
			<div>
				<Switch>
					<Route exact path="/channels/@me/">
						<h1>This would be if you just logged in (nothing here really)</h1>
						<h1>
							We could use Bill's idea of using local storage to direct to
						</h1>
						<h1>the last thing you had open</h1>
					</Route>
					<Route path="/channels/@me/test">
						<h1>This would be the direct channel comments</h1>
					</Route>
				</Switch>
			</div>
		</div>
	);
}
