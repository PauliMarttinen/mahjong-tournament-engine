import {useEffect, useRef, useState} from "react";
import {
	STATE_MESSAGE_IDENTIFIER,
	PING_MESSAGE_IDENTIFIER,
	PING_INTERVAL,
	BigScreenStates,
	BigScreenActions
} from "../../views/Tournament/BigScreen/utils/setBigScreenState";
import collectGarbage from "../../views/Tournament/BigScreen/BigScreenPopup/utils/collectGarbage";
import useAppState from "../../utils/hooks/useAppState";
import useTournament from "../../utils/hooks/useTournament";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { appActionCreators, tournamentActionCreators } from "../../state";
import getSimpleDateISOString from "../../utils/getSimpleDateISOString";
import { Round, Tournament } from "../../data-types/tournament-data-types";

const BigScreenMonitor = () => {
	const timeoutRef = useRef<number | null>(null);
	const tournament = useTournament();
	const tournamentRef = useRef<Tournament>(tournament);
	const appState = useAppState();
	const dispatch = useDispatch();

	const {setBigScreen} = bindActionCreators(appActionCreators, dispatch);
	const {editTournamentInfo} = bindActionCreators(tournamentActionCreators, dispatch);

	const off = () => {
		setBigScreen(null);
	};

	const startRound = (roundId: number) => {
		const startTime = getSimpleDateISOString(true);
		const updatedRounds = tournamentRef.current.info.rounds.map((round: Round, index: number) => {
			if (index === roundId) return {
				...round,
				realStart: startTime
			};
			
			return round;
		});
		editTournamentInfo({
			...tournament.info,
			rounds: updatedRounds
		});

		tournamentRef.current = {
			...tournamentRef.current,
			info: {
				...tournamentRef.current.info,
				rounds: updatedRounds
			}
		};
	};

	const handleStorageEvent = (event: StorageEvent) => {
		if (event.key === PING_MESSAGE_IDENTIFIER && event.newValue)
		{
			if (timeoutRef.current !== null)
			{
				window.clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(off, PING_INTERVAL + 500);
		}

		if (event.key === STATE_MESSAGE_IDENTIFIER && event.newValue)
		{
			try {
				const message = JSON.parse(event.newValue);
				switch (message.type)
				{
					case BigScreenStates.Off:
						off();
						break;
					case BigScreenActions.StartRound:
						startRound(message.payload);
						break
				}
			}
			catch (e) {}
		}

		collectGarbage();
	};

	useEffect(() => {
		window.addEventListener("storage", handleStorageEvent);

		return () => {
			window.removeEventListener("storage", handleStorageEvent);
			if (timeoutRef.current !== null) {
				window.clearInterval(timeoutRef.current);
			}
		};
	}, []);

	/**Uncomment for debugging. */
	
	/* return (
		<div style={{background: "white"}}>
			Big Screen Status: {appState.bigScreen && !appState.bigScreen.closed ? "on" : "off"}
		</div>
	); */
	

	return <></>;
};

export default BigScreenMonitor;