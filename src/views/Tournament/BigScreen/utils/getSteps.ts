import { generateArray } from "../../../../utils/generateArray";

export const getSteps = (roundCount: number) => {
	return [
		{
			title: "Welcome screen"
		},
		...generateArray(roundCount).map((roundId: number) => {
			const roundSteps = [{
				title: `Round ${roundId+1} Timer`
			}];
			if (roundId < roundCount-1)
			{
				roundSteps.push({
					title: `Round ${roundId+1} Standings`
				});
			}
			return roundSteps;
		}).flat(),
		{
			title: "Final results"
		}
	];
};