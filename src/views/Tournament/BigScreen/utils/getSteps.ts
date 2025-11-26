import type { Tournament } from "../../../../data-types/tournament-data-types";
import { generateArray } from "../../../../utils/generateArray";
import { BigScreenStates } from "./setBigScreenState";
import { getLastFinishedRound } from "../../../../utils/getLastFinishedRound";

const getTimerDescription = (roundId: number, lastFinishedRound: number): string => {
	if (roundId < lastFinishedRound+1)
	{
		return `Round ${roundId+1} has passed.`;
	}
	if (roundId === lastFinishedRound+1)
	{
		return `Round ${roundId+1} is next.`;
	}
	return `Timer for round ${roundId+1} won't be accessible until round ${roundId} is finished first.`;
};

const getStandingsDescription = (roundId: number, lastFinishedRound: number): string => {
	if (roundId <= lastFinishedRound)
	{
		return `Round ${roundId+1} is finished.`;
	}

	return `Standings for round ${roundId+1} won't be available until the round is finished.`;
};

const getFinalDescription = (roundCount: number, lastFinishedRound: number): string => {
	if (lastFinishedRound !== roundCount-1)
		return `Final results won't be available until round ${roundCount} is finished.`;

	return "Finals results are available!";
};

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
				disabled: roundId !== lastFinishedRound+1,
				description: getTimerDescription(roundId, lastFinishedRound)
			}];
			if (roundId < tournament.info.rounds-1)
			{
				roundSteps.push({
					title: `Round ${roundId+1} Standings`,
					stateChange: {
						type: BigScreenStates.Standings,
						roundId
					},
					disabled: roundId > lastFinishedRound,
					description: getStandingsDescription(roundId, lastFinishedRound)
				});
			}
			return roundSteps;
		}).flat(),
		{
			title: "Final results",
			stateChange: {
				type: BigScreenStates.Final
			},
			disabled: lastFinishedRound !== tournament.info.rounds-1,
			description: getFinalDescription(tournament.info.rounds, lastFinishedRound)
		}
	];
};