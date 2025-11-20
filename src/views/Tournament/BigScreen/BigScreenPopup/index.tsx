import {useMemo, useState, useEffect} from "react";
import useTournament from "../../../../utils/hooks/useTournament";
import { getSteps } from "../utils/getSteps";
import { STATE_MESSAGE_ID, BigScreenStates } from "../utils/setBigScreenState";
import Standings from "./Standings";
import FinalResults from "../../FinalResults/FinalResultsPopup";

const BigScreenPopup = () => {
	const tournament = useTournament();
	const [actionReceiver, setActionReceiver] = useState<number | null>(null);
	const [state, setState] = useState<BigScreenStates|null>(null);
	const [currentRoundId, setCurrentRoundId] = useState<number>(0);
	
	const steps = useMemo(() => getSteps(tournament.info.rounds), []);

	const receiveAction = () => {
		if (localStorage.getItem(STATE_MESSAGE_ID) === null) return;

		const stateChange = JSON.parse(localStorage.getItem(STATE_MESSAGE_ID) as string);
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
		localStorage.removeItem(STATE_MESSAGE_ID);
	};

	useEffect(() => {
		const id = window.setInterval(receiveAction, 1000);
		setActionReceiver(id);

		//Make sure there aren't any leftover messages from earlier
		localStorage.removeItem(STATE_MESSAGE_ID);
		return () => window.clearInterval(id);
	}, []);

	if (state === BigScreenStates.Timer)
	{
		return (
			<h1>timer for round {currentRoundId+1}</h1>
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
		<h1>prööt</h1>
	);
};

export default BigScreenPopup;