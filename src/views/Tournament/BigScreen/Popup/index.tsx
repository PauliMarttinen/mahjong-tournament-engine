import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATE_MESSAGE_IDENTIFIER } from "../utils/setBigScreenState";
import { collectGarbage } from "./utils/collectGarbage";
import { Route, Routes } from "react-router-dom";
import { ping, PING_INTERVAL } from "./utils/ping";
import { onClose } from "./utils/onClose";
import BigScreenWelcome from "./Welcome";
import BigScreenTimer from "./Timer";
import BigScreenStandings from "./Standings";
import BigScreenFinal from "./Final";

const Popup = () => {
	const [pinger, setPinger] = useState<number | null>(null);
	const navigate = useNavigate();

	const receiveNavigation = (event: StorageEvent) => {
		if (event.key === NAVIGATE_MESSAGE_IDENTIFIER && event.newValue)
		{
			navigate(event.newValue);
		}

		collectGarbage();
	};

	useEffect(() => {
		window.addEventListener("storage", receiveNavigation);

		if (pinger !== null)
		{
			window.clearInterval(pinger);
		}
		const pingerId = window.setInterval(ping, PING_INTERVAL);
		setPinger(pingerId);

		window.addEventListener("beforeunload", onClose);
		window.addEventListener("unload", onClose);

		return () => {
			window.clearInterval(pingerId);
			window.removeEventListener("storage", receiveNavigation);
			window.removeEventListener("beforeunload", onClose);
			window.removeEventListener("unload", onClose);
			onClose();
		};
	}, []);

	return (
		<Routes>
			<Route path={"*"}>
				<Route path={"welcome"} element={<BigScreenWelcome/>}/>
				<Route path={":roundId/timer"} element={<BigScreenTimer/>}/>
				<Route path={":roundId/standings"} element={<BigScreenStandings/>}/>
				<Route path={"final"} element={<BigScreenFinal/>}/>
			</Route>
		</Routes>
	);
};

export default Popup;