/* import { useState, useEffect } from "react";
import { ping } from "../utils/ping";
import { onClose } from "../utils/onClose";
import { NAVIGATE_MESSAGE_IDENTIFIER, PING_INTERVAL } from "../../utils/setBigScreenState";
import { collectGarbage } from "../../Popup/utils/collectGarbage";
import { useNavigate } from "react-router-dom"; */

const Listener = () => {
	/* const [pinger, setPinger] = useState<number | null>(null);
	const navigate = useNavigate();

	const receiveNavigation = (event: StorageEvent) => {
		if (event.key === NAVIGATE_MESSAGE_IDENTIFIER && event.newValue)
		{
			navigate(event.newValue);
		}

		collectGarbage();
	};

	useEffect(() => {
		console.log("use effct")
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
	}, []); */

	return <></>;
};

export default Listener;