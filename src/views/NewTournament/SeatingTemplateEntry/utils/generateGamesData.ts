import { type Score, type Game } from "../../../../data-types/tournament-data-types";
import { generateArray } from "../../../../utils/generateArray";

const createGamesData = (params: {
	seatingTemplate: number[][],
	roundCount: number,
	playerCount: number
}): Game[] => {
	const defaultScore: Score = {
		raw: 0,
		uma: 0,
		penalty: 0
	}

	return generateArray(params.roundCount).map((roundId: number): Game[] => (
		generateArray(params.playerCount / 4).map((tableId: number): Game => ({
			round: roundId,
			table: tableId,
			finished: false,
			participants: [
				{
					playerId: params.seatingTemplate[tableId*4+0][roundId],
					score: defaultScore
				},
				{
					playerId: params.seatingTemplate[tableId*4+1][roundId],
					score: defaultScore
				},
				{
					playerId: params.seatingTemplate[tableId*4+2][roundId],
					score: defaultScore
				},
				{
					playerId: params.seatingTemplate[tableId*4+3][roundId],
					score: defaultScore
				}
			]
		}))
	)).reduce((combined: Game[], round: Game[]): Game[] => [...combined, ...round], []);
};

export default createGamesData;