import { generateArray } from "../../../../utils/generateArray";
import { BigScreenStates } from "./setBigScreenState";

export const getSteps = (roundCount: number) => {
	return [
		{
			title: "Welcome screen",
			stateChange: {
				type: BigScreenStates.Welcome
			}
		},
		...generateArray(roundCount).map((roundId: number) => {
			const roundSteps = [{
				title: `Round ${roundId+1} Timer`,
				stateChange: {
					type: BigScreenStates.Timer,
					roundId
				}
			}];
			if (roundId < roundCount-1)
			{
				roundSteps.push({
					title: `Round ${roundId+1} Standings`,
					stateChange: {
						type: BigScreenStates.Standings,
						roundId
					}
				});
			}
			return roundSteps;
		}).flat(),
		{
			title: "Final results",
			stateChange: {
				type: BigScreenStates.Final
			}
		}
	];
};