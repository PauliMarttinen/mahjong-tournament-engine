import {useMemo, useState, useEffect} from "react";
import useTournament from "../../../../utils/hooks/useTournament";
import { getSteps } from "../utils/getSteps";
import { STATE_MESSAGE_IDENTIFIER, BigScreenStates } from "../utils/setBigScreenState";
import Standings from "./Standings";
import FinalResults from "../../FinalResults/FinalResultsPopup";
import Welcome from "./Welcome";
import Timer from "./Timer";

const BigScreenPopup = () => {
	const tournament = useTournament();
	const [actionReceiver, setActionReceiver] = useState<number | null>(null);
	const [pinger, setPinger] = useState<number | null>(null);
	const [state, setState] = useState<BigScreenStates|null>(null);
	const [currentRoundId, setCurrentRoundId] = useState<number>(0);
	
	const steps = useMemo(() => getSteps(tournament), []);

	const collectGarbage = () => {
		localStorage.removeItem(STATE_MESSAGE_IDENTIFIER);
	};

	const receiveAction = (initial?: boolean) => {
		if (localStorage.getItem(STATE_MESSAGE_IDENTIFIER) === null)
		{
			if (!initial)	return;
			setState(BigScreenStates.Welcome);
			setCurrentRoundId(0);
			return;
		}

		const stateChange = JSON.parse(localStorage.getItem(STATE_MESSAGE_IDENTIFIER) as string);
		setState(stateChange.type);
		switch (stateChange.type)
		{
			case BigScreenStates.Welcome:
				setCurrentRoundId(0);
				break;
			case BigScreenStates.Timer:
				setCurrentRoundId(stateChange.roundId)
				break;
			case BigScreenStates.Standings:
				setCurrentRoundId(stateChange.roundId);
				break;
			case BigScreenStates.Final:
				setCurrentRoundId(0);
				break;
		}
		localStorage.removeItem(STATE_MESSAGE_IDENTIFIER);
	};

	const onClose = () => {
		collectGarbage();
	};

	useEffect(() => {
		receiveAction(true);
		
		const actionReceiverId = window.setInterval(receiveAction, 1000);
		setActionReceiver(actionReceiverId);

		window.addEventListener("beforeunload", onClose);
		window.addEventListener("unload", onClose);

		return () => {
			window.clearInterval(actionReceiverId);
			collectGarbage();
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

export default BigScreenPopup;