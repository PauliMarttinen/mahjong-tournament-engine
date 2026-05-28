/* import { useState, useEffect } from "react";
import {
	STATE_MESSAGE_IDENTIFIER,
	PING_MESSAGE_IDENTIFIER,
	PING_INTERVAL,
	BigScreenStates,
	setBigScreenState
} from "../utils/setBigScreenState";
import Standings from "./Standings";
import FinalResults from "./FinalResults";
import Welcome from "./Welcome";
import Timer from "./Timer";
import { collectGarbage } from "./utils/collectGarbage";

const BigScreenPopup = () => {
	const [pinger, setPinger] = useState<number | null>(null);
	const [state, setState] = useState<BigScreenStates|null>(null);
	const [currentRoundId, setCurrentRoundId] = useState<number>(0);

	const applyAction = (action: {type: BigScreenStates, roundId?: number}) => {
		switch (action.type)
		{
			case BigScreenStates.Welcome:
			case BigScreenStates.Final:
				setCurrentRoundId(0);
				break;
			case BigScreenStates.Timer:
			case BigScreenStates.Standings:
				setCurrentRoundId(action.roundId ?? 0);
				break;
		}
		setState(action.type);
	};

	const initialAction = () => {
		try {
			const stateChange = JSON.parse(localStorage.getItem(STATE_MESSAGE_IDENTIFIER) as string);
			applyAction(stateChange);
		}
		catch (e) {
			setState(BigScreenStates.Welcome);
			setCurrentRoundId(0);
		}
	};

	const receiveAction = (event: StorageEvent) => {
		if (event.key === STATE_MESSAGE_IDENTIFIER && event.newValue)
		{
			try {
				const stateChange = JSON.parse(event.newValue);
				applyAction(stateChange);
			}
			catch (e) {}
		}

		collectGarbage();
	};

	const ping = () => {
		localStorage.setItem(PING_MESSAGE_IDENTIFIER, Date.now().toString());
	};

	const onClose = () => {
		setBigScreenState({type: BigScreenStates.Off});
	};

	useEffect(() => {
		initialAction();

		window.addEventListener("storage", receiveAction);

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
			window.removeEventListener("storage", receiveAction);
			window.removeEventListener("beforeunload", onClose);
			window.removeEventListener("unload", onClose);
			onClose();
		};
	}, []);

	switch (state)
	{
		case BigScreenStates.Timer:
			return <Timer roundId={currentRoundId} />;
		case BigScreenStates.Standings:
			return <Standings roundId={currentRoundId} />;
		case BigScreenStates.Final:
			return <FinalResults/>;
		case BigScreenStates.Welcome:
			return <Welcome/>;
		default:
			return <></>;
	};
};

export default BigScreenPopup; */

export const pollo = () => {};