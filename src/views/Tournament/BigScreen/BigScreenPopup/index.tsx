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

	const receiveAction = () => {
		if (localStorage.getItem(STATE_MESSAGE_IDENTIFIER) === null) return;

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
		//Make sure there aren't any leftover messages from earlier
		collectGarbage();

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

	if (state === BigScreenStates.Timer)
	{
		return (
			<Timer
				roundId={currentRoundId}
			/>
		);
	}

	if (state === BigScreenStates.Standings)
	{
		return (
			<Standings
				roundId={currentRoundId}
			/>
		);
	}

	if (state === BigScreenStates.Final)
	{
		return (
			<FinalResults/>
		);
	}

	return (
		<Welcome/>
	);
};

export default BigScreenPopup;