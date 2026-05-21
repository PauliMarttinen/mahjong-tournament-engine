import { type Score } from "../../../../../data-types/tournament-data-types";
import { Seats } from "../../../../../data-types/app-data-types";

export const areTotalsWrong = (score: [Score, Score, Score, Score]): boolean => {
	const rawTotal =
		score[Seats.East].raw +
		score[Seats.South].raw +
		score[Seats.West].raw +
		score[Seats.North].raw;

	const umaTotal =
		score[Seats.East].uma +
		score[Seats.South].uma +
		score[Seats.West].uma +
		score[Seats.North].uma;

	return rawTotal !== 0 || umaTotal !== 0;
};