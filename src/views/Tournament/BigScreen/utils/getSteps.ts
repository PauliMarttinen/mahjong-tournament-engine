import type { Tournament } from "../../../../data-types/tournament-data-types";
import { generateArray } from "../../../../utils/generateArray";
import { BigScreenStates } from "./setBigScreenState";
import { getLastFinishedRound } from "../../../../utils/getLastFinishedRound";

export const getSteps = (tournament: Tournament) => {
	const lastFinishedRound = getLastFinishedRound(tournament);

	return [
		{
			title: "Welcome screen",
			stateChange: {
				type: BigScreenStates.Welcome
			},
			disabled: false
		},
		...generateArray(tournament.info.rounds).map((roundId: number) => {
			const roundSteps = [{
				title: `Round ${roundId+1} Timer`,
				stateChange: {
					type: BigScreenStates.Timer,
					roundId
				},
				disabled: roundId !== lastFinishedRound+1
			}];
			if (roundId < tournament.info.rounds-1)
			{
				roundSteps.push({
					title: `Round ${roundId+1} Standings`,
					stateChange: {
						type: BigScreenStates.Standings,
						roundId
					},
					disabled: roundId > lastFinishedRound
				});
			}
			return roundSteps;
		}).flat(),
		{
			title: "Final results",
			stateChange: {
				type: BigScreenStates.Final
			},
			disabled: lastFinishedRound !== tournament.info.rounds-1
		}
	];
};