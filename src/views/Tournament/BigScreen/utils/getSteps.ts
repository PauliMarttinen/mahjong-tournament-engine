import { type Tournament } from "../../../../data-types/tournament-data-types";
import { generateArray } from "../../../../utils/generateArray";
import { getLastFinishedRound } from "../../../../utils/getLastFinishedRound";
import { Routes } from "../../../../utils/routeUtils";

export const getSteps = (tournament: Tournament) => {
	const lastFinishedRound = getLastFinishedRound(tournament);

	return [
		{
			title: "Welcome screen",
			route: Routes.BigScreenWelcome,
			disabled: lastFinishedRound >= 0
		},
		...generateArray(tournament.info.rounds.length).map((roundId: number) => {
			const roundSteps = [{
				title: `Round ${roundId+1} Timer`,
				route: Routes.BigScreenTimer.replace(":roundId", roundId.toString()),
				disabled: roundId !== lastFinishedRound+1,
				description: "Click to display."
			}];
			if (roundId < tournament.info.rounds.length-1)
			{
				roundSteps.push({
					title: `Round ${roundId+1} Standings`,
					route: Routes.BigScreenStandings.replace(":roundId", roundId.toString()),
					disabled: roundId !== lastFinishedRound,
					description: "Click to display."
				});
			}
			return roundSteps;
		}).flat(),
		{
			title: "Final results",
			disabled: lastFinishedRound !== tournament.info.rounds.length-1,
			route: Routes.BigScreenFinal,
			description: "Click to display."
		}
	].filter((step) => !step.disabled);
};